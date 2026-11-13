import classes from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h1 className={classes.title}>Иван Васильев</h1>

        <div className={classes.section}>
          <p className={classes.text}>
            Привет! Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.
          </p>
        </div>

      </div>
    </div>
  );
};