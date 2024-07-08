import { useState } from 'react';
import PropTypes from 'prop-types';
import { BiHide, BiShow } from 'react-icons/bi';
import { FaSpinner } from 'react-icons/fa';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import rfdc from 'rfdc';
const cloneDeep = rfdc();

const Register = ({ loading, error, login, register }) => {
    const [activePage, setActivePage] = useState('LOGIN');
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const clonedUser = cloneDeep(user);
        clonedUser[e.target.id] = e.target.value;
        setUser(clonedUser);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activePage === 'LOGIN') {
            login({ email: user.email, password: user.password });
        } else {
            register(user);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleActivePage = () => {
        setActivePage(activePage === 'LOGIN' ? 'REGISTER' : 'LOGIN');
    };

    return (
        <div className="flex mt-[50px] max-w-[800px] min-h-[550px] mx-auto border-2 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex flex-col w-1/2 justify-center items-center bg-slate-300">
                <Label className="mb-6">
                    {activePage === 'LOGIN' ? "Don't have an account ?" : 'Already have an account ?'}
                </Label>
                <Button
                    onClick={handleActivePage}
                    variant="outline"
                    className="flex px-6 mb-8 justify-center items-center bg-white hover:bg-white/30"
                >
                    {activePage === 'LOGIN' ? 'Register' : 'Login'}
                </Button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-1/2 py-6 justify-center items-center">
                <h2 className="my-4">{activePage === 'LOGIN' ? 'Login' : 'Register'}</h2>
                <span className="text-red-600 my-4">{error}</span>
                {activePage === 'REGISTER' && (
                    <div className="flex flex-col w-full px-6 mb-6">
                        <Label htmlFor="name" className="mb-2">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter Your Name"
                            onChange={handleChange}
                            value={user.name}
                            minLength={4}
                            required
                        />
                    </div>
                )}

                <div className="flex flex-col w-full px-6 mb-6">
                    <Label className="mb-2" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter Your Email"
                        onChange={handleChange}
                        value={user.email}
                        required
                    />
                </div>
                <div className="flex flex-col w-full px-6 mb-8">
                    <Label className="mb-2" htmlFor="password">
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter Password"
                            onChange={handleChange}
                            value={user.password}
                            minLength={8}
                            required
                        />
                        <Button
                            size="icon"
                            type="button"
                            className="absolute inset-y-0 right-1 flex items-center text-slate-500"
                            onClick={handleClickShowPassword}
                        >
                            {showPassword ? <BiShow size={20} /> : <BiHide size={20} />}
                        </Button>
                    </div>
                </div>
                <Button variant="outline" type="submit" className="flex px-6 mb-8 justify-center items-center">
                    {loading ? <FaSpinner size={24} className="animate-spin items-center" /> : 'Submit'}
                </Button>
            </form>
        </div>
    );
};

Register.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.string,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
};

export default Register;
