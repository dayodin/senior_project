import GetDealsPage from './pages/GetDealsPage';
import ListMangaPage from './pages/MangaPage';
import AddMultipleMangaPage from './pages/AddMangaPage';
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
            <Route path='/manga/add_mult' element={<AddMultipleMangaPage />} />
            <Route path='/deals' element={<GetDealsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
};

export default App;
