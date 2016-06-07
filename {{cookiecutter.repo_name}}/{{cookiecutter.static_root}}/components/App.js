import React, {PropTypes, Component} from 'react';


export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {

    return (
      <main>
        <h1>NODE_ENV: {process.env.NODE_ENV}</h1>
        {this.props.children}
      </main>
    );
  }
}
