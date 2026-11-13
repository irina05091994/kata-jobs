import { Link } from 'react-router-dom';
import classes from './NotFoundPage.module.css';

const catImage = `${import.meta.env.BASE_URL}cat.png`;

export const NotFoundPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.headerRow}>
          <h1 className={classes.title}>
            Упс! Такой страницы
            <br />
            не существует
          </h1>
          <Link to="/vacancies/moscow" className={classes.button}>
            На главную
          </Link>
        </div>

        <p className={classes.message}>Давайте перейдем к началу.</p>

        <img className={classes.image} src={catImage} alt="Кот" />
      </div>
    </div>
  );
};