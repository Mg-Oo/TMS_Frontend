import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Button } from './ui/button';
import { IoPerson } from 'react-icons/io5';
import { format } from 'date-fns';
import { initialTask } from '../modules/task';
import SubmitDialog from './SubmitDialog';
import ConfirmDialog from './ConfirmDialog';
import rfdc from 'rfdc';
const cloneDeep = rfdc();

const Task = ({ loading, cardTask, users, updateTask, deleteTask }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [task, setTask] = useState(initialTask);

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

    const handleUpdate = (e) => {
        e.preventDefault();
        if (task === cardTask) {
            return;
        }

        updateTask(task);
        handleCloseDialog();
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        deleteTask(task._id);
        handleCloseDialog();
    };

    const handleCloseDialog = () => {
        setTask(initialTask);
        setOpenDialog(false);
        setOpenConfirmDialog(false);
    };

    return (
        <div className="my-8 mx-4 p-4 max-h-[400px] border-2 rounded-md shadow-sm">
            <div className="flex justify-between items-center">
                <h4
                    className={`${
                        cardTask.status === 'Done' ? 'line-through text-gray-500' : 'text-slate-700'
                    } font-semibold`}
                >
                    {cardTask.title}
                </h4>
                {cardTask.dueDate && (
                    <span className="text-slate-500 text-xs p-1 px-2 bg-slate-100 rounded-sm">
                        {format(cardTask.dueDate, 'MM/dd/yyyy')}
                    </span>
                )}
            </div>
            <p className="text-slate-600 text-sm my-4">{cardTask.summary}</p>
            <div className="flex justify-between items-center">
                <div className="items-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon">
                                    <IoPerson
                                        size={20}
                                        className={`${
                                            cardTask.assignee?._id ? 'text-green-600' : 'text-gray-600'
                                        } mt-1 w-8 h-8 p-[4px] rounded-full bg-slate-300`}
                                    />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>{cardTask.assignee?.name || 'Unassigned'}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="flex">
                    <SubmitDialog
                        open={openDialog}
                        dialogtype={'Update'}
                        users={users}
                        currentTask={task}
                        loading={loading}
                        onChange={handleChange}
                        onSubmit={handleUpdate}
                        onClose={handleCloseDialog}
                        onOpen={() => {
                            setTask(cardTask);
                            setOpenDialog(true);
                        }}
                    />
                    <ConfirmDialog
                        open={openConfirmDialog}
                        taskTitle={task.title}
                        loading={loading}
                        onSubmit={handleDelete}
                        onClose={handleCloseDialog}
                        onOpen={() => {
                            setTask(cardTask);
                            setOpenConfirmDialog(true);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

Task.propTypes = {
    loading: PropTypes.bool,
    cardTask: PropTypes.object,
    users: PropTypes.array,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default Task;
