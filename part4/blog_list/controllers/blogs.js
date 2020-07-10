const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('creator', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const creator = await User.findOne()

  if (body.title === undefined && body.url === undefined) {
    response.status(400).end()
  } else {
    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      likes: (body.likes === undefined) ? 0 : body.likes,
      creator: creator._id
    })
    const savedBlog = await blog.save()
    creator.blogs = creator.blogs.concat(savedBlog._id)
    await creator.save()
    response
      .status(201)
      .json(savedBlog.toJSON())
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = 
  {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter