import { connect } from 'react-redux';
import SignUp from 'src/components/SignUp';
import { trySignUp } from 'src/actions/signup';
import { setMessage } from 'src/actions/other';

const mapStateToProps = ({ signup, other }) => ({
  loading: signup.loading,
  messageParams: other.messageParams,
});

const mapDispatchToProps = (dispatch) => ({
  trySignUp: (signupInfo) => dispatch(trySignUp(signupInfo)),
  displayMessage: (messageParams) => dispatch(setMessage(messageParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
