import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { LoginForm } from '../../components/LoginForm/LoginForm';

// import { login } from '../../redux/auth/operations';


export default function LoginPage() {
  
    // const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log(isLoggedIn);

  
  

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   const form = e.target;
  //   dispatch(
  //     login({
  //       email: form.elements.email.value,
  //       password: form.elements.password.value,
  //     })
  //   );
  //   form.reset();
  // };
  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      
      
      navigate('/contacts');
    }
  }, [isLoggedIn, navigate]);

  return (
    
  
      <LoginForm />
    

  );
};

