import { Link } from 'react-router-dom';
import { JobCard } from '../../components/JobCard/JobCard';
import { SkillsFilter } from '../../components/SkillsFilter/SkillsFilter';
import { useJobFilters } from '../../hooks/useJobFilters';
import { useJobsApi } from '../../hooks/useJobsApi';
import classes from './JobsPage.module.css';

export const JobsPage = () => {
  const filters = useJobFilters();

  const { jobs, totalPages, isLoading, isFetching, isError } = useJobsApi({
    page: filters.page,
    search: filters.search || undefined,
    city: filters.city !== 'Все города' ? filters.city : undefined,
    skills: filters.skills.length > 0 ? filters.skills.join(',') : undefined,
  });

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentWrapper}>
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
              disabled={isFetching} // Блокируем инпут во время загрузки
            />
            <button 
              type="submit" 
              className={classes.searchButton}
              disabled={isFetching} // Блокируем кнопку во время загрузки
            >
              {/* Показываем спиннер внутри кнопки, если идёт запрос */}
              {isFetching ? (
                <span className={classes.buttonSpinner}></span>
              ) : (
                'Найти'
              )}
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
            {/* Показываем большую загрузку только при первой загрузке страницы */}
            {isLoading && (
              <div className={classes.loadingWrapper}>
                <div className={classes.spinner}></div>
                <span>Загрузка вакансий...</span>
              </div>
            )}

            {isError && (
              <div className={classes.errorText}>
                Ошибка загрузки данных. Попробуйте позже.
              </div>
            )}

            {!isLoading && !isError && jobs.length === 0 && (
              <div className={classes.emptyText}>Вакансии не найдены</div>
            )}

            {/* Показываем список. Если isFetching === true, он останется на экране, но кнопка покажет спиннер */}
            {!isLoading && !isError && jobs.length > 0 && (
              <div className={classes.jobsList}>
                {jobs.map((job) => (
                  <Link 
                    key={job.id} 
                    to={`/vacancies/${job.id}`} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <JobCard job={job} />
                  </Link>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className={classes.paginationWrapper}>
                <button
                  className={classes.paginationButton}
                  disabled={filters.page === 1 || isFetching}
                  onClick={() => filters.setPage(filters.page - 1)}
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`${classes.paginationButton} ${
                      p === filters.page ? classes.paginationButtonActive : ''
                    }`}
                    onClick={() => filters.setPage(p)}
                    disabled={isFetching}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className={classes.paginationButton}
                  disabled={filters.page === totalPages || isFetching}
                  onClick={() => filters.setPage(filters.page + 1)}
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