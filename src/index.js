import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  Route, Switch, BrowserRouter as Router,
} from 'react-router-dom';
import {
  Home, About, Book, Contact, Rxjs, Notfound, FormTest,
} from './pages';
import * as serviceWorker from './serviceWorker';
import { Layout } from './components';


const routing = (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/books/:id" component={Book} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/rxjs" component={Rxjs} />
        <Route path="/form" component={FormTest} />
        <Route component={Notfound} />
      </Switch>
    </Layout>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
