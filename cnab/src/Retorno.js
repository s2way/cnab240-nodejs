/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('lodash');
const expect = require('expect.js');
const rules = require('../../layout/Rules');

var Retorno = (function() {
    let FILE_HEADER = undefined;
    let FILE_TRAILING = undefined;
    let LOT_HEADER = undefined;
    let LOT_TRAILING = undefined;
    let DETAIL = undefined;
    let DETAIL2 = undefined;
    let FILE_SECTIONS = undefined;
    Retorno = class Retorno {
        static initClass() {
        
            /*
                JSON ouput structure:
    
                ArquivoHeader: {}
                lots: [
                    {
                        LoteHeader: {}
                        details: [
                            [
                                {
                                    Segment1: {}
                                    Segment2: {}
                                }
                            ]
                            [
                                {
                                    Segment1: {}
                                    Segment2: {}
                                }
                            ]
                        ]
                        LoteTrailing: {}
                    }
                ]
                ArquivoTrailing: {}
        
            */
    
            FILE_HEADER = 'ArquivoHeader';
            FILE_TRAILING = 'ArquivoTrailing';
            LOT_HEADER = 'LoteHeader';
            LOT_TRAILING = 'LoteTrailing';
            DETAIL = 'Detail';
            DETAIL2 = 'Detail2';
        
            FILE_SECTIONS = {
                FILE_HEADER: '0',
                LOT_HEADER: '1',
                DETAIL: 'A',
                LOT_TRAILING: '5',
                FILE_TRAILING: '9'
            };
        }

        constructor(bank, type) {
            if (bank == null) { throw new Error('Bank is mandatory'); }
            if (type == null) { throw new Error('Type is mandatory'); }
            this.rules = {
                ArquivoHeader: rules[bank].ArquivoHeader,
                ArquivoTrailing: rules[bank].ArquivoTrailing,
                LoteHeader: (rules[bank][type] != null ? rules[bank][type].LoteHeader : undefined),
                LoteTrailing: (rules[bank][type] != null ? rules[bank][type].LoteTrailing : undefined),
                Detail: (rules[bank][type] != null ? rules[bank][type].Detail : undefined),
                Detail2: (rules[bank][type] != null ? rules[bank][type].Detail2 : undefined)
            };
            this.CONSTANTS = rules[bank][type] != null ? rules[bank][type].Constants : undefined;
        }
        
        extractSingleField(line, rule) {
            return (line != null ? line.split('').slice(rule.startPos-1, rule.endPos).join('') : undefined);
        }

        // this method mutates {lines}
        extractSection(lines, sectionName, sectionCode) {
            const registryRule = _.find(this.rules[sectionName], {field: this.CONSTANTS[sectionName].REGISTRY_FIELD});
            const line = _.filter(lines, line => (line != null ? line.split('').slice(registryRule.startPos-1, registryRule.endPos).join('') : undefined) === sectionCode);
            _.pull(lines, line[0]);
            return line[0];
        }

        extractBulk(lines, rule, condition) {
            return _.reduce(lines, (memo, line) => {
                const currentPos = memo.length === 0 ? 0 : memo.length - 1;
                if (this.extractSingleField(line, rule) === condition) {
                    memo.push([]);
                    memo[memo.length - 1].push(line);
                } else {
                    if (memo[currentPos] != null) {
                        memo[currentPos].push(line);
                    }
                }
                return memo;
            }
            , []);
        }

        numberOf(fileTrailingLine, sectionName, registryField) {
            const lotNumRule = _.find(this.rules[sectionName], {field: registryField});
            return parseInt(this.extractSingleField(fileTrailingLine, lotNumRule) || 0);
        }

        extractFields(line, sectionName) {
            const localRules = this.rules[sectionName];
            return _.reduce(localRules, (extracted, rule) => {
                extracted[`${rule.field}`] = this.extractSingleField(line, rule);
                return extracted;
            }
            , {});
        }

        extractSegments(detailLines) {
            const detailSegmentCodeRule = _.find(this.rules.Detail, {field: 'cod_seg_registro_lote'});
            return _.reduce(detailLines, (memo, detailLine) => {
                const segmentCode = this.extractSingleField(detailLine, detailSegmentCodeRule);
                memo.push(this.extractFields(detailLine, this.CONSTANTS.Segmentos[segmentCode]));
                return memo;
            }
            , []);
        }

        extractDetails(lotLines) {
            const lotHeaderLine = this.extractSection(lotLines, LOT_HEADER, FILE_SECTIONS.LOT_HEADER);
            const lotTrailingLine = this.extractSection(lotLines, LOT_TRAILING, FILE_SECTIONS.LOT_TRAILING);
            const detailsBulks = this.extractBulk(lotLines, _.find(this.rules.Detail, {field: this.CONSTANTS.Pagamento.REGISTRY_FIELD}), FILE_SECTIONS.DETAIL);
            const detailsWithSegments = _.map(detailsBulks, this.extractSegments.bind(this));
            return {
                [LOT_HEADER]: this.extractFields(lotHeaderLine, LOT_HEADER),
                details: detailsWithSegments,
                [LOT_TRAILING]: this.extractFields(lotTrailingLine, LOT_TRAILING)
            };
        }

        extract(fileString) {
            // console.log fileString
            // sanitizedFileString = _.replace fileString, '\r\n', '\n'
            // console.log sanitizedFileString
            // lines = _.compact(sanitizedFileString.split '\n')
            // console.log lines
            const lines = _.compact(fileString.split('\n'));
        
            const fileHeaderLine = this.extractSection(lines, FILE_HEADER, FILE_SECTIONS.FILE_HEADER);
            const fileTrailingLine = this.extractSection(lines, FILE_TRAILING, FILE_SECTIONS.FILE_TRAILING);

            const lots = this.extractBulk(lines, _.find(this.rules.LoteHeader, {field: this.CONSTANTS.LoteHeader.REGISTRY_FIELD}), FILE_SECTIONS.LOT_HEADER);

            const lotsWithSegments = _.map(lots, this.extractDetails.bind(this));

            return {
                [FILE_HEADER]: this.extractFields(fileHeaderLine, FILE_HEADER),
                lots: lotsWithSegments,
                [FILE_TRAILING]: this.extractFields(fileTrailingLine, FILE_TRAILING)
            };
        }
    };
    Retorno.initClass();
    return Retorno;
})();
        
module.exports = Retorno;
