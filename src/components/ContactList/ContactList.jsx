// 1. Імпортуємо хук
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/slice';
import { Contact } from '../Contact/Contact';
import css from './ContactList.module.css';

export const ContactList = () => {
  const contacts  = useSelector(selectFilteredContacts);

  if (!Array.isArray(contacts)) {
    return <p className={css.message}>Контакти недоступні або ще не завантажені.</p>;
  }
    return (
    <ul className={css.list}>
      {contacts.map((contact) => (
        <li className={css.listItem} key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};
