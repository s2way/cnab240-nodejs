_ = require 'lodash'
expect = require 'expect.js'
DevUtils = require '../src/DevUtils'

bank = 'Bradesco'
type = 'Pagamento'

validator = new DevUtils bank, type
validator.validate()
validator.getRequired()

# coffeelint: enable=no_trailing_whitespace
# validator.extract sections, string
