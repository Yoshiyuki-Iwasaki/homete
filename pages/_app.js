import React from 'react';
import '../styles/reset.scss';

export default class App extends React.Component {
  render() {
    const { pageProps, Component } = this.props;

    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }
}
