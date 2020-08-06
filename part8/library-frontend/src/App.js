import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useLazyQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { ALL_AUTHORS, ALL_BOOKS, GET_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const client = useApolloClient()

  const query = (page === 'authors')
    ? ALL_AUTHORS
    : ALL_BOOKS

  const queryResult = useQuery(query)
  const [getUser, result] = useLazyQuery(GET_USER)

  useEffect(() => {
    if (result.data) {
      setUser(result.data.me)
    }
  }, [result])

  useEffect(() => {
    if (localStorage.getItem('library-user-token')) {
      setToken(localStorage.getItem('library-user-token'))
    }
  }, [])

  if (queryResult.loading || (page === 'recommend' && !user)) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    setPage('login')
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  const getRecommended = () => {
    // client.resetStore() apparently refetches all queries.
    // Upon refetching queries, the token has not been set yet and
    // therefore query 'me' returns null. Then, calling getUser()
    // fetches data from the cache (which is null) and user is set to null.
    // Another workaround would be to call client.clearStore() instead.
    // However, in that case the other queries have to be refetched manually.
    (result.called && !result.data.me)
      ? result.refetch()
      : getUser()
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
        authors={queryResult.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={queryResult.data.allBooks}
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
        books={queryResult.data.allBooks}
      />

    </div>
  )
}

export default App