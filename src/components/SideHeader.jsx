import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { Button } from './ui/button';

const SideHeader = ({ loading, logout }) => {
    const handleLogOut = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <header className="sticky flex top-0 h-screen w-[150px] p-10 z-10 bg-slate-300 justify-center">
            <h1 className="text-2xl text-slate-600 text-center">T.M.S</h1>
            <Button
                size="icon"
                className="absolute bottom-10 bg-black/40 text-white"
                variant="outline"
                onClick={handleLogOut}
            >
                {loading ? <FaSpinner size={20} className="animate-spin" /> : <CiLogout size={20} />}
            </Button>
        </header>
    );
};

SideHeader.propTypes = {
    loading: PropTypes.bool,
    logout: PropTypes.func.isRequired,
};

export default SideHeader;
