import type { Job } from '../../types';
import classes from './JobCard.module.css';

interface JobCardProps {
  job: Job;
}

const spaceLabels: Record<string, string> = {
  office: 'Офис',
  remote: 'можно удалённо',
  hybrid: 'Гибрид',
};

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className={classes.card}>
      {/* Заголовок — просто div, так как вся карточка уже обёрнута в Link в JobsPage */}
      <h3 className={classes.title}>
        {job.name}
      </h3>

      <div className={classes.salaryRow}>
        <span className={classes.salary}>{job.salary} ₽</span>
        <span className={classes.experience}>Опыт {job.experience}</span>
      </div>

      <div className={classes.company}>{job.company_name}</div>

      {job.space && (
        <span className={classes.badge}>
          {spaceLabels[job.space]}
        </span>
      )}

      <div className={classes.city}>{job.city}</div>

      <button
        type="button"
        className={classes.viewButton}
        onClick={(e) => {
          // Предотвращаем всплытие, чтобы клик по кнопке не конфликтовал
          // с кликом по карточке-ссылке в JobsPage
          e.stopPropagation();
        }}
      >
        Смотреть вакансию
      </button>
    </div>
  );
};