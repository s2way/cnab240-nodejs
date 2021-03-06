module.exports = [
	{
        field: 'banco'
        startPos: 1
        endPos: 3
        length: 3
        required: true
        default: 399
    }
    {
        field: 'lote'
        startPos: 4
        endPos: 7
        length: 4
        required: true
        default: '0000'
    }
    {
        field: 'registro'
        startPos: 8
        endPos: 8
        length: 1
        required: true
        default: 3
    }
    {
        field: 'num_seq_registro_lote'
        startPos: 9
        endPos: 13
        length: 5
        required: true
        type: 'numeric'
    }
    {
        field: 'cod_seg_registro_lote'
        startPos: 14
        endPos: 14
        length: 1
        required: true
        default: 'B'
        type: 'alphanumeric'
    }
    {
        field: 'filler'
        startPos: 15
        endPos: 17
        length: 3
        required: false
        default: new Array(3).fill(' ').join('')
        type: 'alphanumeric'
    }
    {
        field: 'favorecido_tipo_inscricao'
        startPos: 18
        endPos: 18
        length: 1
        required: true
        type: 'numeric'
    }
    {
        field: 'favorecido_num_inscricao'
        startPos: 19
        endPos: 32
        length: 14
        required: true
        type: 'numeric'
    }
    {
        field: 'favorecido_logradouro'
        startPos: 33
        endPos: 62
        length: 30
        required: false
        type: 'alphanumeric'
    }
    {
        field: 'favorecido_num'
        startPos: 63
        endPos: 67
        length: 5
        required: false
        type: 'alphanumeric'
    }
    {
        field: 'favorecido_compl'
        startPos: 68
        endPos: 82
        length: 15
        required: false
        type: 'alphanumeric'
    }
    {
        field: 'favorecido_bairro'
        startPos: 83
        endPos: 97
        length: 15
        required: false
        type: 'alphanumeric'
    }
    {
        field: 'favorecido_cidade'
        startPos: 98
        endPos: 117
        length: 20
        required: false
        type: 'alphanumeric'
    }
    {
        field: 'favorecido_cep'
        startPos: 118
        endPos: 122
        length: 5
        required: false
        type: 'numeric'
    }
    {
        field: 'favorecido_cep_compl'
        startPos: 123
        endPos: 125
        length: 3
        required: false
        type: 'numeric'
    }
    {
        field: 'favorecido_estado'
        startPos: 126
        endPos: 127
        length: 2
        required: false
        type: 'alphanumeric'
    }
    {
        field: 'filler'
        startPos: 128
        endPos: 232
        length: 105
        required: false
        default: new Array(105).fill(' ').join('')
        type: 'alphanumeric'
    }
    {
        field: 'filler'
        startPos: 233
        endPos: 240
        length: 8
        required: false
        type: 'alphanumeric'
    }
]