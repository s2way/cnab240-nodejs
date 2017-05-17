params =
    ArquivoHeader:
        empresa_inscricao_tipo: '2'
        empresa_inscricao_num: '09999999000101'
        convenio: '456789'
        empresa_nome: 'Versul Tecnologias Ltda'
        nome_banco: 'HSBC'
        arquivo_data_geracao: '29082016'
        arquivo_hora_geracao: '085600'
        arquivo_sequencia: '1'
    ArquivoTrailing:
        qtde_lotes: '1'
        qtde_registros: '1'
    LoteHeader:
        servico: '10'
        forma_lancamento: '03'
        empresa_tipo_insc: '2'
        empresa_num_insc: '09999999000101'
        convenio: '111'
        empresa_nome: 'Versul Tecnologias Ltda'
    LoteTrailing:
        qtde_registros: '1'
        valor_credito: '10000'
    Detail:
        num_seq_registro_lote: '1'
        movimento_tipo: '9'
        movimento_cod: '00'
        cod_camara: '018'
        favorecido_cod_banco: '001'
        favorecido_agencia: '2898'
        favorecido_num_conta: '17945'
        favorecido_dig_verificador: '7'
        favorecido_nome: 'Chuck Norris'
        doc_num: '153'
        data_lcto_credito: '29082016'
        valor_lcto: '10000'
    Detail2:
        num_seq_registro_lote: '1'
        movimento_tipo: '9'
        movimento_cod: '00'
        cod_camara: '018'
        favorecido_cod_banco: '001'
        favorecido_agencia: '2898'
        favorecido_num_conta: '17945'
        favorecido_dig_verificador: '7'
        favorecido_nome: 'Chuck Norris'
        doc_num: '153'
        data_lcto_credito: '29082016'
        valor_lcto: '10000'

Remessa = require('../../main').Remessa
remessa = new Remessa 'HSBC', 'Pagamento'
# file = remessa.process params
#
# require('expect.js')(file).to.have.length 1204
#
# moment = require 'moment'
# fileName = "example_file.REM"
# path = process.env.EFS or './gen_files'
#
# fs = require 'fs'
#
# fs.writeFile "#{path}/#{fileName}", file, (err) ->
#     return console.log "file save error: #{err}" if err?
#     console.log "file '#{fileName}' successfully saved"
