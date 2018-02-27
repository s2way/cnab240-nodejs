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
        default: 5
    },
    {
        field: 'filler',
        startPos: 9,
        endPos: 17,
        length: 9,
        required: false,
        default: new Array(9).fill(' ').join('')
    },
    {
        field: 'empresa_tipo_insc',
        startPos: 18,
        endPos: 18,
        length: 1,
        required: true,
        type: 'numeric'
    },
    {
        field: 'empresa_num_insc',
        startPos: 19,
        endPos: 32,
        length: 14,
        required: true,
        type: 'numeric'
    },
    {
        field: 'convenio',
        startPos: 33,
        endPos: 38,
        length: 6,
        required: true,
        type: 'numeric'
    },
    {
        field: 'filler',
        startPos: 39,
        endPos: 52,
        length: 14,
        required: false,
        default: new Array(14).fill(' ').join('')
    },
    {
        field: 'conta_agencia',
        startPos: 53,
        endPos: 57,
        length: 5,
        required: false,
        type: 'numeric'
    },
    {
        field: 'agencia_dig_verificador',
        startPos: 58,
        endPos: 58,
        length: 1,
        required: false,
        type: 'alphanumeric'
    },
    {
        field: 'conta_num',
        startPos: 59,
        endPos: 70,
        length: 12,
        required: false,
        type: 'numeric'
    },
    {
        field: 'conta_dig_verificador',
        startPos: 71,
        endPos: 71,
        length: 1,
        required: false,
        type: 'alphanumeric'
    },
    {
        field: 'ag_conta_dig_verificador',
        startPos: 72,
        endPos: 72,
        length: 1,
        required: false,
        type: 'alphanumeric'
    },
    {
        field: 'filler',
        startPos: 73,
        endPos: 88,
        length: 16,
        required: false,
        default: new Array(16).fill(' ').join('')
    },
    {
        field: 'vinculado',
        startPos: 89,
        endPos: 106,
        length: 18,
        required: false,
        type: 'numeric'
    },
    {
        field: 'limite',
        startPos: 107,
        endPos: 124,
        length: 18,
        required: false,
        type: 'numeric'
    },
    {
        field: 'bloqueado',
        startPos: 125,
        endPos: 142,
        length: 18,
        required: false,
        type: 'numeric'
    },
    {
        field: 'data_saldo_final',
        startPos: 143,
        endPos: 150,
        length: 8,
        required: false,
        type: 'numeric'
    },
    {
        field: 'valor_saldo_final',
        startPos: 151,
        endPos: 168,
        length: 18,
        required: false,
        type: 'numeric'
    },
    {
        field: 'situacao_saldo_final',
        startPos: 169,
        endPos: 169,
        length: 1,
        required: false,
        type: 'alphanumeric'
    },
    {
        field: 'posicao',
        startPos: 170,
        endPos: 170,
        length: 1,
        required: false,
        type: 'alphanumeric'
    },
    {
        field: 'qtde_registros',
        startPos: 171,
        endPos: 176,
        length: 6,
        required: false,
    },
    {
        field: 'somatoria_debitos',
        startPos: 177,
        endPos: 194,
        length: 18,
        required: false,
    },
    {
        field: 'somatoria_creditos',
        startPos: 195,
        endPos: 212,
        length: 18,
        required: false,
    },
    {
        field: 'filler',
        startPos: 213,
        endPos: 240,
        length: 28,
        required: false,
        default: new Array(28).fill(' ').join('')
    }
];
