const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (fav, blog) => {
    output = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }

    if (fav === null) {
      return output
    }
    return (output.likes > fav.likes)
      ? output
      : fav
  }

  return blogs.length === 0
    ? null
    : blogs.reduce(reducer, null)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}