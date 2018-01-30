module.exports = [
    {
        field: 'banco',
        startPos: 1,
        endPos: 3,
        length: 3,
        required: true,
        default: 237
    },
    {
        field: 'lote',
        startPos: 4,
        endPos: 7,
        length: 4,
        required: true,
        default: '0000'
    },
    {
        field: 'registro',
        startPos: 8,
        endPos: 8,
        length: 1,
        required: true,
        default: 3
    },
    {
        field: 'num_seq_registro_lote',
        startPos: 9,
        endPos: 13,
        length: 5,
        required: true,
        type: 'numeric'
    },
    {
        field: 'cod_seg_registro_lote',
        startPos: 14,
        endPos: 14,
        length: 1,
        required: true,
        default: 'A',
        type: 'alphanumeric'
    },
    {
        field: 'movimento_tipo',
        startPos: 15,
        endPos: 15,
        length: 1,
        required: true,
        type: 'numeric',
        default: 0
    },
    {
        field: 'movimento_cod',
        startPos: 16,
        endPos: 17,
        length: 2,
        required: true,
        type: 'numeric'
    },
    {
        field: 'cod_camara',
        startPos: 18,
        endPos: 20,
        length: 3,
        required: true,
        type: 'numeric'
    },
    {
        field: 'favorecido_cod_banco',
        startPos: 21,
        endPos: 23,
        length: 3,
        required: true,
        default: 237
    },
    {
        field: 'favorecido_agencia',
        startPos: 24,
        endPos: 28,
        length: 5,
        required: true,
        type: 'numeric'
    },
    {
        field: 'favorecido_dig_agencia',
        startPos: 29,
        endPos: 29,
        length: 1,
        required: false,
        type: 'numeric'
    },
    {
        field: 'favorecido_num_conta',
        startPos: 30,
        endPos: 41,
        length: 12,
        required: true,
        type: 'numeric'
    },
    {
        field: 'favorecido_dig_verificador',
        startPos: 42,
        endPos: 42,
        length: 1,
        required: true,
        type: 'alphanumeric'
    },
    {
        field: 'ag_conta_digito_verificador',
        startPos: 43,
        endPos: 43,
        length: 1,
        required: false,
        default: ' '
    },
    {
        field: 'favorecido_nome',
        startPos: 44,
        endPos: 73,
        length: 30,
        required: true,
        type: 'alphanumeric'
    },
    {
        field: 'doc_empresa',
        startPos: 74,
        endPos: 93,
        length: 20,
        required: true,
        type: 'date'
    },
    {
        field: 'data_pagamento',
        startPos: 94,
        endPos: 101,
        length: 8,
        required: false,
        type: 'numeric'
    },
    {
        field: 'tipo_moeda',
        startPos: 102,
        endPos: 104,
        length: 3,
        required: false,
        default: 'BRL'
    },
    {
        field: 'qtde_moeda',
        startPos: 105,
        endPos: 119,
        length: 15,
        required: false,
        type: 'numeric'
    },
    {
        field: 'valor_pagamento',
        startPos: 120,
        endPos: 134,
        length: 15,
        required: false,
        type: 'numeric'
    },
    {
        field: 'num_doc_atribuido_banco',
        startPos: 135,
        endPos: 154,
        length: 20,
        required: false,
        type: 'alphanumeric'
    },
    {
        field: 'data_real_efetivacao_pgto',
        startPos: 155,
        endPos: 162,
        length: 8,
        required: false,
        type: 'numeric'
    },
    {
        field: 'valor_real_efetivacao_pgto',
        startPos: 163,
        endPos: 177,
        length: 15,
        required: false,
        type: 'numeric'
    },
    {
        field: 'info2',
        startPos: 178,
        endPos: 217,
        length: 40,
        required: false,
        type: 'alphanumeric'
    },
    {
        field: 'cod_finalidade_doc',
        startPos: 218,
        endPos: 219,
        length: 2,
        required: false,
        type: 'alphanumeric'
    },
    {
        field: 'cod_finalidade_ted',
        startPos: 220,
        endPos: 224,
        length: 5,
        required: true,
        type: 'numeric'
    },
    {
        field: 'cod_finalidade_compl',
        startPos: 225,
        endPos: 226,
        length: 2,
        required: false,
        default: 'CC'
    },
    {
        field: 'cnab',
        startPos: 227,
        endPos: 229,
        length: 3,
        required: false,
        default: new Array(3).fill(' ').join('')
    },
    {
        field: 'aviso',
        startPos: 230,
        endPos: 230,
        length: 1,
        required: false,
        default: '0'
    },
    {
        field: 'codigos_ocorrencias',
        startPos: 231,
        endPos: 240,
        length: 10,
        required: false,
        default: new Array(10).fill(' ').join('')
    }
];
