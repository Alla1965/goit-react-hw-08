import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing  } from '../redux/auth/selectors';

 const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
    if (isRefreshing) {
    return null;
  }

 return isLoggedIn ? children : <Navigate to={redirectTo} />;
}
export default PrivateRoute;