import React, { StrictMode, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isTokenExpired } from '../helper';
import Login from '../containers/Login';
import SideHeader from '../containers/SideHeader';
import TaskList from '../containers/TaskList';
import FlashMessage from './FlashMessage';

const App = ({ token, flashMessage, flashMessageType, fetchAllUsers, fetchAllTasks, resetFlashMessage }) => {
    const [isTokenValid, setIsTokenValid] = useState(false);

    // Fetch all users and tasks and clear display message
    useEffect(() => {
        if (flashMessage) {
            setTimeout(() => {
                resetFlashMessage();
            }, 3000);
            fetchAllUsers();
            fetchAllTasks();
        }
    }, [flashMessage, flashMessageType, resetFlashMessage, fetchAllUsers, fetchAllTasks]);

    // If token exist and not expired, fetch all users and tasks
    useEffect(() => {
        if (token) {
            const expired = isTokenExpired(token);
            if (!expired) {
                setIsTokenValid(true);
                fetchAllUsers();
                fetchAllTasks();
            } else {
                setIsTokenValid(false);
            }
        } else {
            setIsTokenValid(false);
        }
    }, [token, fetchAllUsers, fetchAllTasks]);

    let contents;
    if (!isTokenValid) {
        contents = <Login />;
    } else {
        contents = (
            <React.Fragment>
                <div className="flex">
                    <SideHeader />
                    <TaskList />
                </div>
                <FlashMessage
                    duration={2000}
                    message={flashMessage}
                    type={flashMessageType}
                    onClose={resetFlashMessage}
                />
            </React.Fragment>
        );
    }

    return (
        <StrictMode>
            <div className="container">{contents}</div>
        </StrictMode>
    );
};

App.propTypes = {
    token: PropTypes.string,
    flashMessage: PropTypes.string,
    flashMessageType: PropTypes.string,
    fetchAllUsers: PropTypes.func.isRequired,
    fetchAllTasks: PropTypes.func.isRequired,
    resetFlashMessage: PropTypes.func.isRequired,
};

export default App;
