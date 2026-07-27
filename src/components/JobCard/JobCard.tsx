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
      <a href="#" className={classes.title}>
        {job.name}
      </a>
      
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
      
      <button className={classes.viewButton}>
        Смотреть вакансию
      </button>
    </div>
  );
};