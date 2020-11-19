
const beginWithInclude = (input) => {
    if (input[0] == "(") {
        return false
    }
    if (input[0] == "[") {
        return true
    }
    throw new Error("invalid")
}

const getStart = (input) => {
    let [start, end] = input.split(",")
    start = start.substring(1)
    let number = +start
    if (Number.isNaN(number)) {
        throw new Error("invalid")
    }
    if (beginWithInclude(input)) {
        return number
    }
    return number + 1
}

const endWithInclude = (input) => {
    if (input[input.length-1] == ")") {
        return false
    }
    if (input[input.length-1] == "]") {
        return true
    }
    throw new Error("invalid")
}

const getEnd = (input) => {
    let [start, end] = input.split(",")
    end = end.substring(0, end.length - 1)
    if (endWithInclude(input)) {
        return +end
    }
    return +end - 1
}

const range = (input) => {
    const start = getStart(input)
    const end = getEnd(input)
    if (start > end) {
        throw new Error("invalid")
    }
    let array = []
    for (let i = start; i <= end; i++) {
        array.push(i)
    }
    return array.join(",")
}
module.exports = {
    beginWithInclude,
    endWithInclude,
    getStart,
    getEnd,
    range,
}