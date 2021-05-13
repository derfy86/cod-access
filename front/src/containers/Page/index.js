import { connect } from 'react-redux';
import Page from 'src/components/Page';
import { setConnectionVisibility } from 'src/actions/auth';
import { setMobileMenuVisibility } from 'src/actions/other';

const mapStateToProps = ({ auth, other}) => ({
  isLogged: auth.user.isLogged,
  role: auth.user.role,
  connectionMenuVisibility: auth.signIn.isVisible,
  mobileMenuVisibility: other.mobileMenuVisibility,
});

const mapDispatchToProps = (dispatch) => ({
  closeConnectionMenu: () => dispatch(setConnectionVisibility(false)),
  closeMobileMenu: () => dispatch(setMobileMenuVisibility(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
