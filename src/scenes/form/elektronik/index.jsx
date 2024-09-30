import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../../components/Preloader';
import { storeProblem } from '../../../api/problemApi';

const NewRumah = () => {
    const [ loading, setLoading ] = useState(false);
    const [ name, setName ]  = useState(''); 
    const [ message, setMessage ] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await storeProblem(name, 'elektronik');
        setLoading(false);

        if (data) {
            navigate('/elektronik');
        } else {
            setMessage('Gagal');
        }
    };

    return (
        <div className="problems">
            {loading && <Preloader loading={loading} />} {/* Show preloader if loading */}
                <form onSubmit={handleSubmit}>
                    <h1 className='problem-title'>Add New Problem for Rumah</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Add Your Problem Here !" required value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn">Create</button>
                    <p className='text-center'>{message}</p>
                </form>
            </div>
    )
}

export default NewRumah;