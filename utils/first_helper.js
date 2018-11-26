// blogilistan käisttelyyn tarkoitettuja apufunktioita - helpers
//

// title takaperin
const palindrom = (string) => {
    console.log('palindrom')
    return string.split('').reverse().join('')
}

// average of likes
const average = (array) => {
    console.log('average')
    const reducer = (sum, item) => {
        return sum + item
    }
// fail    return array.reduce(reducer, 0) / array.length
    return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length
}
  
module.exports = {
    palindrom,
    average
}