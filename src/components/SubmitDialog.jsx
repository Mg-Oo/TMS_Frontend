import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import PropTypes from 'prop-types';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FaSpinner } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoAdd } from 'react-icons/io5';

const SubmitDialog = ({ open, onOpen, loading, dialogtype, users, currentTask, onClose, onChange, onSubmit }) => {
    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                {dialogtype === 'Create' ? (
                    <Button variant="outline" onClick={onOpen} className="text-slate-500 hover:text-slate-700">
                        <span>
                            <IoAdd size={20} className="mr-2" />
                        </span>
                        CREATE
                    </Button>
                ) : (
                    <Button size="icon" className="border-none text-slate-500 hover:text-slate-700" onClick={onOpen}>
                        <FiEdit size={20} />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent onClose={onClose} className="overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="my-2 flex items-center">{dialogtype} Task</DialogTitle>
                    <DialogDescription>
                        Required fields are marked with an asterisk <span className="text-red-600">*</span>
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="flex flex-col space-y-4 mt-6">
                    <div className="felx items-center space-y-1">
                        <Label htmlFor="title" className="text-right">
                            Title
                            <span className="ml-2 text-red-600">*</span>
                        </Label>
                        <Input
                            id="title"
                            value={currentTask.title}
                            onChange={(e) => onChange(e.target.value, 'title')}
                            isRequired={true}
                        />
                    </div>

                    <div className="felx items-center space-y-1">
                        <Label htmlFor="summary" className="text-right">
                            Summary
                        </Label>
                        <Input
                            id="summary"
                            value={currentTask.summary}
                            onChange={(e) => onChange(e.target.value, 'summary')}
                        />
                    </div>

                    <div className="felx items-center space-y-1">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={currentTask.description}
                            onChange={(e) => onChange(e.target.value, 'description')}
                        />
                    </div>

                    <div className="felx items-center space-y-1">
                        <Label htmlFor="assignee" className="text-right">
                            Assignee
                        </Label>
                        <Select
                            id="assignee"
                            onValueChange={(value) => onChange(value ? value : '', 'assignee')}
                            defaultValue={currentTask.assignee?._id}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select an assignee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem key="unassigned" value="unassigned">
                                        Unassigned
                                    </SelectItem>
                                    {users.map((user) => (
                                        <SelectItem key={user._id} value={user._id}>
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="felx items-center space-y-1">
                        <Label htmlFor="status" className="text-right">
                            Status
                        </Label>
                        <Select
                            id="status"
                            onValueChange={(value) => onChange(value, 'status')}
                            defaultValue={currentTask.status}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {['ToDo', 'InProgress', 'Done'].map((status, index) => (
                                        <SelectItem key={'status_' + index} value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="felx items-center space-y-1">
                        <Label htmlFor="dueDate" className="text-right">
                            DueDate
                        </Label>
                        <Input
                            id="dueDate"
                            type="datetime-local"
                            className="inline-block"
                            value={currentTask.dueDate}
                            onChange={(e) => onChange(e.target.value, 'dueDate')}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" variant="outline" className={'mt-4'}>
                            {loading ? <FaSpinner size={24} className="animate-spin items-center" /> : 'Submit'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

SubmitDialog.propTypes = {
    open: PropTypes.bool,
    loading: PropTypes.bool,
    dialogtype: PropTypes.string,
    users: PropTypes.array,
    currentTask: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
};

export default SubmitDialog;
