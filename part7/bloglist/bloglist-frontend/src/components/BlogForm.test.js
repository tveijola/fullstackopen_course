import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  let component
  let mockBlogCreator

  beforeEach(() => {
    mockBlogCreator = jest.fn()
    component = render(
      <BlogForm createBlog={mockBlogCreator} />
    )
  })

  test('calls the event handler received as props with the right details when a new blog is created', () => {
    const authorInput = component.container.querySelector('#authorInput')
    const titleInput = component.container.querySelector('#titleInput')
    const urlInput = component.container.querySelector('#urlInput')

    fireEvent.change(authorInput, { target: { value: 'Test Author' } })
    fireEvent.change(titleInput, { target: { value: 'Title For the Test Blog' } })
    fireEvent.change(urlInput, { target: { value: 'http://www.changed-via-firing-change-event.com/blog' } })

    const createBlogForm = component.container.querySelector('#createBlogForm')
    fireEvent.submit(createBlogForm)

    expect(mockBlogCreator.mock.calls).toHaveLength(1)
    expect(mockBlogCreator.mock.calls[0][0].author).toBe('Test Author')
    expect(mockBlogCreator.mock.calls[0][0].title).toBe('Title For the Test Blog')
    expect(mockBlogCreator.mock.calls[0][0].url).toBe('http://www.changed-via-firing-change-event.com/blog')
  })

})