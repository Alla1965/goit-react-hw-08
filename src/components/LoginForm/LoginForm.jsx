import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import css from './LoginForm.module.css'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Невірний email').required('Обовʼязково'),
  password: Yup.string().min(6, 'Мінімум 6 символів').required('Обовʼязково'),
});
export const LoginForm = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate(); 

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;

  //   dispatch(
  //     login({
  //       email: form.elements.email.value,
  //       password: form.elements.password.value,
  //     })
  //   )
  //     .unwrap()
  //     .then(() => {
  //         console.log('login success');
   
  //     })
  //     .catch(() => {
  //       console.log('login error');
  //     });

  //   form.reset();
  // };


  return (
        <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(login(values))
          .unwrap()
          .then(() => {
            console.log('login success');
            navigate('/contacts');
          })
          .catch(() => {
            console.log('login error');
          });
        resetForm();
      }}
    >
    <Form className={css.formLogin}  autoComplete="off">
      <label className={css.labelLogin}>
        Email
          <Field  className={css.loginInput} type="email" name="email" autoComplete="email" />
          <ErrorMessage name="email" component="div" className={css.error} />
      </label>
      <label className={css.labelLogin}>
        Password
          <Field  className={css.loginInput} type="password" name="password" autoComplete="current-password" />
          <ErrorMessage name="password" component="div" className={css.error} />
      </label>
      <button className={css.btnLogin}type="submit">Log In</button>
      </Form>
      </Formik>
  );
};
