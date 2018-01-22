/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let rules = require('../../layout/Rules');
const expect = require('expect.js');
const _ = require('lodash');

class DevUtils {

    constructor(bank, type) {
        this.validateFieldsLength = this.validateFieldsLength.bind(this);
        this.rules = {
            ArquivoHeader: rules[bank].ArquivoHeader,
            ArquivoTrailing: rules[bank].ArquivoTrailing,
            LoteHeader: rules[bank][type].LoteHeader,
            LoteTrailing: rules[bank][type].LoteTrailing,
            Detail: rules[bank][type].Detail,
            Detail2: rules[bank][type].Detail2
        };
    }

    getRequired() {
        return (() => {
            const result = [];
            for (let key in this.rules) {
                const subject = this.rules[key];
                this._log('---------------------');
                this._log(`Required for ${key}`);
                const required = _.filter(subject, {required: true}).map(function(item) {
                    if (item.default == null) { return {[item.field]: _.pick(item, ['type', 'length', 'default'])}; }
                });
                result.push(this._log(JSON.stringify(_.compact(required), null, 4)));
            }
            return result;
        })();
    }

    getAllFields() {
        return (() => {
            const result = [];
            for (let key in this.rules) {
                var required;
                const subject = this.rules[key];
                this._log('---------------------');
                this._log(`Fields for ${key}`);
                result.push(required = _.map(subject, item => ({[item.field]: _.pick(item, ['type', 'length', 'default'])})));
            }
            return result;
        })();
    }
            // @_log required

    extract(sections, fileString) {
        const fileSections = fileString.split('\n');
        _.each(fileSections, section => expect(section.length).to.be(240));
        const merged = _.reduce(sections, (parsed, section, index) => {
            rules = this.rules[section];
            const content = fileSections[index];
            const sectionData = _.reduce(rules, function(extracted, rule) {
                extracted.push({[rule.field]: (content != null ? content.split('').slice(rule.startPos-1, rule.endPos).join('') : undefined)});
                return extracted;
            }
            , []);
            parsed[section] = sectionData;
            return parsed;
        }
        , {});
        return merged;
    }

    validate() {
        return (() => {
            const result = [];
            for (let key in this.rules) {
                const subject = this.rules[key];
                expect(subject).not.to.be(undefined);
                this._log('---------------------');
                this._log(`Testing ${key}`);

                const total = _.reduce(subject, (control, value) => {
                    this._stdout(`Testing field ${value.field}... `);
                    expect(value.startPos).to.be(control.lastPos + 1);
                    expect((value.endPos - value.startPos) + 1).to.be(value.length);
                    this._stdout("done.\n");
                    control.lastPos = value.endPos;
                    control.totalLength += value.length;
                    return control;
                }
                , {totalLength: 0, lastPos: 0});

                result.push(expect(total.totalLength).to.be(240));
            }
            return result;
        })();
    }

    validateFieldsLength(fileData) {
        const sections = _.keys(this.rules);
        return _.each(sections, section => {
            const fieldsConfig = this.rules[section];
            let sectionTotalLength = 0;
            _.each(fieldsConfig, function(config) {
                const dataField = _.find(fileData[section], config.field);
                _.pull(fileData[section], dataField);
                // console.log "Checking #{section}.#{config.field} length. Expected: #{config.length}, got: #{dataField[config.field].length}"
                expect(dataField[config.field].length).to.be(config.length);
                return sectionTotalLength += dataField[config.field].length;
            });
            // console.log "Checking section '#{section}' total length... expected 240, got #{sectionTotalLength}"
            return expect(sectionTotalLength).to.be(240);
        });
    }

    _log(msg) {}
        // console.log msg

    _stdout(msg) {
        return process.stdout.write(msg);
    }
}


module.exports = DevUtils;
