import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';

const Private = () => {
    const { currentUser } = useContext(UserContext)
    if (!currentUser) {
        return <Navigate to="/" />
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Private;