import blogService from '../services/blogs'
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'FETCH_BLOGS':
      return action.data
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

export default blogReducer