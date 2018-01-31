module.exports = {
    HSBC: {
        ArquivoHeader: require('./HSBC/ArquivoHeader.js'),
        ArquivoTrailing: require('./HSBC/ArquivoTrailing.js'),
        Pagamento: {
            LoteHeader: require('./HSBC/Pagamento/LoteHeader.js'),
            LoteTrailing: require('./HSBC/Pagamento/LoteTrailing.js'),
            Detail: require('./HSBC/Pagamento/Pagamento.js'),
            Detail2: require('./HSBC/Pagamento/Pagamento2.js'),
            Constants: require('./HSBC/Pagamento/Constants.js')
        }
    },
    Bradesco: {
        ArquivoHeader: require('./Bradesco/ArquivoHeader.js'),
        ArquivoTrailing: require('./Bradesco/ArquivoTrailing.js'),
        Pagamento: {
            LoteHeader: require('./Bradesco/Pagamento/LoteHeader.js'),
            LoteTrailing: require('./Bradesco/Pagamento/LoteTrailing.js'),
            Detail: require('./Bradesco/Pagamento/Pagamento.js'),
            Detail2: require('./Bradesco/Pagamento/Pagamento2.js'),
            Constants: require('./Bradesco/Pagamento/Constants.js')
        },
        Conciliacao: {
            LoteHeader: require('./Bradesco/Conciliacao/LoteHeader.js'),
            LoteTrailing: require('./Bradesco/Conciliacao/LoteTrailing.js'),
            Detail: require('./Bradesco/Conciliacao/Conciliacao.js'),
            Detail2: require('./Bradesco/Conciliacao/Conciliacao2.js'),
            // Constants: require('./Bradesco/Conciliacao/Constants.js')
        }
    }
};
