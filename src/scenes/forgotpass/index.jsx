import React, { useState } from 'react';
import DialpadIcon from '@mui/icons-material/Dialpad'; // Correct Icon import
import { forgotPassword } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../components/Preloader'; // Import Preloader component

const ForgotPass = () => {
    const [loading, setLoading] = useState(false); // State to track loading status
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show preloader
        setMessage(''); // Reset message

        try {
            const data = await forgotPassword(phoneNumber);
            if (data) {
                setMessage('Reset password link telah dikirim ke email anda.');
                navigate('/login');
            } else {
                setMessage('Phone Number yang anda masukkan belum terdaftar.');
            }
        } catch (error) {
            setMessage('Terjadi kesalahan! Coba lagi nanti.');
        } finally {
            setLoading(false); // Hide preloader
        }
    };

    return (
        <div className="container">
            {loading && <Preloader loading={loading} />} {/* Show preloader if loading */}
            <div className="wrapper">
                <div className="form-box login">
                    <form onSubmit={handleSubmit}>
                        <h1>Reset Password</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Phone Number"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <DialpadIcon className='icon' />
                        </div>
                        <button type="submit" className="btn">Submit</button>
                        <p className='text-center'>{message}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;
