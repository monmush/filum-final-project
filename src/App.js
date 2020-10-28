import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import { getToken } from './libs/request'

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/register" component={Register} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

function PrivateRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={() => (getToken() ? <Component /> : <Redirect to="/login" />)} />
}
function AuthRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={() => (!getToken() ? <Component /> : <Redirect to="/" />)} />
}
export default App
