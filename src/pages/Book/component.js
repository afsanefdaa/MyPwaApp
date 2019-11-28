import React from 'react';
import Container from '@material-ui/core/Container';


class Book extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Container maxWidth="sm">
        <h1>books</h1>
      </Container>
    );
  }
}
export default Book;
