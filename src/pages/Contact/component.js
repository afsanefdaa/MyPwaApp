import React from 'react';
import Container from '@material-ui/core/Container';

class Contact extends React.Component {
  render() {
    return (
      <Container maxWidth="sm" style={{ background: 'lightgray', borderRadius: '4px', marginTop: '30px' }}>
        <span style={{ fontSize: '26px', padding: '5px 0' }}>Contact</span>
        <p style={{ padding: '30px 0', margin: '0' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Container>
    );
  }
}
export default Contact;
