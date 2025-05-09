import css from './Layout.module.css';
import { Outlet } from 'react-router-dom';


export const Layout = () => {
  return (
    <main className={css.container}>
      <Outlet /> 
    </main>
  );
};