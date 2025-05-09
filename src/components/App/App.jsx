import { Route, Routes } from 'react-router-dom'; //1
import { Layout } from '../Layout/Layout'; //2
import { useEffect, lazy, Suspense } from 'react'; //3
import { useDispatch, useSelector } from 'react-redux'; //4
import { AppBar } from '../AppBar/AppBar';
import PrivateRoute from '../PrivateRoute';
import { Toaster } from 'react-hot-toast';

import { RestrictedRoute } from '../RestrictedRoute';
import { refreshUser } from '../../redux/auth/operations';
import { selectIsRefreshing } from '../../redux/auth/selectors';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegistrationPage  = lazy(() => import('../../pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage/ContactsPage'));

const App = () => {

  const dispatch = useDispatch();
    const isRefreshing = useSelector(selectIsRefreshing);
 
  useEffect(() => {
 
    dispatch(refreshUser());
  }, [dispatch]);
  
  if (isRefreshing) {
    return <div>Refreshing user...</div>;
  }
    return (
      <>
          <Toaster position="top-right" />
      <AppBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegistrationPage />} />
          
            <Route path="/contacts" element={
  <PrivateRoute>
    <ContactsPage />
  </PrivateRoute>
} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );   
}

export default App;