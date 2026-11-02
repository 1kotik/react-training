import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {authService} from '../service/AuthService.ts';
import {AuthContext} from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {updateAuthContext} = useContext(AuthContext);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        try {
            let userData;
            if (isRegistering) {
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                userData = await authService.register(email, password);
            } else {
                userData = await authService.login(email, password);
            }
            updateAuthContext(userData);
            navigate('/posts');
        } catch (e) {
            setError(e.message || 'Something went wrong');
        }
    };

    const handleSwitchMode = () => {
        setIsRegistering((prev) => !prev);
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    return (
        <div className="auth-page">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSubmit} className="auth-form">
                <Input
                    id="email-input"
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    id="password-input"
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                {isRegistering && (
                    <Input
                        id="confirm-password-input"
                        label="Confirm Password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                    />
                )}
                <Button label={isRegistering ? 'Sign Up' : 'Sign In'} type="submit"/>
            </form>
            <button
                type="button"
                onClick={handleSwitchMode}
                className="auth-switch-btn">
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
        </div>
    );
}

export default Login;