const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const singleBlog =
{
  title: 'A clever blog post title',
  author: 'Some relatively known person',
  url: 'http://blog.this.is.a.real.site.html',
  likes: 9,
}

const singleBlogWithoutLikes =
{
  title: 'A clever blog post title',
  author: 'Some relatively known person',
  url: 'http://blog.this.is.a.real.site.html',
}

const invalidBlog = 
{
  author: 'Some relatively known person',
  likes: 9
}

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
]

const salt = 10
const pass1 = "salainen1"
const pass2 = "salainen2"

const users = [
  {
    username: "tveijola",
    name: "Tommi Veijola",
    password: bcrypt.hash(pass1, salt)
  },
  {
    username: "root",
    name: "superuser",
    password: bcrypt.hash(pass2, salt)
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  singleBlog,
  singleBlogWithoutLikes,
  invalidBlog,
  listWithOneBlog,
  blogs,
  users,
  blogsInDb,
  usersInDb
}