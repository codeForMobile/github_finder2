import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = ({ setAlert }) => {
  const [text, setText] = useState('')
  const githubContext = useContext(GithubContext)
  const alertContext = useContext(AlertContext)

const onChange = e => {
    setText(e.target.value)
  }

const onSubmit = e => {
    e.preventDefault()
    if(text === '') {
      alertContext.setAlert('Please enter search term','light')
    } else {
    githubContext.searchUsers(text);
    setText('')
    }
  }
  
  return <div>
      <form className="form" onSubmit={onSubmit}>
        <input type="text" name="text" placeholder="Please enter search item..." 
        value={text}
        onChange={onChange}
        />
        <input type="submit" value="Search" className="btn btn-block btn-dark" />
      </form>
      {githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
    </div>;
  }

export default Search;
