import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../../components/Preloader';
import { storeProblem } from '../../../api/problemApi';

const NewKendaraan = () => {
    const [ loading, setLoading ] = useState(false);
    const [ name, setName ]  = useState(''); 
    const [ message, setMessage ] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await storeProblem(name, 2);
        setLoading(false);

        if (data) {
            navigate('/kendaraan');
        } else {
            setMessage('Gagal');
        }
    };

    return (
        // <div className="wrapper">
            <div className="form-box login">
            {loading && <Preloader loading={loading} />} {/* Show preloader if loading */}
                <form onSubmit={handleSubmit}>
                    <h1>New Problem Kendaraan</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
                        <PersonIcon className='icon'/>
                    </div>
                    <button type="submit" className="btn">Create</button>
                    <p className='text-center'>{message}</p>
                </form>
            </div>
        // </div>
    )
}

export default NewKendaraan;