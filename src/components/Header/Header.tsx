import style from './Header.module.css';

import todoLogo from '../assets/todo_logo.svg';

export function Header() {
  return (
    <header className={style.container}>
      <img src={todoLogo} alt="Logo da aplicação" />
    </header>
  );
}