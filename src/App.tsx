import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './app/store';
import { Header } from './components/Header/Header';
import { JobsPage } from './pages/JobsPage/JobsPage';
import { VacancyPage } from './pages/VacancyPage/VacancyPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>  
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/vacancies" replace />} />
            <Route path="/vacancies" element={<JobsPage />} />
            <Route path="/vacancies/:id" element={<VacancyPage />} />
            <Route path="*" element={<Navigate to="/vacancies" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;