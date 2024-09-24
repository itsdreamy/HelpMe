import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../../components/Preloader';

const NewKendaraan = () => {
    const [ loading, setLoading ] = useState(false);
    const [ name, setName ]  = useState(''); 
    const [ category, setCategory ]  = useState('');
    const [ message, setMessage ] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // const data = await login(username, password);
        // setLoading(false);

        // if (data && data.token) {
            // Jika login berhasil
            // navigate('/kendaraan'); // Redirect ke halaman utama
        // } else {
            // Jika login gagal
            // setMessage('Login gagal! Username atau password salah.');
        // }
    };

    return (
        <div className="problems">
            {loading && <Preloader loading={loading} />} {/* Show preloader if loading */}
                <form onSubmit={handleSubmit}>
                    <h1 className='problem-title'>Add New Problem for Kendaraan</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Add Your Problem Here !" required value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn">Create</button>
                    <p className='text-center'>{message}</p>
                </form>
            </div>
    )
}

export default NewKendaraan;