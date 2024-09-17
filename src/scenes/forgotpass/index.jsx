import React from 'react'
import EmailIcon from '@mui/icons-material/Email';

const forgotpass = () => {
    return (
        <div className="wrapper">
            <div className="form-box login">
                <form action="">
                    <h1>Reset Password</h1>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required />
                        <EmailIcon className='icon'/>
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default forgotpass;