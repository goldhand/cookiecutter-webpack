{% if cookiecutter.css_extension == 'less' -%}
import './Counter.less';
{% elif cookiecutter.css_extension == 'sass' -%}
import './Counter.scss';

{% endif -%}
import React, {PropTypes, Component} from 'react';


export default class Counter extends Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    incrementCounter: PropTypes.func.isRequired,
    decrementCounter: PropTypes.func.isRequired,
  }

  render() {
    const {value, incrementCounter, decrementCounter} = this.props;

    return (
      <div className="counter">
        <h1>Counter: {value}</h1>
        <button onClick={incrementCounter}>+</button>
        <button onClick={decrementCounter}>-</button>
        <hr />
      </div>
    );
  }
}
