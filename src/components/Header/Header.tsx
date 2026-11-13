import { NavLink } from 'react-router-dom';
import { useMatch } from 'react-router-dom';
import classes from './Header.module.css';

export const Header = () => {

  const vacanciesMatch = useMatch('/vacancies/*');

  const aboutMatch = useMatch('/about');

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <span className={classes.logoIcon}>hh</span>
          <span className={classes.logoText}>FrontEnd</span>
        </div>

        <nav className={classes.nav}>
          <NavLink
            to="/vacancies/moscow"
            className={`${classes.navLink} ${vacanciesMatch ? classes.active : ''}`}
          >
            Вакансии FE
            {vacanciesMatch && <span className={classes.activeDot}> ●</span>}
          </NavLink>

          <NavLink
            to="/about"
            className={`${classes.navLink} ${aboutMatch ? classes.active : ''}`}
          >
            Обо мне
            {aboutMatch && <span className={classes.activeDot}> ●</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};