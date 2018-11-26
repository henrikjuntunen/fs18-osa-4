const dummy = (blogs) => {
    // ...
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(element => {
        total += element.likes
    });
    return total
}

const favoriteBlog = (blogs) => {
    let mostLikes = 0
    let i = 0
    let j = 0
    blogs.forEach(element => {
        if (mostLikes < element.likes) {
            mostLikes = element.likes
            i = j
        }
   //     console.log('favoriteBlog', i, j++)
    });
 //   console.log('favoriteBlog[i]', i, blogs[i])
    return blogs[i]

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}