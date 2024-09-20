import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {
    let auth = {'token':false}
    return (
            auth.token
            ?
            <Outlet />
            :
            <Navigate to="/login" />
    );
}

export default PrivateRoute;
