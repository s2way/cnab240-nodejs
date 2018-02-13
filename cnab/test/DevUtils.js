const _ = require('lodash')
const expect = require('expect.js')
const DevUtils = require('../src/DevUtils')
const fs = require('fs')

FILE_HEADER = 'ArquivoHeader'
FILE_TRAILING = 'ArquivoTrailing'
LOT_HEADER = 'LoteHeader'
LOT_TRAILING = 'LoteTrailing'
DETAIL = 'Detail'
DETAIL2 = 'Detail2'
FILE_SECTIONS = [FILE_HEADER, LOT_HEADER, DETAIL, DETAIL2, LOT_TRAILING, FILE_TRAILING]

const bank = 'Bradesco'
const type = 'Conciliacao'

validator = new DevUtils(bank, type)
validator.validate()
const fileData = fs.readFileSync('/skyunix/EXTRATOS/extb237_3646_08021803.ret', 'utf8')
console.log('###')
console.log(fileData)
console.log('###')

console.log('\n>>>>> extracted fields\n')
const extractedFields = validator.extract(FILE_SECTIONS, fileData)
console.log(extractedFields);

console.log('\n>>>>> fields length validation')
validator.validateFieldsLength(extractedFields)

// coffeelint: enable=no_trailing_whitespace
// validator.extract sections, string
