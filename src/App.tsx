import { Provider } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './app/store';
import { Layout } from './components/Layout/Layout';
import { JobsPage } from './pages/JobsPage/JobsPage';
import { VacancyPage } from './pages/VacancyPage/VacancyPage';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />

            <Route path="/vacancies">
              <Route path="moscow" element={<JobsPage />} />
              <Route path="petersburg" element={<JobsPage />} />
              <Route path=":id" element={<VacancyPage />} />
            </Route>

            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;