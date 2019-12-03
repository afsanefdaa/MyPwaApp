import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.css';
import {
  Container,
} from '@material-ui/core';

export const Layout = ({ children }) => (
  <>
    <div className="header">
      <Container maxWidth="md">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/books/1">Books</Link>
        <Link className="link" to="/contact">Contact</Link>
        <Link className="link" to="/about">About</Link>
      </Container>
    </div>
    <Container maxWidth="md">
      {children}
    </Container>
  </>
);

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
