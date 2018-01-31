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

bank = 'Bradesco'
type = 'Conciliacao'

validator = new DevUtils(bank, type)
validator.validate()
// validator.getRequired()

// const fileData = {
//     ArquivoHeader: {
//         empresa_inscricao_tipo: 2,
//         empresa_inscricao_num: 88897654000191,
//         convenio: 123456,
//         agencia_dig_verificador: 1,
//         empresa_nome: '123456789012345678901234567890',
//         nome_banco: 'banco                         ',
//         arquivo_data_geracao: 31012018,
//         arquivo_hora_geracao: 121321,
//         arquivo_sequencia: 000001
//     },
//     ArquivoTrailing: {
//         qtde_lotes: 000001,
//         qtde_registros: 000001,
//         qtde_contas: 000001
//     },
//     LoteHeader: {
//         empresa_tipo_insc: 2,
//         empresa_num_insc: 88897654000191,
//         convenio: 123456,
//         empresa_nome: '                              ',
//         data_inicial: 01012018,
//         tipo_moeda: '   '
//     },
//     LoteTrailing: {
//         empresa_tipo_insc: 2,
//         empresa_num_insc: 88897654000191,
//         convenio: 123456
//     },
//     Detail: {
//         num_seq_registro_lote: 00001,
//         empresa_tipo_insc: 2,
//         empresa_num_insc: 88897654000191,
//         convenio: 123456,
//         empresa_nome: '',
//         tipo_lancamento: 1
//     },
//     Detail2: {
//         num_seq_registro_lote: 00001,
//         empresa_tipo_insc: 2,
//         empresa_num_insc: 88897654000191,
//         data_vencimento: 01012018,
//         valor_documento: 1234567890123456
//     }
// }
// fileString = fs.readFileSync('/home/andre/remessa')
// fileData = fileString.toString()
// process.stdout.write('### ')
// console.log(fileData)
// process.stdout.write(' ###')
// 
// console.log('\n>>>>> extracted fields\n')
// // extractedFields = validator.extract(FILE_SECTIONS, fileData)
// extractedFields = validator.extract(FILE_SECTIONS, fileData)
// 
// console.log('\n>>>>> fields length validation')
// validator.validateFieldsLength(extractedFields)

// console.log('\n>>>>> file length validation\n')
// expect(fileData.length).to.be(FILE_SECTIONS.length * 240 + FILE_SECTIONS.length - 1)


// coffeelint: enable=no_trailing_whitespace
// validator.extract sections, string
