import { Outlet, Navigate } from 'react-router-dom';
import { checkToken } from '../../utils';

const PrivateRoute = () => {
  return checkToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
