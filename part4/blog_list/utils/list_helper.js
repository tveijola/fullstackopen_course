const _ = require('lodash')
const { reduce } = require('lodash')

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const result = _.chain(blogs).map(blog => blog.author).countBy().toPairs().maxBy(_.last).value()
  return {
    author: result[0],
    blogs: result[1]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const reducer = (result, value) => {
    if (value.author in result) {
      result[value.author] += value.likes
    } else {
      result[value.author] = value.likes
    }
    return result
  }

  const result = _.chain(blogs).reduce(reducer, {}).toPairs().maxBy(_.last).value()
  return {
    author: result[0],
    likes: result[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}