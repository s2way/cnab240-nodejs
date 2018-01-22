// Remessa = require '../src/Remessa'
// expect = require 'expect.js'
//
// describe 'Remessa.js', ->
//
//     rules = null
//
//     beforeEach ->
//         rules =
//             Bank:
//                 ArquivoHeader: [
//                     {
//                         field: 'banco'
//                         startPos: 1
//                         endPos: 3
//                         length: 3
//                         required: true
//                         default: 399
//                         type: 'numeric'
//                     }
//                     {
//                         field: 'lote'
//                         startPos: 4
//                         endPos: 7
//                         length: 4
//                         required: true
//                         default: '0000'
//                         type: 'numeric'
//                     }
//                     {
//                         field: 'conta_agencia'
//                         startPos: 53
//                         endPos: 57
//                         length: 5
//                         required: true
//                         type: 'numeric'
//                     }
//                     {
//                         field: 'nome_banco'
//                         startPos: 71
//                         endPos: 71
//                         length: 20
//                         required: false
//                         type: 'alphanumeric'
//                     }
//                     {
//                         field: 'conta_dig_verificador'
//                         startPos: 71
//                         endPos: 71
//                         length: 1
//                         required: false
//                         type: 'alphanumeric'
//                     }
//                 ]
//
//     describe 'when a new instance is created', ->
//
//         TempRemessa = null
//
//         beforeEach ->
//             TempRemessa = require '../src/Remessa'
//
//         it 'should throw an exception if no type is passed', ->
//
//             expect(TempRemessa).to.throwError /Bank is mandatory/
//
//         it 'should throw an exception if no bank is passed', ->
//
//             expect(TempRemessa).withArgs('HSBC').to.throwError /Type is mandatory/
//
//         it 'should create the instance if all params have been passed', ->
//
//             expect(TempRemessa).withArgs('HSBC', 'Pagamento').not.to.throwError()
//
//     describe 'when validating data', ->
//
//         it 'throw an exception if no rulesName is passed', ->
//
//             remessa = new Remessa 'Bank', 'Pagamento', Rules: rules
//
//             expect(remessa.validate).to.throwError /RulesName is mandatory/
//
//         it 'throw an exception if no params is passed', ->
//
//             remessa = new Remessa 'Bank', 'Pagamento', Rules: rules
//
//             expect(remessa.validate).withArgs('ArquivoHeader').to.throwError /UserValues is mandatory/
//
//         it 'throw an exception if any required field without default value is missing', ->
//             remessa = new Remessa 'Bank', 'Pagamento', Rules: rules
//             try
//                 remessa.validate 'ArquivoHeader', {}
//                 expect().fail('Exception not thrown')
//             catch e
//                 expect(e.message).to.eql '"conta_agencia" is required'
//
//         it 'throw an exception if any field exceeds its max length config', ->
//             params =
//                 banco: 'exceeding field'
//                 lote: '1'
//                 conta_agencia: '1'
//                 nome_banco: '1'
//                 conta_dig_verificador: '1'
//
//             remessa = new Remessa 'Bank', 'Pagamento', Rules: rules
//             try
//                 remessa.validate 'ArquivoHeader', params
//                 expect().fail('Exception not thrown')
//             catch e
//                 expect(e.message).to.eql '"banco" length must be less than or equal to 3 characters long'
//
//     describe 'when preparing data', ->
//
//         it 'should merge the passed params with default values from the rules files', ->
//             remessa = new Remessa 'Bank', 'Pagamento', Rules: rules
//             params = lote: '001', conta_agencia: '01', nome_banco: 'Bank'
//
//             expectedOutput = [
//                 {
//                     field: 'banco'
//                     startPos: 1
//                     endPos: 3
//                     length: 3
//                     required: true
//                     default: 399
//                     type: 'numeric'
//                 }
//                 {
//                     field: 'lote'
//                     startPos: 4
//                     endPos: 7
//                     length: 4
//                     required: true
//                     default: '0000'
//                     type: 'numeric'
//                     value: '0001'
//                 }
//                 {
//                     field: 'conta_agencia'
//                     startPos: 53
//                     endPos: 57
//                     length: 5
//                     required: true
//                     type: 'numeric'
//                     value: '00001'
//                 }
//                 {
//                     field: 'nome_banco'
//                     startPos: 71
//                     endPos: 71
//                     length: 20
//                     required: false
//                     type: 'alphanumeric'
//                     value: 'Bank                '
//                 }
//                 {
//                     field: 'conta_dig_verificador'
//                     startPos: 71
//                     endPos: 71
//                     length: 1
//                     required: false
//                     type: 'alphanumeric'
//                     value: ' '
//                 }
//             ]
//
//             prepared = remessa.prepare 'ArquivoHeader', params
//             expect(prepared).to.eql expectedOutput
//
//     describe 'when building data', ->
//
//         it 'should insert the ArquivoHeader field values in the default 240b string', ->
//             required =
//                 empresa_inscricao_tipo: 2
//                 empresa_inscricao_num: 11222333123456
//                 convenio: 987987
//                 empresa_nome: 'Obladi Oblada                 '
//                 nome_banco: 'Brasil                        '
//                 arquivo_data_geracao: 11122016
//                 arquivo_hora_geracao: 100000
//                 arquivo_sequencia: 123456
//
//             remessa = new Remessa 'HSBC', 'Pagamento'
//
//             arquivoHeaderPrepared = remessa.prepare 'ArquivoHeader', required
//
//             expectedObject = '39900000         211222333123456987987              00000 000000000000  Obladi Oblada                 Brasil                                  11112201610000012345602001600CPGY2K                                                               '
//
//             built = remessa.build arquivoHeaderPrepared
//
//             firstQuarterBuilt = built.split('')[0..59]
//             secondQuarterBuilt = built.split('')[60..119]
//             thirdQuarterBuilt = built.split('')[120..179]
//             fourthQuarterBuilt = built.split('')[180..240]
//
//             firstQuarterExpected = expectedObject.split('')[0..59]
//             secondQuarterExpected = expectedObject.split('')[60..119]
//             thirdQuarterExpected = expectedObject.split('')[120..179]
//             fourthQuarterExpected = expectedObject.split('')[180..240]
//
//             expect(built).to.have.length 240
//             expect(firstQuarterBuilt.length).to.be firstQuarterExpected.length
//             expect(firstQuarterBuilt.join('')).to.eql firstQuarterExpected.join ''
//             expect(secondQuarterBuilt.length).to.be secondQuarterExpected.length
//             expect(secondQuarterBuilt.join('')).to.eql secondQuarterExpected.join ''
//             expect(thirdQuarterBuilt.length).to.be thirdQuarterExpected.length
//             expect(thirdQuarterBuilt.join('')).to.eql thirdQuarterExpected.join ''
//             expect(fourthQuarterBuilt.length).to.be fourthQuarterExpected.length
//             expect(fourthQuarterBuilt.join('')).to.eql fourthQuarterExpected.join ''
//
//         it 'should insert the ArquivoTrailing field values in the default 240b string', ->
//             required =
//                 qtde_lotes: '000001'
//                 qtde_registros: '000005'
//
//             remessa = new Remessa 'HSBC', 'Pagamento'
//
//             arquivoTrailingPrepared = remessa.prepare 'ArquivoTrailing', required
//
//             expectedObject = '39999999         000001000005                                                                                                                                                                                                                   '
//
//             expect(expectedObject).to.have.length 240 # let's make things easier :)
//
//             built = remessa.build arquivoTrailingPrepared
//
//             firstQuarterBuilt = built.split('')[0..59]
//             secondQuarterBuilt = built.split('')[60..119]
//             thirdQuarterBuilt = built.split('')[120..179]
//             fourthQuarterBuilt = built.split('')[180..240]
//
//             firstQuarterExpected = expectedObject.split('')[0..59]
//             secondQuarterExpected = expectedObject.split('')[60..119]
//             thirdQuarterExpected = expectedObject.split('')[120..179]
//             fourthQuarterExpected = expectedObject.split('')[180..240]
//
//             expect(built).to.have.length 240
//             expect(firstQuarterBuilt.length).to.be firstQuarterExpected.length
//             expect(firstQuarterBuilt.join('')).to.eql firstQuarterExpected.join ''
//             expect(secondQuarterBuilt.length).to.be secondQuarterExpected.length
//             expect(secondQuarterBuilt.join('')).to.eql secondQuarterExpected.join ''
//             expect(thirdQuarterBuilt.length).to.be thirdQuarterExpected.length
//             expect(thirdQuarterBuilt.join('')).to.eql thirdQuarterExpected.join ''
//             expect(fourthQuarterBuilt.length).to.be fourthQuarterExpected.length
//             expect(fourthQuarterBuilt.join('')).to.eql fourthQuarterExpected.join ''
//
//         it 'should insert the LoteHeader field values in the default 240b string', ->
//             remessa = new Remessa 'HSBC', 'Pagamento'
//
//             required =
//                 servico: 10
//                 forma_lancamento: 99
//                 empresa_tipo_insc: 2
//                 empresa_num_insc: 11222333444455
//                 convenio: 987987
//                 conta_agencia: 98765
//                 conta_num: 888888888888
//                 conta_dig_verificador: 7
//                 empresa_nome: 'AAAAAAAAAABBBBBBBBBBCCCCCCCCCC'
//                 mensagem_mkt: 'MSGMKTMSGMKTMSGMKTMSGMKTMSGMKTMSGMKTMSGM'
//                 endereco_logradouro: 'RUARUARUARUARUARUARUARUARUARUA'
//                 endereco_num: '11111'
//                 endereco_compl: 'COMPLCOMPLCOMPL'
//                 endereco_cidade: 'CITYCITYCITYCITYCITY'
//                 endereco_cep: 33333
//                 endereco_cep_compl: 444
//                 endereco_estado: 'RS'
//                 comprovante_pgto: 'S'
//
//             loteHeaderPrepared = remessa.prepare 'LoteHeader', required
//
//             expectedObject = '39900001C1099020 211222333444455987987              98765 8888888888887 AAAAAAAAAABBBBBBBBBBCCCCCCCCCCMSGMKTMSGMKTMSGMKTMSGMKTMSGMKTMSGMKTMSGMRUARUARUARUARUARUARUARUARUARUA11111COMPLCOMPLCOMPLCITYCITYCITYCITYCITY33333444RSS                 '
//
//             expect(expectedObject).to.have.length 240
//
//             built = remessa.build loteHeaderPrepared
//
//             firstQuarterBuilt = built.split('')[0..59]
//             secondQuarterBuilt = built.split('')[60..119]
//             thirdQuarterBuilt = built.split('')[120..179]
//             fourthQuarterBuilt = built.split('')[180..240]
//
//             firstQuarterExpected = expectedObject.split('')[0..59]
//             secondQuarterExpected = expectedObject.split('')[60..119]
//             thirdQuarterExpected = expectedObject.split('')[120..179]
//             fourthQuarterExpected = expectedObject.split('')[180..240]
//
//             expect(built).to.have.length 240
//             expect(firstQuarterBuilt.length).to.be firstQuarterExpected.length
//             expect(firstQuarterBuilt.join('')).to.eql firstQuarterExpected.join ''
//             expect(secondQuarterBuilt.length).to.be secondQuarterExpected.length
//             expect(secondQuarterBuilt.join('')).to.eql secondQuarterExpected.join ''
//             expect(thirdQuarterBuilt.length).to.be thirdQuarterExpected.length
//             expect(thirdQuarterBuilt.join('')).to.eql thirdQuarterExpected.join ''
//             expect(fourthQuarterBuilt.length).to.be fourthQuarterExpected.length
//             expect(fourthQuarterBuilt.join('')).to.eql fourthQuarterExpected.join ''
//
//         it 'should insert the LoteTrailing field values in the default 240b string', ->
//             remessa = new Remessa 'HSBC', 'Pagamento'
//
//             required =
//                 qtde_registros: '000003'
//                 valor_credito: '000000000010000'
//
//             loteTrailingPrepared = remessa.prepare 'LoteTrailing', required
//
//             expectedObject = '39900005         000003   000000000010000                                                                                                                                                                                                       '
//
//             expect(expectedObject).to.have.length 240
//
//             built = remessa.build loteTrailingPrepared
//
//             firstQuarterBuilt = built.split('')[0..59]
//             secondQuarterBuilt = built.split('')[60..119]
//             thirdQuarterBuilt = built.split('')[120..179]
//             fourthQuarterBuilt = built.split('')[180..240]
//
//             firstQuarterExpected = expectedObject.split('')[0..59]
//             secondQuarterExpected = expectedObject.split('')[60..119]
//             thirdQuarterExpected = expectedObject.split('')[120..179]
//             fourthQuarterExpected = expectedObject.split('')[180..240]
//
//             expect(built).to.have.length 240
//             expect(firstQuarterBuilt.length).to.be firstQuarterExpected.length
//             expect(firstQuarterBuilt.join('')).to.eql firstQuarterExpected.join ''
//             expect(secondQuarterBuilt.length).to.be secondQuarterExpected.length
//             expect(secondQuarterBuilt.join('')).to.eql secondQuarterExpected.join ''
//             expect(thirdQuarterBuilt.length).to.be thirdQuarterExpected.length
//             expect(thirdQuarterBuilt.join('')).to.eql thirdQuarterExpected.join ''
//             expect(fourthQuarterBuilt.length).to.be fourthQuarterExpected.length
//             expect(fourthQuarterBuilt.join('')).to.eql fourthQuarterExpected.join ''
//
//         it 'should insert the Pagamento field values in the default 240b string', ->
//             remessa = new Remessa 'HSBC', 'Pagamento'
//
//             required =
//                 registro: 3
//                 num_seq_registro_lote: '00001'
//                 movimento_tipo: 0
//                 movimento_cod: '00'
//                 cod_camara: '018'
//                 favorecido_cod_banco: '001'
//                 favorecido_agencia: '12345'
//                 favorecido_num_conta: '789789789789'
//                 favorecido_dig_verificador: '1'
//                 favorecido_nome: 'FAVORECIDOFAVORECIDOFAVORECIDO'
//                 doc_num: '1234567890123456'
//                 data_lcto_credito: '11112011'
//                 valor_lcto: '0000000010000'
//                 comprovante_pgto: 'S'
//                 pagador_efetivo: 'PAGADOREFETIVO1PAGADOREFETIVO1'
//                 info2: 'INFO2INFO2INFO2INFO2INFO2INFO2INFO2INFO2'
//                 cod_finalidade_doc: '00'
//                 cod_finalidade_ted: '00001'
//                 cod_finalidade_compl: 'CC'
//                 aviso: 'N'
//
//             detailPrepared = remessa.prepare 'Detail', required
//
//             expectedObject = '3990000300001A00001800112345 7897897897891 FAVORECIDOFAVORECIDOFAVORECIDO1234567890123456    11112011R$                  0000000010000SPAGADOREFETIVO1PAGADOREFETIVO1            INFO2INFO2INFO2INFO2INFO2INFO2INFO2INFO20000001CC   N          '
//
//             expect(expectedObject).to.have.length 240
//
//             built = remessa.build detailPrepared
//
//             firstQuarterBuilt = built.split('')[0..59]
//             secondQuarterBuilt = built.split('')[60..119]
//             thirdQuarterBuilt = built.split('')[120..179]
//             fourthQuarterBuilt = built.split('')[180..240]
//
//             firstQuarterExpected = expectedObject.split('')[0..59]
//             secondQuarterExpected = expectedObject.split('')[60..119]
//             thirdQuarterExpected = expectedObject.split('')[120..179]
//             fourthQuarterExpected = expectedObject.split('')[180..240]
//
//             expect(built).to.have.length 240
//             expect(firstQuarterBuilt.length).to.be firstQuarterExpected.length
//             expect(firstQuarterBuilt.join('')).to.eql firstQuarterExpected.join ''
//             expect(secondQuarterBuilt.length).to.be secondQuarterExpected.length
//             expect(secondQuarterBuilt.join('')).to.eql secondQuarterExpected.join ''
//             expect(thirdQuarterBuilt.length).to.be thirdQuarterExpected.length
//             expect(thirdQuarterBuilt.join('')).to.eql thirdQuarterExpected.join ''
//             expect(fourthQuarterBuilt.length).to.be fourthQuarterExpected.length
//             expect(fourthQuarterBuilt.join('')).to.eql fourthQuarterExpected.join ''
//
//     describe 'when processing data', ->
//
//         userValues = null
//         processRules = null
//         beforeEach ->
//             userValues =
//                 ArquivoHeader: banco: '399'
//                 ArquivoTrailing: conta_agencia: '3020'
//                 LoteHeader: nome_banco: 'Brasil'
//                 LoteTrailing: conta_dig_verificador: '0'
//                 Detail: lote: '02'
//                 Detail2: empresa_tipo_insc: '1'
//             processRules =
//                 Bank:
//                     ArquivoHeader: [
//                         {
//                             field: 'banco'
//                             startPos: 1
//                             endPos: 3
//                             length: 3
//                             required: true
//                             default: 399
//                             type: 'numeric'
//                         }
//                     ]
//                     ArquivoTrailing: [
//                         {
//                             field: 'conta_agencia'
//                             startPos: 53
//                             endPos: 57
//                             length: 5
//                             required: true
//                             type: 'numeric'
//                         }
//                     ]
//                     Pagamento:
//                         LoteHeader: [
//                             {
//                                 field: 'nome_banco'
//                                 startPos: 71
//                                 endPos: 71
//                                 length: 20
//                                 required: false
//                                 type: 'alphanumeric'
//                             }
//                         ]
//                         LoteTrailing: [
//                             {
//                                 field: 'conta_dig_verificador'
//                                 startPos: 71
//                                 endPos: 71
//                                 length: 1
//                                 required: false
//                                 type: 'alphanumeric'
//                             }
//                         ]
//                         Detail: [
//                             {
//                                 field: 'lote'
//                                 startPos: 4
//                                 endPos: 7
//                                 length: 5
//                                 required: true
//                                 default: '0000'
//                                 type: 'numeric'
//                             }
//                         ]
//                         Detail2: [
//                             {
//                                 field: 'empresa_tipo_insc'
//                                 startPos: 10
//                                 endPos: 11
//                                 length: 1
//                                 required: true
//                                 type: 'numeric'
//                             }
//                         ]
//
//         it 'should throw an error if any required file section is missing', ->
//
//             remessa = new Remessa 'Bank', 'Pagamento', Rules: processRules
//             expect(remessa.process).withArgs({ArquivoHeader: {}, ArquivoTrailing: {}}).to.throwError /Missing file sections: LoteHeader, Detail, Detail2, LoteTrailing/
//
//         it 'should throw an error if any required field is missing', ->
//
//             remessa = new Remessa 'Bank', 'Pagamento', Rules: processRules
//             delete userValues.ArquivoTrailing.conta_agencia
//             try
//                 remessa.process userValues
//                 expect().fail()
//             catch e
//                 expect(e.message).to.be '"conta_agencia" is required'
//
//         it 'should build and return a remessa string', ->
//
//             expectedOutput = '399\nBrasil              \n00002\n1\n0\n03020'
//
//             remessa = new Remessa 'Bank', 'Pagamento', Rules: processRules
//             expect(remessa.process userValues).to.be expectedOutput
//
//         it 'should build the string if there are more than one detail', ->
//
//             expectedOutput = '399\nBrasil              \nlote1\nlote2\n1\n0\n03020'
//
//             remessa = new Remessa 'Bank', 'Pagamento', Rules: processRules
//             userValues.Detail = [
//                 [
//                     {
//                         lote: 'lote1'
//                     }
//                 ]
//                 [
//                     {
//                         lote: 'lote2'
//                     }
//                 ]
//             ]
//             expect(remessa.process userValues).to.be expectedOutput
