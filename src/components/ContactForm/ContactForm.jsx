import { Button } from '../Button/Button';
import css from './ContactForm.module.css';

import { useDispatch } from "react-redux";

import { addContact  } from "../../redux/contactsOps";

export const ContactForm = () => {
 
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const form = event.target;
  
    dispatch(addContact({
	    id: crypto.randomUUID(),
	 
        name: form.elements.name.value,
        number: form.elements.number.value
	  }));
    form.reset(); 
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
          <p className={css.textForm} >Name</p>
          <input
        className={css.field}
        type="text"
        name="name"
                 />
          <p className={css.textForm} >Number</p>
          <input
        className={css.field}
        type="text"
        name="number"
                />  
      <Button className={css.buttonForm} type="submit">Add contact</Button>
    </form>
  );
};
