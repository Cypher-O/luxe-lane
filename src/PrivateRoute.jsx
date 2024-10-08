// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// const PrivateRoute = ({ element: Component, ...rest }) => {
//     const isAuthenticated = !!localStorage.getItem('token');
//     const location = useLocation();

//     return isAuthenticated ? (
//         <Component {...rest} />
//     ) : (
//         <Navigate to="/" state={{ from: location }} replace />
//     );
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    const location = useLocation();

    return isAuthenticated ? (
        children
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default PrivateRoute;
