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
        default: '9999'
    },
    {
        field: 'registro',
        startPos: 8,
        endPos: 8,
        length: 1,
        required: true,
        default: 9
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
        field: 'qtde_lotes',
        startPos: 18,
        endPos: 23,
        length: 6,
        required: true,
        type: 'numeric'
    },
    {
        field: 'qtde_registros',
        startPos: 24,
        endPos: 29,
        length: 6,
        required: true,
        type: 'numeric'
    },
    {
        field: 'filler',
        startPos: 30,
        endPos: 240,
        length: 211,
        required: false,
        default: new Array(211).fill(' ').join('')
    }
];