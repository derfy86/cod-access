import { connect } from 'react-redux';
import Settings from 'src/components/Settings';
import {
  editEmailUser,
  editPseudoUser,
  editPasswordUser,
  uploadFileProfile,
  deleteAccount,
} from 'src/actions/auth';
import { setModalConfirm, setMessage } from 'src/actions/other';

const mapStateToProps = ({ auth, other }) => ({
  user: auth.user,
  messageParams: other.messageParams,
  modalConfirmParams: other.modalConfirmParams,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitEmail: (emailFields) => dispatch(editEmailUser(emailFields)),
  onSubmitPseudo: (pseudoFields) => dispatch(editPseudoUser(pseudoFields)),
  onSubmitPassword: (passwordFields) => dispatch(editPasswordUser(passwordFields)),
  onSubmitFile: (fileFields) => dispatch(uploadFileProfile(fileFields)),
  deleteAccount: () => dispatch(deleteAccount()),
  displayModalConfirm: (modalConfirmParams) => dispatch(setModalConfirm(modalConfirmParams)),
  displayMessage: (messageParams) => dispatch(setMessage(messageParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
