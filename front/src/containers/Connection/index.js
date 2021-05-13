import { connect } from 'react-redux';
import Connection from 'src/components/Connection';
import {
  toggleConnectionVisibility,
  setConnectionVisibility,
} from 'src/actions/auth';

const mapStateToProps = ({ auth }) => ({
  isVisible: auth.signIn.isVisible,
  isLogged: auth.user.isLogged,
  profileImage: auth.user.picturePath,
});

const mapDispatchToProps = (dispatch) => ({
  toggleConnection: () => dispatch(toggleConnectionVisibility()),
  hideConnection: () => dispatch(setConnectionVisibility(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
