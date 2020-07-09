const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const testHelper = require('./test_helper')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await User.deleteMany({})
  for (const user of testHelper.users) {
    const userObject = new User(user)
    await userObject.save()
  }
})

test('valid user can be created', async () => {
  const usersAtStart = testHelper.users
  const newUser = {
    username: "newuser",
    password: "newpassword"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await testHelper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
})

test('usernames must be unique', async () => {
  const usersAtStart = testHelper.users
  const newUser = { ...usersAtStart[0] }
  newUser.password = "newpassword"
  delete newUser.passwordHash

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(res.body.error).toContain('`username` to be unique')
  const usersAtEnd = await testHelper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('password must be at least 3 characters', async () => {
  const usersAtStart = testHelper.users
  const newUser = {
    username: "newuser",
    password: "sh"
  }

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(res.body.error).toContain('password must be at least 3 characters')
  const usersAtEnd = await testHelper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('username must be at least 3 characters', async () => {
  const usersAtStart = testHelper.users
  const newUser = {
    username: "sh",
    password: "newpassword"
  }

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(res.body.error).toContain('User validation failed: username')
  expect(res.body.error).toContain('shorter than the minimum allowed length (3)')
  const usersAtEnd = await testHelper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('username must not be empty', async () => {
  const usersAtStart = testHelper.users
  const newUser = {
    password: "newpassword"
  }

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(res.body.error).toContain('Path `username` is required')
  const usersAtEnd = await testHelper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('password must not be empty', async () => {
  const usersAtStart = testHelper.users
  const newUser = {
    username: "newuser"
  }

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(res.body.error).toContain('password must be at least 3 characters')
  const usersAtEnd = await testHelper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

afterAll(() => {
  mongoose.connection.close()
})