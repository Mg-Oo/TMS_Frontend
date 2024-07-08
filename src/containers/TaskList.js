import { connect } from 'react-redux';
import TaskList from '../components/TaskList';
import { searchTasksByTitle, createTask, updateTask, deleteTask, resetMessage } from '../modules/task';
import { setFlashMessage } from '../modules/flashMessage';

export const mapStateToProps = (state) => ({
    users: state.user.rows,
    tasks: state.task.rows,
    loading: state.task.loading,
    isMessage: state.task.isMessage,
    error: state.task.error,
});

export const mapDispatchToProps = (dispatch) => ({
    searchTasksByTitle: (title) => dispatch(searchTasksByTitle(title)),
    createTask: (task) => dispatch(createTask(task)),
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (id) => dispatch(deleteTask(id)),
    resetMessage: () => dispatch(resetMessage()),
    setFlashMessage: (type, message) => dispatch(setFlashMessage(type, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
