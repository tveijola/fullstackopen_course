const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getToken = user => {
  const userForToken = {
    username: user.username,
    id: user._id
  }
  return 'bearer '.concat(jwt.sign(userForToken, process.env.SECRET))
}

beforeEach(async () => {
  await User.deleteMany({})
  const validUser =
  {
    username: "testuser",
    passwordHash: await bcrypt.hash("testuser", 10)
  }
  const user = new User(validUser)
  await user.save()

  const otherUser =
  {
    username: "otheruser",
    passwordHash: await bcrypt.hash("otheruser", 10)
  }
  const user2 = new User(otherUser)
  await user2.save()

  await Blog.deleteMany({})
  for (const blog of testHelper.blogs) {
    const blogObject = new Blog(blog)
    blogObject.creator = user._id // set the creator of all blogs to be 'testuser'
    await blogObject.save()
  }
})

describe('initial tests', () => {
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
})

describe('creating a new blog', () => {
  test('succeeds with valid inputs', async () => {
    const user = await User.findOne({ username: "testuser" })
    const token = getToken(user)

    const blog = { ...testHelper.singleBlog }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await testHelper.blogsInDb()
    blogsInDb.forEach(b => delete b.id) // Don't compare id, as testHelper.singleBlog doesn't contain id

    blog.creator = user._id
    expect(blogsInDb).toHaveLength(testHelper.blogs.length + 1)
    expect(blogsInDb).toContainEqual(blog)
  })

  test('succeeds and defaults likes to 0 if number of likes not provided', async () => {
    const user = await User.findOne({ username: "testuser" })
    const token = getToken(user)
    const singleBlogWithoutLikes = { ...testHelper.singleBlogWithoutLikes }

    const res = await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(singleBlogWithoutLikes)
      .expect(201)

    const blogId = res.body.id
    const createdBlog = await Blog.findById(blogId)
    expect(createdBlog.toJSON().likes).toEqual(0)
  })

  test('fails if title and url properties are missing', async () => {
    const user = await User.findOne({ username: "testuser" })
    const token = getToken(user)
    const invalidBlog = { ...testHelper.invalidBlog }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(invalidBlog)
      .expect(400)

    const blogsInDb = await testHelper.blogsInDb()
    expect(blogsInDb).toHaveLength(testHelper.blogs.length)
  })

  test('fails if token is not provided', async () => {
    const blog = { ...testHelper.singleBlog }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)

    const blogsInDb = await testHelper.blogsInDb()
    expect(blogsInDb).toHaveLength(testHelper.blogs.length)
  })
})

describe('deleting a blog', () => {
  test('using a valid token succeeds and responds with code 204', async () => {
    const user = await User.findOne({ username: "testuser" })
    const token = getToken(user)

    const blogsAtStart = await testHelper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(testHelper.blogs.length - 1)
    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })
})

describe('modifying a blog', () => {
  test('succeeds with a put request', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const modifiedBlog = { ...blogToUpdate }
    modifiedBlog.likes += 1

    const res = await api
      .put(`/api/blogs/${modifiedBlog.id}`)
      .send(modifiedBlog)

    expect(res.body.creator).toEqual(blogToUpdate.creator.toString())
    
    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(testHelper.blogs.length)
    expect(blogsAtEnd).toContainEqual(modifiedBlog)
    expect(blogsAtEnd).not.toContainEqual(blogToUpdate)
  })
})

afterAll(() => {
  mongoose.connection.close()
})