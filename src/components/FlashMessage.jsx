import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import { Button } from './ui/button';

const FlashMessage = ({ message, type, duration, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [message]);

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 300);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!message) return null;

    const typeClasses = {
        success: 'bg-green-100 border-green-500 text-green-700',
        error: 'bg-red-100 border-red-500 text-red-700',
        warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
        info: 'bg-blue-100 border-blue-500 text-blue-700',
    };

    return (
        <div
            className={`border-l-4 p-4 fixed bottom-5 w-[30%] right-10 z-50 transform transition-transform duration-300 ${
                visible ? 'translate-x-0' : 'translate-x-full'
            } ${typeClasses[type]}`}
        >
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <Button size="icon" variant="icon" onClick={() => setVisible(false)} className="text-xl font-bold">
                    <IoMdClose size={24} />
                </Button>
            </div>
        </div>
    );
};

FlashMessage.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
    duration: PropTypes.number,
    onClose: PropTypes.func.isRequired,
};

export default FlashMessage;
