class Utils

    # expects item.value and item.length
    padString: (item) ->
        value = item.value?.toString().trim() or ''
        value.toString().trim() + new Array(item.length).fill(' ').join('').substring(value.length)

    # expects item.value and item.length
    padNumber: (item) ->
        value = item.value?.toString().trim() or ''
        new Array(item.length).fill('0').join('').substring(value.length) + value

module.exports = Utils
