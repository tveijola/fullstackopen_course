import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { GET_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const client = useApolloClient()
  const [getUser, result] = useLazyQuery(GET_USER, {
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    if (result.data) {
      setUser(result.data.me)
    }
  }, [result])

  // Check the local storage for a token
  useEffect(() => {
    if (localStorage.getItem('library-user-token')) {
      setToken(localStorage.getItem('library-user-token'))
    }
  }, [])

  const logout = () => {
    setPage('login')
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  const getRecommended = () => {
    if (!user) {
      getUser()
    }
    setPage('recommend')
  }

  const loggedInView = () => {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={getRecommended}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </div>
    )
  }

  const guestView = () => {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
    )
  }

  return (
    <div>

      {token ? loggedInView() : guestView()}

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommendations
        show={page === 'recommend'}
        user={user}
      />

    </div>
  )
}

export default App