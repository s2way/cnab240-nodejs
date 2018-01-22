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
        field: 'filler',
        startPos: 24,
        endPos: 26,
        length: 3,
        required: false,
        default: new Array(3).fill(' ').join('')
    },
    {
        field: 'valor_credito',
        startPos: 27,
        endPos: 41,
        length: 15,
        required: true,
        type: 'numeric'
    },
    {
        field: 'filler',
        startPos: 42,
        endPos: 240,
        length: 199,
        required: false,
        default: new Array(199).fill(' ').join('')
    }
];
