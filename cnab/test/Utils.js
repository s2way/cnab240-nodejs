/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('lodash');
const expect = require('expect.js');
const Utils = require('../src/Utils');

describe('Utils', function() {

    let utils = null;

    beforeEach(() => utils = new Utils);

    describe('padString', function() {

        it('should add whitespaces do the right of the value', () => expect(utils.padString({value: '123456', length: 10})).to.be('123456    '));

        return it('should return whitespaces if value is undefined', () => expect(utils.padString({length: 10})).to.be('          '));
    });

    return describe('padNumber', function() {

        it('should add zeroes do the left of the value', () => expect(utils.padNumber({value: '123456', length: 10})).to.be('0000123456'));

        return it('should return zeroes if value is undefined', () => expect(utils.padNumber({length: 10})).to.be('0000000000'));
    });
});
