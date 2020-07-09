const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelper = require('./test_helper')
const { create } = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of testHelper.blogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(testHelper.blogs.length)
})

test('unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('making post request creates a new blog post', async () => {
  await api
    .post('/api/blogs')
    .send(testHelper.singleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await testHelper.blogsInDb()
  // Don't compare id, as testHelper.singleBlog doesn't contain id
  blogsInDb.forEach(b => delete b.id)

  expect(blogsInDb).toHaveLength(testHelper.blogs.length + 1)
  expect(blogsInDb).toContainEqual(testHelper.singleBlog)
})

test('if likes property is missing, default to 0', async () => {
  const singleBlogWithoutLikes = testHelper.singleBlogWithoutLikes

  const res = await api
    .post('/api/blogs')
    .send(singleBlogWithoutLikes)
    .expect(201)

  const blogId = res.body.id
  const createdBlog = await Blog.findById(blogId)
  expect(createdBlog.toJSON().likes).toEqual(0)
})

test('if title and url properties are missing, do not add blog and respond with code 400', async () => {
  const invalidBlog = testHelper.invalidBlog

  await api
    .post('/api/blogs')
    .send(invalidBlog)
    .expect(400)

  const blogsInDb = await testHelper.blogsInDb()
  expect(blogsInDb).toHaveLength(testHelper.blogs.length)
})

test('deleting a valid blog responds with code 204', async () => {
  const blogsAtStart = await testHelper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await testHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(testHelper.blogs.length - 1)
  expect(blogsAtEnd).not.toContainEqual(blogToDelete)
})

test('making a put request updates the blog', async () => {
  const blogsAtStart = await testHelper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const modifiedBlog = { ...blogToUpdate }
  modifiedBlog.likes += 1

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(modifiedBlog)
  
  const blogsAtEnd = await testHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(testHelper.blogs.length)
  expect(blogsAtEnd).toContainEqual(modifiedBlog)
  expect(blogsAtEnd).not.toContainEqual(blogToUpdate)
})

afterAll(() => {
  mongoose.connection.close()
})