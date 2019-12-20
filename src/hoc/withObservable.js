import React from 'react';


const withObservable = (
  observable,
  triggers,
  initialState,
) => (Component) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  componentDidMount() {
    this.subscription = observable.subscribe((newState) => this.setState({ ...newState }));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <Component {...this.props} {...this.state} {...triggers} />
    );
  }
};

export default withObservable();
