_ = require 'lodash'
expect = require 'expect.js'
DevUtils = require '../src/DevUtils'
fs = require 'fs'

FILE_HEADER = 'ArquivoHeader'
FILE_TRAILING = 'ArquivoTrailing'
LOT_HEADER = 'LoteHeader'
LOT_TRAILING = 'LoteTrailing'
DETAIL = 'Detail'
DETAIL2 = 'Detail2'
FILE_SECTIONS = [FILE_HEADER, LOT_HEADER, DETAIL, DETAIL2, LOT_TRAILING, FILE_TRAILING]

bank = 'Bradesco'
type = 'Pagamento'

validator = new DevUtils bank, type
# validator.validate()
# validator.getRequired()

fileString = fs.readFileSync '/home/andre/remessa'
fileData = fileString.toString()
# process.stdout.write '### '
# console.log fileData
# process.stdout.write ' ###'

# console.log '\n>>>>> extracted fields\n'
extractedFields = validator.extract FILE_SECTIONS, fileData

# console.log '\n>>>>> fields length validation'
validator.validateFieldsLength extractedFields

# console.log '\n>>>>> file length validation\n'
expect(fileData.length).to.be FILE_SECTIONS.length * 240 + FILE_SECTIONS.length - 1


# coffeelint: enable=no_trailing_whitespace
# validator.extract sections, string
