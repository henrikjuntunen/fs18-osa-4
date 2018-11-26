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
        j++
   //     console.log('favoriteBlog', i, j)
    });
 //   console.log('favoriteBlog[i]', i, blogs[i])
    return blogs[i]

}

/*
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
*/
const mostBlogs = (blogs) => {
    let T = blogs
    console.log('array T', T)
    let A = []
    let Ae = { // malli Aee:lle - olio on viittaus
        author: "",
        likes: 0,
        authorBlogCount: 0
    }
    console.log('Ae', Ae)
    let favoriteAuthor = "Robert C. Martin"
    let i = 0
    let j = 0
    let k = 0
    let l = 0
    if (l=0) {console.log('l=0 asetus on true')}
    else {console.log('l=0 asetus on false')}
    // algoritmi ?
    T.forEach(elementT => {
        l = 0
        A.forEach(elementA => {
            if (elementA.author === elementT.author) {
                l = 1
                elementA.likes += elementT.likes
                elementA.authorBlogCount++
            } 
        })
        if (l === 0) {
            let Aee = new Object()
            Aee.author = elementT.author
            Aee.likes = elementT.likes
            Aee.authorBlogCount = 1
            A.push(Aee)
        }
        i++
    });
    // palautetaan löytynyt author jolla eniten blogeja
    A.forEach(element => {
        if (k <= element.authorBlogCount) {
            k = element.authorBlogCount
            favoriteAuthor = element
        }
        j++
    })
    console.log('mostBlogs favoriteAuthor T.lkm=i A.lkm=j favoriteauthorblogeja=k', i, j, k)
    console.log('array A', A)
    console.log('mostBlogs author', favoriteAuthor)
    // return 'Edsger W. Dijkstra'
    return favoriteAuthor
}

const mostLikes = (blogs) => {
    let T = blogs
    console.log('array T', T)
    let A = []
    let Ae = { // malli Aee:lle - olio on viittaus
        author: "",
        likes: 0,
        authorBlogCount: 0
    }
    console.log('Ae', Ae)
    let favoriteAuthor = "Robert C. Martin"
    let i = 0
    let j = 0
    let k = 0
    let l = 0
    if (l=0) {console.log('l=0 asetus on true')}
    else {console.log('l=0 asetus on false')}
    // algoritmi ?
    T.forEach(elementT => {
        l = 0
        A.forEach(elementA => {
            if (elementA.author === elementT.author) {
                l = 1
                elementA.likes += elementT.likes
                elementA.authorBlogCount++
            } 
        })
        if (l === 0) {
            let Aee = new Object()
            Aee.author = elementT.author
            Aee.likes = elementT.likes
            Aee.authorBlogCount = 1
            A.push(Aee)
        }
        i++
    });
    // palautetaan löytynyt author jolla eniten likes
    A.forEach(element => {
        if (k <= element.likes) {
            k = element.likes
            favoriteAuthor = element
        }
        j++
    })
    console.log('mostBlogs favoriteAuthor T.lkm=i A.lkm=j favoriteauthorblogeja=k', i, j, k)
    console.log('array A', A)
    console.log('mostLikes author', favoriteAuthor)
    // return 'Edsger W. Dijkstra'
    return favoriteAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}