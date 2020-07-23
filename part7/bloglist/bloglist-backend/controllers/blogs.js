const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('creator', { username: 1, name: 1, id: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const creator = await User.findById(decodedToken.id)

  if (body.title === undefined && body.url === undefined) {
    response.status(400).end()
  } else if (body.title === '' && body.url === '') {
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
    const populatedBlog = await Blog
      .findById(savedBlog._id)
      .populate('creator', { username: 1, name: 1, id: 1 })

    response
      .status(201)
      .json(populatedBlog.toJSON())
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(404).json({ error: 'The blog was not found!' })
  }
  const blogCreator = await User.findById(decodedToken.id)
  if (blogToDelete.creator.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    blogCreator.blogs = blogCreator.blogs.filter(b => b.toString() !== blogToDelete.id.toString())
    await blogCreator.save()
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'only the blog creator can delete a blog' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    creator: body.creator,
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('creator', { username: 1, name: 1, id: 1 })

  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter