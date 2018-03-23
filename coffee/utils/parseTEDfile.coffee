readline = require 'readline'
fs = require 'fs'
# CNAB = require 'cnab240-nodejs'

Retorno = require '../cnab/src/Retorno'

ui = readline.createInterface 
    input: process.stdin
    output: process.stdout

# ui.question 'Informe o caminho completo do arquivo:\n> ', (path) ->
    path = '/home/kanno/Documentos/Projects/cnab-service/emulate_skyunix/BKP/_pag237_3646_28111700.ret'
    console.log ''
    console.log "Abrindo '#{path}'"
    fs.readFile path, {encoding: 'utf8'}, (error, data) ->
        if error
            console.log error
            process.exit 1
        retorno = new Retorno 'Bradesco', 'Pagamento'
        extracted = retorno.extract data
        console.log JSON.stringify(extracted, null, 2)
        console.log "Escrevendo em 'output.json'..."
        fs.writeFile './output.json', JSON.stringify(extracted, null, 2), (error) ->
            if error
                console.log error
                process.exit 1
            console.log 'Feito. Saindo...'
            process.exit()