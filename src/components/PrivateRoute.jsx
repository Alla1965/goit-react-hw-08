import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing  } from '../redux/auth/selectors';


// export const PrivateRoute = ({ component: Component, redirectTo = '/login' }) => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const isRefreshing = useSelector(state => state.auth.isRefreshing);
//     if (isRefreshing) {
//     return null;
//   }
//   return isLoggedIn ? <Component/> : <Navigate to={redirectTo} />;
// };
export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return null; // або <Loader />
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
}