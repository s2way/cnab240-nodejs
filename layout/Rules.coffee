module.exports =
    HSBC:
        ArquivoHeader: require './HSBC/ArquivoHeader.coffee'
        ArquivoTrailing: require './HSBC/ArquivoTrailing.coffee'
        Pagamento:
            LoteHeader: require './HSBC/Pagamento/LoteHeader.coffee'
            LoteTrailing: require './HSBC/Pagamento/LoteTrailing.coffee'
            Detail: require './HSBC/Pagamento/Pagamento.coffee'
            Detail2: require './HSBC/Pagamento/Pagamento2.coffee'
            Constants: require './HSBC/Pagamento/Constants.coffee'