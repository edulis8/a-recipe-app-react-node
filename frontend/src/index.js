import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { hot } from "react-hot-loader"
import Home from "./Containers/Home"
import reducers from "./reducers"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import Recipe from "./Containers/Recipe"

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/recipe/:id" component={Recipe} />
      </Switch>
    </Router>
  </Provider>
)

const HotApp = hot(module)(App)

ReactDOM.render(<HotApp />, document.getElementById("home"))