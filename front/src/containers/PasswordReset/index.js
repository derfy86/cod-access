import { connect } from 'react-redux';
import PasswordReset from 'src/components/PasswordReset';
import {
  saveNewPassword,
} from 'src/actions/auth';
import { setMessage } from 'src/actions/other';

const mapStateToProps = ({ auth, other }) => ({
  loading: auth.passwordReset.loading,
  messageParams: other.messageParams,
});

const mapDispatchToProps = (dispatch) => ({
  saveNewPassword: (passwordInfo) => dispatch(saveNewPassword(passwordInfo)),
  displayMessage: (messageParams) => dispatch(setMessage(messageParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
