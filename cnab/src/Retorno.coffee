rules = require '../../layout/Rules'
_ = require 'lodash'
expect = require 'expect.js'

class Retorno

    FILE_HEADER = 'ArquivoHeader'
    FILE_TRAILING = 'ArquivoTrailing'
    LOT_HEADER = 'LoteHeader'
    LOT_TRAILING = 'LoteTrailing'
    DETAIL = 'Detail'
    DETAIL2 = 'Detail2'
    FILE_SECTIONS = [FILE_HEADER, LOT_HEADER, DETAIL, DETAIL2, LOT_TRAILING, FILE_TRAILING]

    constructor: (bank, type) ->
        @rules =
            ArquivoHeader: rules[bank].ArquivoHeader
            ArquivoTrailing: rules[bank].ArquivoTrailing
            LoteHeader: rules[bank][type]?.LoteHeader
            LoteTrailing: rules[bank][type]?.LoteTrailing
            Detail: rules[bank][type]?.Detail
            Detail2: rules[bank][type]?.Detail2
        @CONSTANTS = rules[bank][type]?.Constants

    extract: (fileString, sections) ->
        FILE_SECTIONS ?= sections
        lines = fileString.split '\n'
        merged = _.reduce FILE_SECTIONS, (parsed, section, index) =>
            rules = @rules[section]
            content = lines[index]
            sectionData = _.reduce rules, (extracted, rule) ->
                extracted.push "#{rule.field}": content?.split('').slice(rule.startPos-1, rule.endPos).join ''
                extracted
            , []
            parsed[section] = sectionData
            parsed
        , {}
        merged

module.exports = Retorno
