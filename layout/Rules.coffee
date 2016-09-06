module.exports =
    HSBC:
        ArquivoHeader: require './HSBC/ArquivoHeader.coffee'
        ArquivoTrailing: require './HSBC/ArquivoTrailing.coffee'
        Pagamento:
            LoteHeader: require './HSBC/Pagamento/LoteHeader.coffee'
            LoteTrailing: require './HSBC/Pagamento/LoteTrailing.coffee'
            Detail: require './HSBC/Pagamento/Pagamento.coffee'
            Constants: require './HSBC/Pagamento/Constants.coffee'