import React, {PropTypes, Component} from 'react';


export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {

    return (
      <main>
        {this.props.children}
      </main>
    );
  }
}
