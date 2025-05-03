//  import { Layout } from './Layout/Layout';
import { ContactForm  } from './ContactForm/ContactForm';
import { SearchBox } from './SearchBox/SearchBox';
import { ContactList } from './ContactList/ContactList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/contactsOps';

 //Layout задає базову структуру сторінки.
const App = () => {
     const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    < >
       <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox /> 
      <ContactList />
    </>
  );
};
export default App;