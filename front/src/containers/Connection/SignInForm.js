import { connect } from 'react-redux';
import SignInForm from 'src/components/Connection/SignInForm';

import { trySignIn } from 'src/actions/auth';

import { setMessage } from 'src/actions/other';

const mapStateToProps = ({ other, auth }) => ({
  messageParams: other.messageParams,
  loading: auth.signIn.loading,
});

const mapDispatchToProps = (dispatch) => ({
  trySignIn: (signInInfo) => dispatch(trySignIn(signInInfo)),
  displayMessage: (messageParams) => dispatch(setMessage(messageParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
