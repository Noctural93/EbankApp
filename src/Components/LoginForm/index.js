import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    userName: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onChangeUserID = event => {
    this.setState({userName: event.target.value})
  }

  onChangePin = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showErrorMsg: true, errorMsg: errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {user_id: userName, pin: password}
    console.log(userDetails)
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(fetchedData.jwt_token)
    } else {
      this.onSubmitFailure(fetchedData.error_msg)
    }
  }

  render() {
    const {userName, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-main-container">
        <div className="login-card">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login-img"
            />
          </div>
          <div className="form-card-container">
            <form className="login-form-card" onSubmit={this.onSubmitForm}>
              <h1 className="welcome-back-heading">Welcome Back!</h1>
              <label htmlFor="user-id" className="userId-label">
                User ID
              </label>
              <input
                id="user-id"
                value={userName}
                placeholder="Enter User ID"
                onChange={this.onChangeUserID}
                className="userId-input"
                type="text"
              />
              <label htmlFor="pin" className="pin-label">
                PIN
              </label>
              <input
                id="pin"
                value={password}
                placeholder="Enter PIN"
                onChange={this.onChangePin}
                className="pin-input"
                type="password"
              />
              <button type="submit" className="submit-btn">
                Login
              </button>
              {showErrorMsg && <p className="show-error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
