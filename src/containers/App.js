import { connect } from 'react-redux';
import App from '../components/App';
import { fetchAllUsers } from '../modules/user';
import { fetchAllTasks } from '../modules/task';
import { resetFlashMessage } from '../modules/flashMessage';

export const mapStateToProps = (state) => ({
    token: state.auth.token,
    flashMessage: state.flashMessage.message,
    flashMessageType: state.flashMessage.type,
});

export const mapDispatchToProps = (dispatch) => ({
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchAllTasks: () => dispatch(fetchAllTasks()),
    resetFlashMessage: () => dispatch(resetFlashMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
