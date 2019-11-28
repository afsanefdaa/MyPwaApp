import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  Route, Link, Switch, BrowserRouter as Router,
} from 'react-router-dom';
import {
  Home, About, Book, Contact, Notfound,
} from './pages';
import * as serviceWorker from './serviceWorker';


const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books/1">books</Link>
        </li>
        <li>
          <Link to="/contact">contact</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/books/:id" component={Book} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
