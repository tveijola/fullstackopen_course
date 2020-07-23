import blogService from '../services/blogs'
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'FETCH_BLOGS':
      return action.data
    case 'INCREMENT_LIKES':
      return state.map(b => {
        if (b.id === action.data.id) {
          b.likes = action.data.likes
        }
        return b
      })
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data)
    default:
      return state
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const response = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE_BLOG',
      data: response
    })
  }
}

export const fetchBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'FETCH_BLOGS',
      data: blogs
    })
  }
}

export const likeBlog = (blogObject) => {
  return async dispatch => {
    const modifiedBlog = {
      ...blogObject,
      creator: blogObject.creator.id,
      likes: blogObject.likes + 1,
    }
    const savedBlog = await blogService.put(modifiedBlog)
    dispatch({
      type: 'INCREMENT_LIKES',
      data: savedBlog
    })
  }
}

export const removeBlog = (blogObject) => {
  return async dispatch => {
    const result = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    if (result) {
      await blogService.remove(blogObject)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blogObject.id
      })
    }
  }
}

export default blogReducer