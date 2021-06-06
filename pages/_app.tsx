import React from 'react';
import '../styles/reset.scss';
import '../styles/common.scss';

interface Props {
  pageProps: any;
  Component: any;
}

export default class App extends React.Component<Props> {
  render(): JSX.Element {
    const { pageProps, Component } = this.props;

    return (
      <>
        <Component {...pageProps} />
      </>
    );
  }
}
