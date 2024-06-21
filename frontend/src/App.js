import axios from 'axios';
import AddBookForm from './AddBookForm';
import AddAuthorForm from './AddAuthorForm';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

// const apiCall = () => {
//   axios.get('http://localhost:8800').then((data) => {
//     //this console.log will be in our frontend console
//     console.log(data)
//   })
// }

const App = () => {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AddAuthorForm/>}/>
            {/* <Route path='/products' element={<Product/>}/>
            <Route path='/guilds' element={<Guild/>}/>
            <Route path='/addGuild' element={<AddGuild/>}/> */}
          </Routes>
        </BrowserRouter>
          {/* <h1>Add a New Author</h1>
          <AddAuthorForm />
          <h1>Add a New Book</h1>
          <AddBookForm /> */}
      </div>
  );
};

export default App;
