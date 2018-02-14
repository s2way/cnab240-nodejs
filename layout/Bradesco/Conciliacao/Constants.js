module.exports = {
    Conciliacao: {
        REGISTRY_FIELD: 'cod_seg_registro_lote'
    },
    Detail: 'E',
    Segmentos: {
        E: 'Detail'
    },
    ArquivoHeader: {
        REGISTRY_FIELD: 'registro',
        ARQUIVO_COD: {
            REMESSA: '1',
            RETORNO: '2'
        },
        TIPO_INSC_EMPRESA: {
            ISENTO: '0',
            CPF: '1',
            CNPJ: '2',
            PIS_PASEP: '3',
            OUTRO: '9'
        }
    },
    ArquivoTrailing: {
        TOTAL_LOTES_FIELD: 'qtde_lotes',
        REGISTRY_FIELD: 'registro'
    },
    LoteHeader: {
        REGISTRY_FIELD: 'registro',
        TIPO_SERVICO: {
            COBRANCA: '01',
            BLOQUETO_ELETRONICO: '03',
            CONCILIACAO_BANCARIA: '04',
            DEBITOS: '05',
            CUSTODIA_CHEQUES: '06',
            GESTAO_CAIXA: '07',
            CONSULTA_MARGEM: '08',
            AVERBACAO_CONSIGNACAO: '09',
            PAGAMENTO_DIVIDENDOS: '10',
            MANUTENCAO_CONSIGNACAO: '11',
            CONSIGNACAO_PARCELAS: '12',
            GLOSA_CONSIGNACAO: '13',
            CONSULTA_TRIBUTOS_PAGAR: '14',
            PAGAMENTO_FORNECEDORES: '20',
            PAGAMENTO_CONTAS: '22',
            COMPROR: '25',
            COMPROR_ROTATIVO: '26',
            ALEGACAO_SACADO: '29',
            PAGAMENTO_SALARIOS: '30',
            PAGAMENTO_HONORARIOS: '32',
            PAGAMENTO_BOLSA_AUXILIO: '33',
            PAGAMNETO_PREBENDA: '34',
            VENDOR: '40',
            VENDOR_TERMO: '41',
            PAGAMENTO_SINISTROS: '50',
            PAGAMENTO_DESPESAS_VIAJANTE: '60',
            PAGAMENTO_AUTORIZADO: '70',
            PAGAMENTO_CREDENCIADOS: '75',
            PAGAMENTO_REMUNERACAO: '77',
            PAGAMENTO_REPRESENTANTES: '80',
            PAGAMENTO_BENEFICIOS: '90',
            PAGAMENTOS_DIVERSOS: '98',
            EXCLUSIVO_BRADESCO: '99'
        },
        FORMA_LANCAMENTO: {
            CREDITO_CC: '01', // transferência para contas do Bradesco
            CEDITO_ADM: '02',
            DOCTO_CREDITO: '03', // DOC/TED
            CARTAO_SALARIO: '04', // Somente para tipo serviço 30
            CREDITO_POUPANCA: '05',
            OP_DISPOSICAO: '10',
            PGTO_CONTAS: '11',
            TED_OUTRA_TITULARIDADE: '41'
        }
    },
            // ... 99
    LoteTrailing: {
        REGISTRY_FIELD: 'registro'
    }
};
