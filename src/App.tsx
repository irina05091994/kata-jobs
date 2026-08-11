import { Provider } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './app/store';
import { Header } from './components/Header/Header';
import { JobsPage } from './pages/JobsPage/JobsPage';
import { VacancyPage } from './pages/VacancyPage/VacancyPage';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
            <Route path="/vacancies/moscow" element={<JobsPage />} />
            <Route path="/vacancies/petersburg" element={<JobsPage />} />
            <Route path="/vacancies/:id" element={<VacancyPage />} />
           
          </Routes>
        </main>
      </HashRouter>
    </Provider>
  );
}

export default App;