import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import css from './RegistrationForm.module.css';
// import axios from 'axios';
// import { useState } from 'react';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Імʼя має містити мінімум 2 символи')
    .required('Обовʼязково'),
  email: Yup.string()
    .email('Невірний email')
    .required('Обовʼязково'),
  password: Yup.string()
    .min(6, 'Пароль має містити мінімум 6 символів')
    .required('Обовʼязково'),
});

export const RegistrationForm= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
 
  return (
      <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { resetForm, setStatus }) => {
        console.log('Registering with values:', values);
       try {
          await dispatch(register(values)).unwrap();
         setStatus(null);
         resetForm();
          navigate('/contacts');
       } catch (error) {
         // API поверне 400, якщо email вже зареєстрований
          if (error === 'Request failed with status code 400') {
            setStatus('Користувач з таким email вже існує.');
          } else {
          setStatus('Реєстрація не вдалася. Спробуйте інший email.');
            }
        }
      }}
    >
      {({ status }) => (
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Name
            <Field
              className={css.registerInput}
              type="text"
              name="name"
              autoComplete="name"
            />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>

          <label className={css.label}>
            Email
            <Field
              className={css.registerInput}
              type="email"
              name="email"
              autoComplete="email"
                          />
            <ErrorMessage name="email" component="div" className={css.error} />
             </label>

          <label className={css.label}>
            Password
            <Field
              className={css.registerInput}
              type="password"
              name="password"
              autoComplete="new-password"
            />
            <ErrorMessage name="password" component="div" className={css.error} />
          </label>

          <button
            className={css.btnRegister}
            type="submit"
                    >
            Register
          </button>

          {status && <div className={css.error}>{status}</div>}
        </Form>
      )}
    </Formik>
  );
};