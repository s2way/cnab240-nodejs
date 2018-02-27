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
        default: 1
    },
    {
        field: 'operacao',
        startPos: 9,
        endPos: 9,
        length: 1,
        required: true,
        default: 'E'
    },
    {
        field: 'servico',
        startPos: 10,
        endPos: 11,
        length: 2,
        required: true,
        default: '04'
    },
    {
        field: 'forma_lancamento',
        startPos: 12,
        endPos: 13,
        length: 2,
        default: 40
    },
    {
        field: 'versao_layout',
        startPos: 14,
        endPos: 16,
        length: 3,
        default: '055'
    },
    {
        field: 'filler',
        startPos: 17,
        endPos: 17,
        length: 1,
        required: false,
        default: ' '
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
        type: 'numeric'
    },
    {
        field: 'filler',
        startPos: 72,
        endPos: 72,
        length: 1,
        required: false,
        default: ' '
    },
    {
        field: 'empresa_nome',
        startPos: 73,
        endPos: 102,
        length: 30,
        required: true,
        type: 'alphanumeric'
    },
    {
        field: 'filler',
        startPos: 103,
        endPos: 142,
        length: 40,
        required: false,
        default: new Array(40).fill(' ').join('')
    },
    {
        field: 'data_inicial',
        startPos: 143,
        endPos: 150,
        length: 8,
        required: true,
        type: 'numeric'
    },
    {
        field: 'valor_saldo_inicial',
        startPos: 151,
        endPos: 168,
        length: 18,
        required: false,
        type: 'numeric'
    },
    {
        field: 'situacao_saldo_inicial',
        startPos: 169,
        endPos: 169,
        length: 1,
        required: false,
        type: 'alphanumeric'
    },
    {
        field: 'status',
        startPos: 170,
        endPos: 170,
        length: 1,
        required: false,
        type: 'alphanumeric'
    },
    {
        field: 'tipo_moeda',
        startPos: 171,
        endPos: 173,
        length: 3,
        required: true,
        type: 'alphanumeric'
    },
    {
        field: 'sequencia_extrato',
        startPos: 174,
        endPos: 178,
        length: 5,
        required: false,
        type: 'numeric'
    },
    {
        field: 'filler',
        startPos: 179,
        endPos: 240,
        length: 62,
        required: false,
        default: new Array(62).fill(' ').join('')
    }
];
