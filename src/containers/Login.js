import { connect } from 'react-redux';
import Login from '../components/Login';
import { login, register } from '../modules/auth';

export const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
});

export const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user)),
    register: (user) => dispatch(register(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
