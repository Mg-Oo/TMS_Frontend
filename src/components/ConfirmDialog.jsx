import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';
import { IoIosAlert } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';
import { Button } from './ui/button';

const ConfirmDialog = ({ open, loading, taskTitle, onSubmit, onClose, onOpen }) => {
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="default"
                    size="icon"
                    className="border-none text-slate-500 hover:text-slate-700"
                    onClick={onOpen}
                >
                    <MdDeleteForever size={24} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center my-4 space-x-2">
                        <IoIosAlert size={26} className="text-red-600" />
                        <p>
                            Delete the task ( <span className="text-slate-900 text-xl font-bold mt-5">{taskTitle}</span>{' '}
                            ) ?
                        </p>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You&apos;re about to permanently delete this issue, its comments and attachments, and all of its
                        data.
                        <br />
                        <br />
                        If you&apos;re not sure, you can resolve or close this issue instead.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onSubmit} className="bg-slate-600 text-slate-100">
                        {loading ? <FaSpinner size={24} className="animate-spin items-center" /> : 'OK'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

ConfirmDialog.propTypes = {
    open: PropTypes.bool,
    loading: PropTypes.bool,
    taskTitle: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
};

export default ConfirmDialog;
