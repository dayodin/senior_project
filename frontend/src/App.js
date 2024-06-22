import AddAuthorForm from './AddAuthorForm';
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
            <Route path='/' element={<AddAuthorForm/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
};

export default App;
