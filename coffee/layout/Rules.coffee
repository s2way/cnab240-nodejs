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
    Bradesco:
        ArquivoHeader: require './Bradesco/ArquivoHeader.coffee'
        ArquivoTrailing: require './Bradesco/ArquivoTrailing.coffee'
        Pagamento:
            LoteHeader: require './Bradesco/Pagamento/LoteHeader.coffee'
            LoteTrailing: require './Bradesco/Pagamento/LoteTrailing.coffee'
            Detail: require './Bradesco/Pagamento/Pagamento.coffee'
            Detail2: require './Bradesco/Pagamento/Pagamento2.coffee'
            Constants: require './Bradesco/Pagamento/Constants.coffee'
