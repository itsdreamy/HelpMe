import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
    return (
        <div className="wrapper">
            <div className="form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <PersonIcon className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <LockIcon className='icon'/>
                    </div>
                    <div className="remember-forgot">
                        <a href="">Forgot Password</a>
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;