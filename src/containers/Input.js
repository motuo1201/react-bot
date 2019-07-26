import { connect } from 'react-redux';
import * as actions from '../actions/Talk';
import Input from '../components/Input';

const mapStateToProps = state => {
  return {
    messages: state.messages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMessage: (message) => dispatch(actions.addMessage(message)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Input)