import React, { useReducer } from 'react'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import axios from 'axios'
import {
  SEARCH_USERS,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SET_LOADING
} from '../types'

let githubClientId;
let githubClientSecret;

if( process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_FINDER_KEY
  githubClientSecret = process.env.REACT_APP_GITHUB_FINDER_SECRET
} else {
  githubClientId = process.env.GITHUB_FINDER_KEY
  githubClientSecret = process.env.GITHUB_FINDER_SECRET
}

const GithubState = props => {
  const initialState = {
    user: {},
    users: [],
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  const searchUsers = async (text) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&${githubClientId}&${githubClientSecret}`)
   
   dispatch({
     type: SEARCH_USERS,
     payload: res.data.items
   })
   }

   const getUser = async (userName) =>{
    setLoading()
    
    const res = await axios.get(
    `https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }

 const getUserRepos = async (userName) =>{
  setLoading()
  const res = await axios.get(
  `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
 
 dispatch({
   type: GET_REPOS,
   payload: res.data
 })
}

  const setLoading = () => dispatch({ type: SET_LOADING})

  const clearUsers = () => dispatch({ type: CLEAR_USERS})

  return <GithubContext.Provider
    value= {{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }} >
      {props.children}
  </GithubContext.Provider>
}

export default GithubState