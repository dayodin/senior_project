import AddMangaForm from './pages/mongo/AddMangaForm'
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
          <Routes>
            <Route path='/manga' element={<AddMangaForm/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
};

export default App;
