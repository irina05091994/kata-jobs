import { IconUser } from '@tabler/icons-react';
import classes from './Header.module.css';

export const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <a href="/" className={classes.logo}>
          <span className={classes.logoIcon}>hh</span>
          <span>.FrontEnd</span>
        </a>

        <nav className={classes.nav}>
          <a href="/vacancies-fe" className={`${classes.navLink} ${classes.navLinkActive}`}>
            Вакансии FE
          </a>
          <a href="/about" className={classes.navLink}>
            <IconUser className={classes.navIcon} />
            Обо мне
          </a>
        </nav>

        <div className={classes.navSpacer} />
      </div>
    </header>
  );
};