import { useParams, Link } from 'react-router-dom';
import { useGetJobByIdQuery } from '../../features/jobs/jobsApi';
import classes from './VacancyPage.module.css';

const spaceLabels: Record<string, string> = {
  office: 'Офис',
  remote: 'можно удалённо',
  hybrid: 'Гибрид',
};

export const VacancyPage = () => {
  const { id } = useParams<{ id: string }>();
  const jobId = id ? parseInt(id, 10) : 0;

  const { data: job, isLoading, isError, error } = useGetJobByIdQuery(jobId);


  if (isLoading) {
    return (
      <div className={classes.pageContainer}>
        <div className={classes.contentWrapper}>
          <div className={classes.loading}>Загрузка вакансии...</div>
        </div>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className={classes.pageContainer}>
        <div className={classes.contentWrapper}>
          <div className={classes.error}>
            <h2>Вакансия не найдена</h2>
            <p>Детали ошибки: {JSON.stringify(error)}</p>
            <Link to="/vacancies/moscow" className={classes.backLink}>
              ← Вернуться к списку вакансий
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const skillsArray = job.skills ? job.skills.split(',').filter(s => s.trim()) : [];

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentWrapper}>
        <Link to="/vacancies/moscow" className={classes.backLink}>
          ← Вернуться к списку вакансий
        </Link>

        <div className={classes.card}>
          <h1 className={classes.title}>{job.name}</h1>
          
          <div className={classes.salaryRow}>
            <span className={classes.salary}>{job.salary} ₽</span>
            <span className={classes.experience}>Опыт {job.experience}</span>
          </div>

          <div className={classes.company}>{job.company_name}</div>
          
          {job.space && (
            <span className={classes.badge}>
              {spaceLabels[job.space] || job.space}
            </span>
          )}
          
          <div className={classes.city}>{job.city}</div>

          {job.description && (
            <div className={classes.section}>
              <h3 className={classes.sectionTitle}>О вакансии</h3>
              <div className={classes.description}>{job.description}</div>
            </div>
          )}

          {skillsArray.length > 0 && (
            <div className={classes.section}>
              <h3 className={classes.sectionTitle}>Ключевые навыки</h3>
              <div className={classes.skillsList}>
                {skillsArray.map((skill) => (
                  <span key={skill} className={classes.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.about_company && (
            <div className={classes.section}>
              <h3 className={classes.sectionTitle}>Компания</h3>
              <div className={classes.description}>{job.about_company}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};