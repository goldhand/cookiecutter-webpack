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
        <ProcessEnv {...process.env} />
      </div>
    );
  }
}

function ProcessEnv({
    NODE_ENV,
    PUBLIC_PATH,
}) {
  return (
    <ul>
      <li><strong>{'process.env:'}</strong></li>
      <li>{`NODE_ENV: ${NODE_ENV}`}</li>
      <li>{`PUBLIC_PATH: ${PUBLIC_PATH}`}</li>
      <li><strong>Redux: Dev Tools:</strong></li>
      <li>ctrl+h - show/hide</li>
      <li>ctrl+q - change position</li>
      <li>ctrl+m - toggle monitor</li>
    </ul>
  );
}
ProcessEnv.propTypes = {
  NODE_ENV: PropTypes.string.isRequired,
  PUBLIC_PATH: PropTypes.string,
};
