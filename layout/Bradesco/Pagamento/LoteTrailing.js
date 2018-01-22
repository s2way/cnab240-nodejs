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
        field: 'qtde_registros',
        startPos: 18,
        endPos: 23,
        length: 6,
        required: true,
        type: 'numeric'
    },
    {
        field: 'somatoria_valores',
        startPos: 24,
        endPos: 41,
        length: 18,
        required: true
    },
    {
        field: 'somatoria_qtde_moedas',
        startPos: 42,
        endPos: 59,
        length: 18,
        required: false,
        default: new Array(18).fill('0').join('')
    },
    {
        field: 'num_aviso_debito',
        startPos: 60,
        endPos: 65,
        length: 6,
        required: false
    },
    {
        field: 'filler',
        startPos: 66,
        endPos: 230,
        length: 165,
        required: false,
        default: new Array(165).fill(' ').join('')
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
