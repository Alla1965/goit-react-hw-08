import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { deleteContact } from '../../redux/contactsOps';

const formatPhone = (phone) => {
  const dottedToDash = phone.replace(/\./g, '-');
  const cleaned = dottedToDash.split(/x|ext|extension|доб\./i)[0];
  
  const digits = cleaned.replace(/\D/g, '');
  const match = digits.match(/^(\+?38)?(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (!match) return cleaned.trim();

  const [, prefix = '+38', code, part1, part2, part3] = match;
  return `${prefix} (${code}) ${part1}-${part2}-${part3}`;
};
export const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
	  dispatch(deleteContact(contact.id))
  };
   return (
    <div className={css.wrapper}>
      <div className={css.wrapContact}  >
        <div className={css.contactItem}>
           <svg className={css.icon}>
            <use href="/image/icons/symbol-defs.svg#icon-user"></use>
        </svg>
        <p className={css.nameContact}>{contact.name}</p>
                </div>
        <div className={css.contactItem}>
           <svg className={css.icon}>
            <use href="/image/icons/symbol-defs.svg#icon-phone"></use>
        </svg> 
        <p className={css.nameContact}>{formatPhone(contact.number)}</p>
       </div>
        
      </div>
      
      <button className={css.btn} onClick={handleDelete}>Delete
              </button>
    </div>
  );
};

