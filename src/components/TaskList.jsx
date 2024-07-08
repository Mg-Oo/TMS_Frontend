import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { initialTask } from '../modules/task';
import SubmitDialog from './SubmitDialog';
import Task from './Task';
import rfdc from 'rfdc';
const cloneDeep = rfdc();

const TaskList = ({
    loading,
    isMessage,
    error,
    users,
    tasks,
    createTask,
    updateTask,
    deleteTask,
    resetMessage,
    setFlashMessage,
    searchTasksByTitle,
}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [searchTitle, setSearchTitle] = useState('');
    const [task, setTask] = useState(initialTask);

    useEffect(() => {
        if (isMessage) {
            setFlashMessage('success', isMessage);
            handleCloseDialog();
            resetMessage();
        } else if (error) {
            setFlashMessage('danger', error);
            handleCloseDialog();
            resetMessage();
        }
    }, [isMessage, error, resetMessage, setFlashMessage]);

    const handleChange = (value, key) => {
        const clonedTask = cloneDeep(task);
        switch (key) {
            case 'dueDate':
                clonedTask[key] = format(value, "yyyy-MM-dd'T'HH:mm");
                break;
            case 'assignee':
                clonedTask[key] = users.filter((user) => user._id === value)[0];
                break;
            default:
                clonedTask[key] = value;
                break;
        }

        setTask(clonedTask);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        createTask(task);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        searchTasksByTitle(searchTitle);
    };

    const handleCloseDialog = () => {
        setTask(initialTask);
        setOpenDialog(false);
    };

    const getFilteredTasks = (status, color) => {
        const filteredTasks = tasks.filter((task) => task.status === status);

        return (
            <div className="w-1/3">
                <div className={`task-header ${color}`}>
                    <h4 className="tracking-wider">{status}</h4>
                    <span>( {loading ? 0 : filteredTasks.length} )</span>
                </div>
                {loading
                    ? null
                    : filteredTasks.map((cardTask, index) => (
                          <Task
                              key={`${status}_${index}`}
                              loading={loading}
                              cardTask={cardTask}
                              users={users}
                              updateTask={updateTask}
                              deleteTask={deleteTask}
                          />
                      ))}
            </div>
        );
    };

    return (
        <section className="container border-2 min-h-[80vh]">
            <div className="flex justify-between items-center py-10 mx-3">
                <div className="relative">
                    <Input
                        type="text"
                        className="w-[290px]"
                        placeholder="Search Task"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                    />
                    <Button
                        size="icon"
                        type="button"
                        className="absolute inset-y-0 right-1 flex items-center text-slate-500"
                        onClick={handleSearch}
                    >
                        <FaSearch size={18} />
                    </Button>
                </div>
                <div>
                    <SubmitDialog
                        open={openDialog}
                        dialogtype={'Create'}
                        users={users}
                        currentTask={task}
                        loading={loading}
                        onChange={handleChange}
                        onSubmit={handleCreate}
                        onClose={handleCloseDialog}
                        onOpen={() => setOpenDialog(true)}
                    />
                </div>
            </div>
            <div className="flex mt-4 gap-4">
                {getFilteredTasks('ToDo', 'border-red-600')}
                {getFilteredTasks('InProgress', 'border-blue-600')}
                {getFilteredTasks('Done', 'border-green-600')}
                {loading && (
                    <div className="fixed top-[30rem] left-[50rem] flex justify-center w-[50px] h-[100%]">
                        <FaSpinner size={40} className="animate-spin " />
                    </div>
                )}
            </div>
        </section>
    );
};

TaskList.propTypes = {
    loading: PropTypes.bool,
    isMessage: PropTypes.string,
    error: PropTypes.any,
    users: PropTypes.array,
    tasks: PropTypes.array,
    searchTasksByTitle: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    resetMessage: PropTypes.func.isRequired,
    setFlashMessage: PropTypes.func.isRequired,
};

export default TaskList;
