import { Provider } from 'react-redux';
import { store } from './app/store';
import { Header } from './components/Header/Header';
import { JobsPage } from './pages/JobsPage/JobsPage';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main>
        <JobsPage />
      </main>
    </Provider>
  );
}

export default App;