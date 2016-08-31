# cnab240-nodejs
Biblioteca para gerar arquivos de remessa no padrão CNAB 240

Este projeto foi concebido para facilitar a geração de arquivos no padrão CNAB 240 da Febraban (veja o manual em: http://bit.ly/2c9ssdZ). Se você já possui alguma familiaridade com o padrão 240 posições, sabe que é preciso no mínimo 5 strings de 240 caracteres separadas por quebras de linha, sendo que cada string equivale a uma seção do arquivo:

    Header do Arquivo
    Header do Lote
    Detalhe
    Trailing do Lote
    Trailing do Arquivo

Enquanto o header e trailing de arquivo sejam os mesmos para qualquer tipo de operação, as seções pertinentes ao lote e o detalhe (ou detalhes) possuem informações especializadas. O lote pode conter uma ou mais operações.

Embora a FEBRABAN tenha criado o padrão para normatizar a comunicação via arquivos digitais, cada banco implementou o padrão de forma diferente, o que implica em um layout diferente por banco. Por isso, se a operação do banco com o qual você está integrando não existir, você irá precisar criar o layout.

Esta biblioteca funciona de forma muito simples: você tem os arquivos de layout e o motor que gera as strings de 240 posições de cada seção do arquivo; para gerar um arquivo, você passa os parâmetros requeridos e o nome do layout para a biblioteca, e ela irá retornar a string.

Os arquivos de layout ficam na pasta "layout" e estão organizados conforme a seguinte estrutura:

    -- layout
        -- {nome do banco}
            -- ArquivoHeader.coffee
            -- ArquivoTrailing.coffee
            -- {nome da operacao}
                -- LoteHeader.coffee
                -- LoteTrailing.coffee
                -- {nome da operacao}.coffee
            
Na pasta layout há, ainda, um arquivo que exporta as regras na mesma estrutura:

    module.exports =
        {nome do banco}:
            ArquivoHeader: require './{nome do banco}/ArquivoHeader.coffee'
            ArquivoTrailing: require './{nome do banco}/ArquivoTrailing.coffee'
            {nome da operacao}:
                LoteHeader: require './{nome do banco}/{nome da operacao}/LoteHeader.coffee'
                LoteTrailing: require './{nome do banco}/{nome da operacao}/LoteTrailing.coffee'
                Detail: require './{nome do banco}/{nome da operacao}/{nome da operacao}.coffee'

Então, ao criar um novo layout você precisa, além de seguir a estrutura acima definida, atualizar o arquivo Rules.coffee para que exporte o novo layout.

O arquivo de layout nada mais é que um array com as regras de cada campo...


```
module.exports = [
    {
        field: 'banco'
        startPos: 1
        endPos: 3
        length: 3
        required: true
        default: 399
    }
    {
        field: 'lote'
        startPos: 4
        endPos: 7
        length: 4
        required: true
        default: '0000'
    }
    {
        field: 'registro'
        startPos: 8
        endPos: 8
        length: 1
        required: true
        default: '0'
    }
    ...
```

E o que significa cada campo?

    - field: *nome do campo*
    - startPos: *posicao na string em que o campo começa*
    - endPos: *posicao na string em que o campo termina*
    - length: *comprimento do campo*
    - required: *se o campo é obrigatório ou não*
    - default: *valor padrão do campo (seja ele fixo ou não)* (opcional)
    - type: *tipo do dado* (opcional se o campo default existir)

Para a criação dos arquivos de layout, você deve seguir o manual disponibilizado por cada banco.

## Como utilizar

```
Remessa = require('../../main').Remessa
remessa = new Remessa 'HSBC', 'Pagamento'
file = remessa.process userValues
```

## API

new Remessa(bank, type)
Cria uma nova instância utilizando o layout `type` de `bank`.
Ex:
`new Remessa('HSBC', 'Pagamento')`

validate(rulesName, userValues)
Valida as informações de `userValues` contra as regras da seção `rulesName`
Ex:
```
userValues =
    banco: 'HSBC'
    lote: '1'
    registro: '0'
validate('ArquivoHeader', userValues)
```

prepare(rulesName, validated)
Formata as informações para corresponder às configurações do campo
Retorna as regras com os valores formatados
Ex: `prepare('LoteHeader', userValues)`

build(prepared)
Constrói a string de 240 posições inserindo os valores em suas respectivas posições, a partir do retorno da função prepare()
Retorna uma string de 240 posições
Ex: `build(prepared)`

process(userValues)
Executa o processo de validação, preparação e construção de strings em sequência.
Retorna uma string com todas as seções do arquivo de remessa, separadas por quebras de linha
Ex: `process(userValues)`


Para utilizar o wrapper process() os dados devem estar estruturados em seções, conforme exemplificado em cnab/test/Example.coffee.

Para gerar mais de uma operação por lote (por exemplo, 5 TEDs ou 100 boletos) a chave `Detail` deve conter, em lugar de um objeto, um array de objetos.
