module.exports = {
    LoteHeader: {
        TIPO_SERVICO: {
            COBRANCA: '01',
            PAGAMENTO_DIVIDENDOS: '10',
            VENDA_ACOES: '11',
            PAGAMENTO_FORNECEDORES: '20',
            PAGAMENTO_CONTAS: '22',
            PAGAMNETO_EMPRESTIMOS: '34',
            PAGAMENTO_COMISSOES: '36',
            PAGAMENTO_LOJISTAS: '40',
            TRANSFERENCIA_TITULARIDADE: '50',
            PAGAMENTO_DESPESA_VIAJANTE: '60',
            PAGAMENTO_ADIANTAMENTO: '61',
            REEMBOLSO_DESPESA: '62',
            PAGAMENTO_AUTORIZADO: '70',
            PAGAMENTO_BENEFICIOS: '90',
            PAGAMENTO_ASSISTENCIA_MEDICA: '91',
            PAGAMENTO_PIS_PASEP: '92',
            PAGAMENTO_GPS: '95'
        },
        FORMA_LANCAMENTO: {
            CREDITO_CC: '10',
            CEDITO_ADM: '02',
            DOCTO_CREDITO: '03', // DOC/TED
            CREDITO_POUPANCA: '05',
            PGTO_CONTAS: '11',
            DARF: '16',
            LIQUIDACAO_TITULOS_HSBC: '30',
            LIQUIDACAO_TITULOS_OUTROS: '31',
            LIBERACAO_TITULOS_HSBC: '32',
            LIQUIDACAO_PARCELAS: '33',
            GPS: '34'
        }
    },
    Detail: {
        TIPO_MOVIMENTO: { // tipo de movimento a que o detalhe se destina
            I: 0, // inclusão com compromisso
            B: 5, // inclusão com bloqueio
            E: 9
        }, // exclusão do compromisso
        CODIGO_MOVIMENTO: { // indica a movimentação a ser efetuada
            INCLUSAO: '00', // inclusão com registro detalhe
            EXCLUSAO: '99', // exclusão do compromisso
            INCLUSAO_COM_BLOQUEIO: '55'
        }
    } // inclusão com bloqueio
};