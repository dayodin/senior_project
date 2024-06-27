import AddMangaForm from './pages/mongo/AddMangaForm';
import GetDealsPage from './pages/mongo/GetDealsPage';
import Header from './components/Header'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

const App = () => {
  return (
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/manga' element={<AddMangaForm />}/>
            <Route path='/deals' element={<GetDealsPage />}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
};

export default App;
