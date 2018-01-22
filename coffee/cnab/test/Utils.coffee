_ = require 'lodash'
expect = require 'expect.js'
Utils = require '../src/Utils'

describe 'Utils', ->

    utils = null

    beforeEach ->
        utils = new Utils

    describe 'padString', ->

        it 'should add whitespaces do the right of the value', ->
            expect(utils.padString value: '123456', length: 10).to.be '123456    '

        it 'should return whitespaces if value is undefined', ->
            expect(utils.padString length: 10).to.be '          '

    describe 'padNumber', ->

        it 'should add zeroes do the left of the value', ->
            expect(utils.padNumber value: '123456', length: 10).to.be '0000123456'

        it 'should return zeroes if value is undefined', ->
            expect(utils.padNumber length: 10).to.be '0000000000'
