rules = require '../rules/Rules'
expect = require 'expect.js'
_ = require 'lodash'

class Utils

    constructor: (bank, type) ->
        @rules =
            ArquivoHeader: rules[bank].ArquivoHeader
            ArquivoTrailing: rules[bank].ArquivoTrailing
            LoteHeader: rules[bank][type].LoteHeader
            LoteTrailing: rules[bank][type].LoteTrailing
            Detail: rules[bank][type].Detail

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

    _log: (msg) ->
        # console.log msg

    _stdout: (msg) ->
        # process.stdout.write msg


module.exports = Utils