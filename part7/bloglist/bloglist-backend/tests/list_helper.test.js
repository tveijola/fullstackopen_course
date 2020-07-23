const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(testHelper.listWithOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(testHelper.blogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })

  test('when list has only one blog equals that blog', () => {
    expect(listHelper.favoriteBlog(testHelper.listWithOneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list is correct', () => {
    expect(listHelper.favoriteBlog(testHelper.blogs)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })
})

describe('most blogs', () => {

  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toEqual(null)
  })

  test('when list has only one blog equals that author', () => {
    expect(listHelper.mostBlogs(testHelper.listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    })
  })

  test('of a bigger list is correct', () => {
    expect(listHelper.mostBlogs(testHelper.blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('most likes', () => {

  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toEqual(null)
  })

  test('when list has only one blog equals that author and likes', () => {
    expect(listHelper.mostLikes(testHelper.listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5
    })
  })

  test('of a bigger list is correct', () => {
    expect(listHelper.mostLikes(testHelper.blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})