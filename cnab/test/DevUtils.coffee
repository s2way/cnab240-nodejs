_ = require 'lodash'
expect = require 'expect.js'
DevUtils = require '../src/DevUtils'

bank = 'HSBC'
type = 'Pagamento'

validator = new DevUtils bank, type
# validator.validate()
# validator.getRequired()

sections = ['ArquivoHeader', 'LoteHeader', 'Detail', 'LoteTrailing', 'ArquivoTrailing']
# coffeelint: disable=no_trailing_whitespace
string = """39900000         207144407000131456977              00000 000000000000  Versul Tecnologias Ltda       HSBC                                    12908201608560000000102001600CPGY2K                                                               
39900001C2001020 207144407000131456977              00000 0000000000000 Versul Tecnologias Ltda                                                                                                                     00000000                    
3990000300001A00001800102027 0000000109045 Andre Feijo Meirelles         153                 29082016R$                  0000000010000                                                                                                          
39900005         000003   000000000010000                                                                                                                                                                                                       
39999999         000001000005                                                                                                                                                                                                                   """
# coffeelint: enable=no_trailing_whitespace
# validator.extract sections, string