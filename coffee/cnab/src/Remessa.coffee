Rules = require '../../layout/Rules'
Utils = require './Utils'
Joi = require 'joi'
expect = require 'expect.js'
_ = require 'lodash'
removeAccents = require 'remove-accents'

class Remessa

    FILE_HEADER = 'ArquivoHeader'
    FILE_TRAILING = 'ArquivoTrailing'
    LOT_HEADER = 'LoteHeader'
    LOT_TRAILING = 'LoteTrailing'
    DETAIL = 'Detail'
    DETAIL2 = 'Detail2'
    FILE_SECTIONS = [FILE_HEADER, LOT_HEADER, DETAIL, DETAIL2, LOT_TRAILING, FILE_TRAILING]

    constructor: (bank, type, deps) ->
        rules = deps?.Rules or Rules
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

    # TODO: add data, enum and range validations
    validateLenghts: (rulesName, userValues) ->
        throw new Error 'RulesName is mandatory' unless rulesName?
        throw new Error 'UserValues is mandatory' unless userValues?
        rules = _.reduce @rules[rulesName], (rules, fieldConfig) ->
            rule = Joi.string().max(fieldConfig.length)
            rule = rule.required() if fieldConfig.required and not fieldConfig.default?
            rules[fieldConfig.field] = rule
            rules
        , {}
        rules.section = Joi.string().optional()

        validation = (Joi.validate userValues, Joi.object(rules), abortEarly: false)?.error?.details?.map (error) -> error.message
        throw new Error validation unless _.isEmpty validation
        _.each _.filter(@rules[rulesName], 'default'), (config) ->
            if config.default.toString().length isnt config.length
                throw new Error "#{rulesName}.#{config.field} length must be less than or equal to #{config.length} characters long"

    prepare: (rulesName, validated) ->
        utils = new Utils
        rules = _.cloneDeep @rules[rulesName]
        for key, value of validated
            fieldConfig = _.find rules, field: key
            fieldConfig?.value = value

        # formats all fields to match the required length
        _.map rules, (item) ->
            # we consider that the default values already have the correct length
            return item if item.default? and not item.value?
            # if there's no value (eg, non-required field with no default value)
            unless item.value?
                meaninglessChar = if item.type is 'alphanumeric' then ' ' else '0'
                item.value = new Array(item.length).fill(meaninglessChar).join ''
            # for now, when the field doesn't have a type, it defaults to numeric
            item.value  = if item.type? and item.type is 'alphanumeric' then utils.padString(item) else utils.padNumber(item)
            item

    # inserts the params into the 240b string, filling gaps where no values are passed
    build: (prepared) ->
        base = Array 240
        _.map prepared, (fieldConfig) ->
            fieldValue = fieldConfig.value?.toString() or fieldConfig.default?.toString()
            args = [fieldConfig.startPos, fieldConfig.length].concat fieldValue.toString().split ''
            base.splice.apply(base, args).join ''
        base.shift()
        # console.log 'Checking section size on build'
        # expect(base.length).to.be 240
        base.join ''

    process: (userValues, fileSections, newLine = '\n') ->
        FILE_SECTIONS ?= fileSections
        # let's test if all required file sections were given
        missingKeys = _.difference FILE_SECTIONS, _.keys userValues
        throw Error "Missing file sections: #{missingKeys.join(', ')}" unless _.isEmpty missingKeys

        # now we'll put the section key into each values object...
        valuesArr =_.map FILE_SECTIONS, (section) ->
            # the detail section could have several items
            if section is DETAIL and _.isArray(userValues[section])
                _.map userValues[section], (subsection) ->
                    subsection[0].section = section
                    subsection
            else
                userValues[section].section = section
                userValues[section]
        #... and then flatten the array
        sections = _.flattenDeep valuesArr
        # process'em all!
        remessa = _.map sections, (section) =>
            sectionKey = section.section
            sectionValues = _.omit section, 'section'
            @validateLenghts sectionKey, sectionValues
            @build @prepare sectionKey, sectionValues
        removeAccents(remessa.join(newLine) + newLine)

module.exports = Remessa
