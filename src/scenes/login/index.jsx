import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { login } from '../../api/authApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [ username, setUsername ]  = useState(''); 
    const [ password, setPassword ]  = useState('');
    const [ message, setMessage ] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await login(username, password);

        if (data && data.token) {
            // Jika login berhasil
            navigate('/'); // Redirect ke halaman utama
        } else {
            // Jika login gagal
            setMessage('Login gagal! Username atau password salah.');
        }
    };
    
    return (
        <div className="wrapper">
            <div className="form-box login">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" value={username} placeholder="Username" required onChange={(e) => setUsername(e.target.value)}/>
                        <PersonIcon className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="password" value={password} placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                        <LockIcon className='icon'/>
                    </div>
                    <div className="remember-forgot">
                        <a href="">Forgot Password</a>
                    </div>
                    <button type="submit" className="btn">Login</button>
                    <p>{message}</p>
                </form>
            </div>
        </div>
    )
}

export default Login;