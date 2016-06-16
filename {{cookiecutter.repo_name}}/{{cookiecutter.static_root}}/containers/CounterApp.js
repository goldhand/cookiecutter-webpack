import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as CounterActions from '../actions/counterActions';
import Counter from '../components/Counter';


class CounterApp extends Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <Counter
          value={this.props.value}
          {...this.props.actions}
        />
        <ProcessEnv {...process.env} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    value: state.counter,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CounterActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CounterApp);


// Dev tools controls and process.env info
function ProcessEnv({
    NODE_ENV,
}) {
  return (
    <ul>
      <li><strong>{'process.env:'}</strong></li>
      <li>{`NODE_ENV: ${NODE_ENV}`}</li>
      <li><strong>Redux: Dev Tools:</strong></li>
      <li>ctrl+h - show/hide</li>
      <li>ctrl+q - change position</li>
      <li>ctrl+m - toggle monitor</li>
    </ul>
  );
}
ProcessEnv.propTypes = {
  NODE_ENV: PropTypes.string.isRequired,
};
