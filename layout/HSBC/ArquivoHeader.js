module.exports = [
    {
        field: 'banco',
        startPos: 1,
        endPos: 3,
        length: 3,
        required: true,
        default: 399
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
        default: '0'
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
        field: 'empresa_inscricao_tipo',
        startPos: 18,
        endPos: 18,
        length: 1,
        required: true,
        type: 'numeric'
    },
    {
        field: 'empresa_inscricao_num',
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
        field: 'filler',
        startPos: 58,
        endPos: 58,
        length: 1,
        required: false,
        default: ' '
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
        field: 'nome_banco',
        startPos: 103,
        endPos: 132,
        length: 30,
        required: true,
        type: 'alphanumeric'
    },
    {
        field: 'filler',
        startPos: 133,
        endPos: 142,
        length: 10,
        required: false,
        default: new Array(10).fill(' ').join('')
    },
    {
        field: 'arquivo_cod',
        startPos: 143,
        endPos: 143,
        length: 1,
        required: true,
        default: 1
    },
    {
        field: 'arquivo_data_geracao',
        startPos: 144,
        endPos: 151,
        length: 8,
        required: true,
        type: 'date'
    },
    {
        field: 'arquivo_hora_geracao',
        startPos: 152,
        endPos: 157,
        length: 6,
        required: true,
        type: 'hour'
    },
    {
        field: 'arquivo_sequencia',
        startPos: 158,
        endPos: 163,
        length: 6,
        required: true,
        type: 'numeric'
    },
    {
        field: 'arquivo_layout',
        startPos: 164,
        endPos: 166,
        length: 3,
        required: true,
        default: '020'
    },
    {
        field: 'arquivo_densidade',
        startPos: 167,
        endPos: 171,
        length: 5,
        required: true,
        default: '01600'
    },
    {
        field: 'aplicacao',
        startPos: 172,
        endPos: 174,
        length: 3,
        required: true,
        default: 'CPG'
    },
    {
        field: 'ident_ano_2000',
        startPos: 175,
        endPos: 177,
        length: 3,
        required: true,
        default: 'Y2K'
    },
    {
        field: 'controle_CPG',
        startPos: 178,
        endPos: 191,
        length: 14,
        required: false,
        default: new Array(14).fill(' ').join('')
    },
    {
        field: 'filler',
        startPos: 192,
        endPos: 240,
        length: 49,
        required: false,
        default: new Array(49).fill(' ').join('')
    }
];