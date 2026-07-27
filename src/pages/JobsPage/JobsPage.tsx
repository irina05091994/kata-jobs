import { JobCard } from '../../components/JobCard/JobCard';
import { SkillsFilter } from '../../components/SkillsFilter/SkillsFilter';
import { useVacancyFilters } from '../../hooks/useVacancyFilters';
import { useUrlSync } from '../../hooks/useUrlSync';
import { useJobsApi } from '../../hooks/useJobsApi';
import classes from './JobsPage.module.css';

export const JobsPage = () => {

  const filters = useVacancyFilters();
  useUrlSync({
    page: filters.page,
    search: filters.search,
    city: filters.city,
    skills: filters.skills,
  });

  const { jobs, totalPages, isLoading, isError } = useJobsApi({
    page: filters.page,
    search: filters.search,
    city: filters.city,
    skills: filters.skills.join(','),
  });

  return (
    <div className={classes.pageContainer}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
       
        <div className={classes.headerRow}>
          <div className={classes.titleBlock}>
            <h1 className={classes.mainTitle}>Список вакансий</h1>
            <p className={classes.subTitle}>по профессии Frontend-разработчик</p>
          </div>

          <form className={classes.searchRow} onSubmit={filters.handleSearchSubmit}>
            <input
              type="text"
              className={classes.searchInput}
              placeholder="Должность или название компании"
              value={filters.searchInput}
              onChange={(e) => filters.setSearchInput(e.currentTarget.value)}
            />
            <button type="submit" className={classes.searchButton}>
              Найти
            </button>
          </form>
        </div>

        
        <div className={classes.layout}>
          
          <aside className={classes.sidebar}>
            <SkillsFilter
              skills={filters.skills}
              city={filters.city}
              onAddSkill={filters.handleAddSkill}
              onRemoveSkill={filters.handleRemoveSkill}
              onCityChange={filters.handleCityChange}
            />
          </aside>

          
          <div>
            {isLoading && (
              <div className={classes.loadingWrapper}>Загрузка...</div>
            )}

            {isError && (
              <div className={classes.errorText}>
                Ошибка загрузки данных. Попробуйте позже.
              </div>
            )}

            {!isLoading && !isError && jobs.length === 0 && (
              <div className={classes.emptyText}>Вакансии не найдены</div>
            )}

            {!isLoading && !isError && jobs.length > 0 && (
              <div className={classes.jobsList}>
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

           
            {totalPages > 1 && (
              <div className={classes.paginationWrapper}>
                <button
                  className={classes.paginationButton}
                  disabled={filters.page === 1}
                  onClick={() => filters.handlePageChange(filters.page - 1)}
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`${classes.paginationButton} ${
                      p === filters.page ? classes.paginationButtonActive : ''
                    }`}
                    onClick={() => filters.handlePageChange(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className={classes.paginationButton}
                  disabled={filters.page === totalPages}
                  onClick={() => filters.handlePageChange(filters.page + 1)}
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};