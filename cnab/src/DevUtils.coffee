rules = require '../../layout/Rules'
expect = require 'expect.js'
_ = require 'lodash'

class DevUtils

    constructor: (bank, type) ->
        @rules =
            ArquivoHeader: rules[bank].ArquivoHeader
            ArquivoTrailing: rules[bank].ArquivoTrailing
            LoteHeader: rules[bank][type].LoteHeader
            LoteTrailing: rules[bank][type].LoteTrailing
            Detail: rules[bank][type].Detail
            Detail2: rules[bank][type].Detail2

    getRequired: ->
        for key, subject of @rules
            @_log '---------------------'
            @_log "Required for #{key}"
            required = _.filter(subject, required: true).map (item) ->
                "#{item.field}": _.pick item, ['type', 'length', 'default'] unless item.default?
            @_log JSON.stringify _.compact(required), null, 4

    getAllFields: ->
        for key, subject of @rules
            @_log '---------------------'
            @_log "Fields for #{key}"
            required = _.map subject, (item) ->
                "#{item.field}": _.pick item, ['type', 'length', 'default']
            # @_log required

    extract: (sections, fileString) ->
        fileSections = fileString.split '\n'
        _.each fileSections, (section) -> expect(section.length).to.be 240
        merged = _.reduce sections, (parsed, section, index) =>
            rules = @rules[section]
            content = fileSections[index]
            sectionData = _.reduce rules, (extracted, rule) ->
                extracted.push "#{rule.field}": content?.split('').slice(rule.startPos-1, rule.endPos).join ''
                extracted
            , []
            parsed[section] = sectionData
            parsed
        , {}
        merged

    validate: ->
        for key, subject of @rules
            expect(subject).not.to.be undefined
            @_log '---------------------'
            @_log "Testing #{key}"

            total = _.reduce subject, (control, value) =>
                @_stdout "Testing field #{value.field}... "
                expect(value.startPos).to.be control.lastPos + 1
                expect(value.endPos - value.startPos + 1).to.be value.length
                @_stdout "done.\n"
                control.lastPos = value.endPos
                control.totalLength += value.length
                control
            , {totalLength: 0, lastPos: 0}

            expect(total.totalLength).to.be 240

    validateFieldsLength: (fileData) =>
        sections = _.keys @rules
        _.each sections, (section) =>
            fieldsConfig = @rules[section]
            sectionTotalLength = 0
            _.each fieldsConfig, (config) ->
                dataField = _.find fileData[section], config.field
                _.pull fileData[section], dataField
                # console.log "Checking #{section}.#{config.field} length. Expected: #{config.length}, got: #{dataField[config.field].length}"
                expect(dataField[config.field].length).to.be config.length
                sectionTotalLength += dataField[config.field].length
            # console.log "Checking section '#{section}' total length... expected 240, got #{sectionTotalLength}"
            expect(sectionTotalLength).to.be 240

    _log: (msg) ->
        # console.log msg

    _stdout: (msg) ->
        process.stdout.write msg


module.exports = DevUtils
