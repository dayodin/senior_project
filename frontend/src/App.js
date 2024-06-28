import AddMangaForm from './pages/mongo/AddMangaForm';
import GetDealsPage from './pages/mongo/GetDealsPage';
import ListMangaPage from './pages/mongo/ListMangaPage';
import Header from './components/nav/Header'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'


function App() {
  return (
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/manga' load={"load"} element={<ListMangaPage />} />
            <Route path='/manga/add' element={<AddMangaForm />} />
            <Route path='/deals' element={<GetDealsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
};

export default App;
