import { connect } from 'react-redux';
import SideHeader from '../components/SideHeader';
import { logout } from '../modules/auth';

export const mapStateToProps = (state) => ({
    loading: state.auth.loading,
});

export const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideHeader);
