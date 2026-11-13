import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Tabs } from '@mantine/core';
import { JobCard } from '../../components/JobCard/JobCard';
import { SkillsFilter } from '../../components/SkillsFilter/SkillsFilter';
import { useJobFilters } from '../../hooks/useJobFilters';
import { useJobsApi } from '../../hooks/useJobsApi';
import classes from './JobsPage.module.css';

const CITY_MAP: Record<string, string> = {
  moscow: 'Москва',
  petersburg: 'Санкт-Петербург',
};

export const JobsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cityParam = location.pathname.includes('petersburg')
    ? 'petersburg'
    : 'moscow';

  const apiCity = CITY_MAP[cityParam];
  const filters = useJobFilters();

  const { jobs, totalPages, isLoading, isFetching, isError } = useJobsApi({
    page: filters.page,
    search: filters.search || undefined,
    city: apiCity,
    skills: filters.skills.length > 0 ? filters.skills.join(',') : undefined,
  });

  const handleTabChange = (value: string | null) => {
    if (value) {
      navigate(`/vacancies/${value}`);
      filters.setPage(1);
    }
  };

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
              disabled={isFetching}
            />
            <button type="submit" className={classes.searchButton} disabled={isFetching}>
              {isFetching ? <span className={classes.buttonSpinner}></span> : 'Найти'}
            </button>
          </form>
        </div>

      
        <div className={classes.layout}>
          <aside className={classes.sidebar}>
            <SkillsFilter
              skills={filters.skills}
              onAddSkill={filters.handleAddSkill}
              onRemoveSkill={filters.handleRemoveSkill}
            />
          </aside>

          <div className={classes.mainContent}>
          
            <Tabs value={cityParam} onChange={handleTabChange} className={classes.tabsContainer}>
              <Tabs.List>
                <Tabs.Tab value="moscow">Москва</Tabs.Tab>
                <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
              </Tabs.List>
            </Tabs>

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