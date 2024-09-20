import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

    return (
        token
        ? <Outlet /> // If token exists, render the route
        : <Navigate to="/login" /> // If no token, redirect to login
    );
};

export default PrivateRoute;
