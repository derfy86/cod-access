import { connect } from 'react-redux';
import Contact from 'src/components/Contact';
import { trySendContactMessage, setMessage } from 'src/actions/other';

const mapStateToProps = ({ other }) => ({
  loading: other.contact.isLoading,
  messageParams: other.messageParams,
});

const mapDispatchToProps = (dispatch) => ({
  trySendContactMessage: (messageInfo) => dispatch(trySendContactMessage(messageInfo)),
  displayMessage: (messageParams) => dispatch(setMessage(messageParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
