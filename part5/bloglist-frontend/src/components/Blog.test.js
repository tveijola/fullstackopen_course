import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockLikeIncrementer
  let mockBlogRemover

  beforeEach(() => {
    const blog = {
      author: 'test author',
      title: 'test title',
      likes: 16,
      url: 'http://www.url.test/blog',
      creator: {
        username: 'test user',
        name: 'Test User'
      }
    }
    const loggedInUser = 'other user'

    mockLikeIncrementer = jest.fn()
    mockBlogRemover = jest.fn()

    component = render(
      <Blog
        blog={blog}
        incrementLikes={mockLikeIncrementer}
        removeBlog={mockBlogRemover}
        username={loggedInUser} />
    )
  })

  test('renders only title and author by default', () => {
    expect(component.container).toHaveTextContent('test author')
    expect(component.container).toHaveTextContent('test title')
    expect(component.container).not.toHaveTextContent('http://www.url.test/blog')
    expect(component.container).not.toHaveTextContent('Likes: 16')
  })

  test('additional details are shown when the "View Details" button is clicked', () => {
    const viewDetailsButton = component.container.querySelector('.toggleDetailsButton')
    fireEvent.click(viewDetailsButton)
    expect(component.container).toHaveTextContent('http://www.url.test/blog')
    expect(component.container).toHaveTextContent('Likes: 16')
  })

  test('clicking the like button twice calls the event handler twice', () => {
    const viewDetailsButton = component.container.querySelector('.toggleDetailsButton')
    fireEvent.click(viewDetailsButton)
    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockLikeIncrementer.mock.calls).toHaveLength(2)
  })
})