//  import { Layout } from './Layout/Layout';
import { ContactForm  } from './ContactForm/ContactForm';
import { SearchBox } from './SearchBox/SearchBox';
import { ContactList } from './ContactList/ContactList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';
import { setAuthHeader } from '../redux/auth/operations'; 
import { fetchContacts } from '../redux/contacts/operations';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';

const App = () => {
     const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('persist:auth');

  if (token) {
    // якщо токен є в localStorage, встанови його
    const parsedToken = JSON.parse(token).token?.replace(/"/g, '');
    if (parsedToken) {
      setAuthHeader(parsedToken);
    }
  }
  dispatch(refreshUser());
}, [dispatch]);
  return (
    < >
       <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox /> 
      <ErrorBoundary>
       <ContactList /> 
       </ErrorBoundary>
      
    </>
  );
};
export default App;