/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Rules = require('../../layout/Rules');
const Utils = require('./Utils');
const Joi = require('joi');
const expect = require('expect.js');
const _ = require('lodash');
const removeAccents = require('remove-accents');

var Remessa = (function() {
    let FILE_HEADER = undefined;
    let FILE_TRAILING = undefined;
    let LOT_HEADER = undefined;
    let LOT_TRAILING = undefined;
    let DETAIL = undefined;
    let DETAIL2 = undefined;
    let FILE_SECTIONS = undefined;
    Remessa = class Remessa {
        static initClass() {
    
            FILE_HEADER = 'ArquivoHeader';
            FILE_TRAILING = 'ArquivoTrailing';
            LOT_HEADER = 'LoteHeader';
            LOT_TRAILING = 'LoteTrailing';
            DETAIL = 'Detail';
            DETAIL2 = 'Detail2';
            FILE_SECTIONS = [FILE_HEADER, LOT_HEADER, DETAIL, DETAIL2, LOT_TRAILING, FILE_TRAILING];
        }

        constructor(bank, type, deps) {
            const rules = (deps != null ? deps.Rules : undefined) || Rules;
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

        // TODO: add data, enum and range validations
        validateLenghts(rulesName, userValues) {
            if (rulesName == null) { throw new Error('RulesName is mandatory'); }
            if (userValues == null) { throw new Error('UserValues is mandatory'); }
            const rules = _.reduce(this.rules[rulesName], function(rules, fieldConfig) {
                let rule = Joi.string().max(fieldConfig.length);
                if (fieldConfig.required && (fieldConfig.default == null)) { rule = rule.required(); }
                rules[fieldConfig.field] = rule;
                return rules;
            }
            , {});
            rules.section = Joi.string().optional();

            const validation = __guard__(__guard__(__guard__((Joi.validate(userValues, Joi.object(rules), {abortEarly: false})), x2 => x2.error), x1 => x1.details), x => x.map(error => error.message));
            if (!_.isEmpty(validation)) { throw new Error(validation); }
            return _.each(_.filter(this.rules[rulesName], 'default'), function(config) {
                if (config.default.toString().length !== config.length) {
                    throw new Error(`${rulesName}.${config.field} length must be less than or equal to ${config.length} characters long`);
                }
            });
        }

        prepare(rulesName, validated) {
            let value;
            const utils = new Utils;
            const rules = _.cloneDeep(this.rules[rulesName]);
            for (let key in validated) {
                value = validated[key];
                const fieldConfig = _.find(rules, {field: key});
                if (fieldConfig != null) {
                    fieldConfig.value = value;
                }
            }

            // formats all fields to match the required length
            return _.map(rules, function(item) {
                // we consider that the default values already have the correct length
                if ((item.default != null) && (item.value == null)) { return item; }
                // if there's no value (eg, non-required field with no default value)
                if (item.value == null) {
                    const meaninglessChar = item.type === 'alphanumeric' ? ' ' : '0';
                    item.value = new Array(item.length).fill(meaninglessChar).join('');
                }
                // for now, when the field doesn't have a type, it defaults to numeric
                item.value  = (item.type != null) && (item.type === 'alphanumeric') ? utils.padString(item) : utils.padNumber(item);
                return item;
            });
        }

        // inserts the params into the 240b string, filling gaps where no values are passed
        build(prepared) {
            const base = Array(240);
            _.map(prepared, function(fieldConfig) {
                const fieldValue = (fieldConfig.value != null ? fieldConfig.value.toString() : undefined) || (fieldConfig.default != null ? fieldConfig.default.toString() : undefined);
                const args = [fieldConfig.startPos, fieldConfig.length].concat(fieldValue.toString().split(''));
                return base.splice.apply(base, args).join('');
            });
            base.shift();
            // console.log 'Checking section size on build'
            // expect(base.length).to.be 240
            return base.join('');
        }

        process(userValues, fileSections, newLine) {
            if (newLine == null) { newLine = '\n'; }
            if (FILE_SECTIONS == null) { FILE_SECTIONS = fileSections; }
            // let's test if all required file sections were given
            const missingKeys = _.difference(FILE_SECTIONS, _.keys(userValues));
            if (!_.isEmpty(missingKeys)) { throw Error(`Missing file sections: ${missingKeys.join(', ')}`); }

            // now we'll put the section key into each values object...
            const valuesArr =_.map(FILE_SECTIONS, function(section) {
                // the detail section could have several items
                if ((section === DETAIL) && _.isArray(userValues[section])) {
                    return _.map(userValues[section], function(subsection) {
                        subsection[0].section = section;
                        return subsection;
                    });
                } else {
                    userValues[section].section = section;
                    return userValues[section];
                }
        });
            //... and then flatten the array
            const sections = _.flattenDeep(valuesArr);
            // process'em all!
            const remessa = _.map(sections, section => {
                const sectionKey = section.section;
                const sectionValues = _.omit(section, 'section');
                this.validateLenghts(sectionKey, sectionValues);
                return this.build(this.prepare(sectionKey, sectionValues));
            });
            return removeAccents(remessa.join(newLine) + newLine);
        }
    };
    Remessa.initClass();
    return Remessa;
})();

module.exports = Remessa;

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}