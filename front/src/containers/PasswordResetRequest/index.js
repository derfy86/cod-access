import { connect } from 'react-redux';
import PasswordResetRequest from 'src/components/PasswordResetRequest';
import {
  sendPasswordResetRequest,
} from 'src/actions/auth';
import { setMessage } from 'src/actions/other';

const mapStateToProps = ({ auth, other }) => ({
  loading: auth.passwordReset.loading,
  messageParams: other.messageParams,
});

const mapDispatchToProps = (dispatch) => ({
  sendResetPasswordEmail: (email) => dispatch(sendPasswordResetRequest(email)),
  displayMessage: (messageParams) => dispatch(setMessage(messageParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetRequest);
