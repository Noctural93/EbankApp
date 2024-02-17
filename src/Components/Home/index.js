import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/ebank/login')
      Cookies.remove('jwt_token')
    }
  }

  return (
    <div className="bank-home-main-container">
      <nav className="header-container">
        <div className="header-card">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
              alt="website logo"
              className="website-logo-img"
            />
          </div>
          <div>
            <button
              onClick={onClickLogout}
              className="logout-btn"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="home-bank-details-container">
        <h1 className="bank-quote-heading">Your Flexibility, Our Excellence</h1>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="digital-card-img"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
