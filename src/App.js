import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './Components/LoginForm'
import ProtectedRoute from './Components/ProtectedRoute'
import Home from './Components/Home'
import NotFound from './Components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)
export default App
