import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import { forgotPassword } from '../../api/authApi';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     const data = await login(username, password);
    //     setLoading(false);

    //     if (data && data.token) {
    //         // Jika login berhasil
    //         navigate('/dashboard'); // Redirect ke halaman utama
    //     } else {
    //         // Jika login gagal
    //         setMessage('Login gagal! Username atau password salah.');
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await forgotPassword(email);
        if (data) {
            setMessage('Reset password link telah dikirim ke email anda.');
        } else {
            setMessage('Email yang anda masukkan belum terdaftar.');
        }
    } 

    return (
        <div className="wrapper">
            <div className="form-box login">
                <form onSubmit={handleSubmit}>
                    <h1>Reset Password</h1>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <EmailIcon className='icon'/>
                    </div>
                    <button type="submit" className="btn">Submit</button>
                    <p>{message}</p>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass;