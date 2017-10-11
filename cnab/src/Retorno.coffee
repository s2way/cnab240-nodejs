_ = require 'lodash'
expect = require 'expect.js'
rules = require '../../layout/Rules'

class Retorno
    
    ###
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
    
    ###

    FILE_HEADER = 'ArquivoHeader'
    FILE_TRAILING = 'ArquivoTrailing'
    LOT_HEADER = 'LoteHeader'
    LOT_TRAILING = 'LoteTrailing'
    DETAIL = 'Detail'
    DETAIL2 = 'Detail2'
    
    FILE_SECTIONS =
        FILE_HEADER: '0'
        LOT_HEADER: '1'
        DETAIL: 'A'
        LOT_TRAILING: '5'
        FILE_TRAILING: '9'

    constructor: (bank, type) ->
        throw new Error 'Bank is mandatory' unless bank?
        throw new Error 'Type is mandatory' unless type?
        @rules =
            ArquivoHeader: rules[bank].ArquivoHeader
            ArquivoTrailing: rules[bank].ArquivoTrailing
            LoteHeader: rules[bank][type]?.LoteHeader
            LoteTrailing: rules[bank][type]?.LoteTrailing
            Detail: rules[bank][type]?.Detail
            Detail2: rules[bank][type]?.Detail2
        @CONSTANTS = rules[bank][type]?.Constants
        
    extractSingleField: (line, rule) ->
        line?.split('').slice(rule.startPos-1, rule.endPos).join('')

    # this method mutates {lines}
    extractSection: (lines, sectionName, sectionCode) ->
        registryRule = _.find @rules[sectionName], field: @CONSTANTS[sectionName].REGISTRY_FIELD
        line = _.filter lines, (line) ->
            line?.split('').slice(registryRule.startPos-1, registryRule.endPos).join('') is sectionCode
        _.pull lines, line[0]
        line[0]

    extractBulk: (lines, rule, condition) ->
        _.reduce lines, (memo, line) =>
            currentPos = if memo.length is 0 then 0 else memo.length - 1
            if @extractSingleField(line, rule) is condition
                memo.push []
                memo[memo.length - 1].push line
            else
                memo[currentPos]?.push line
            memo
        , []

    numberOf: (fileTrailingLine, sectionName, registryField) ->
        lotNumRule = _.find @rules[sectionName], field: registryField
        parseInt(@extractSingleField(fileTrailingLine, lotNumRule) || 0)

    extractFields: (line, sectionName) ->
        localRules = @rules[sectionName]
        _.reduce localRules, (extracted, rule) =>
            extracted["#{rule.field}"] = @extractSingleField line, rule
            extracted
        , {}

    extractSegments: (detailLines) ->
        detailSegmentCodeRule = _.find @rules.Detail, field: 'cod_seg_registro_lote'
        _.reduce detailLines, (memo, detailLine) =>
            segmentCode = @extractSingleField detailLine, detailSegmentCodeRule
            memo.push @extractFields detailLine, @CONSTANTS.Segmentos[segmentCode]
            memo
        , []

    extractDetails: (lotLines) ->
        lotHeaderLine = @extractSection lotLines, LOT_HEADER, FILE_SECTIONS.LOT_HEADER
        lotTrailingLine = @extractSection lotLines, LOT_TRAILING, FILE_SECTIONS.LOT_TRAILING
        detailsBulks = @extractBulk lotLines, _.find(@rules.Detail, field: @CONSTANTS.Pagamento.REGISTRY_FIELD), FILE_SECTIONS.DETAIL
        detailsWithSegments = _.map detailsBulks, @extractSegments.bind @
        {
            "#{LOT_HEADER}": @extractFields lotHeaderLine, LOT_HEADER
            details: detailsWithSegments
            "#{LOT_TRAILING}": @extractFields lotTrailingLine, LOT_TRAILING
        }

    extract: (fileString) ->
        # console.log fileString
        # sanitizedFileString = _.replace fileString, '\r\n', '\n'
        # console.log sanitizedFileString
        # lines = _.compact(sanitizedFileString.split '\n')
        # console.log lines
        lines = _.compact(fileString.split '\n')
        
        fileHeaderLine = @extractSection lines, FILE_HEADER, FILE_SECTIONS.FILE_HEADER
        fileTrailingLine = @extractSection lines, FILE_TRAILING, FILE_SECTIONS.FILE_TRAILING

        lots = @extractBulk lines, _.find(@rules.LoteHeader, field: @CONSTANTS.LoteHeader.REGISTRY_FIELD), FILE_SECTIONS.LOT_HEADER

        lotsWithSegments = _.map lots, @extractDetails.bind @

        {
            "#{FILE_HEADER}": @extractFields fileHeaderLine, FILE_HEADER
            lots: lotsWithSegments
            "#{FILE_TRAILING}": @extractFields fileTrailingLine, FILE_TRAILING
        }
        
module.exports = Retorno
