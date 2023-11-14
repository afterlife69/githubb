import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Form from './components/form';
import Menu from './components/menu';
import Appp from './components/appp';
import Showdb from './components/showdb';
import LoginMenu from './components/loginmenu';
import Regis from './components/regis';
import Login from './components/login';
import Tform from './components/tform';
import Classform from './components/classform';
import Teachermenu from './components/teachermenu';
import TLogin from './components/tlogin';
import AdminApp from './components/adminapp';
import AdminShowdb from './components/adminshowdb';
import Adminmenu from './components/adminmenu';
import AdminShowteach from './components/showteach';
import Showclass from './components/showclass';
function App() {
  return (
    <div className="App" >
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginMenu />} />
          <Route path='/regis' element={<Regis />} />
          <Route path='/login' element={<Login />} />
          <Route path='/showdb/:id' element={<Showdb />} />
          <Route path='/form' element={<Form />} />
          <Route path='/appp/:id' element={<Appp />} />
          <Route path='/menu/:username' element={<Menu />} />
          <Route path='/tform' element={<Tform />} />
          <Route path='/classform' element={<Classform />} />
          <Route path='/teachermenu/:id' element={<Teachermenu />} />
          <Route path='/tlogin' element={<TLogin />} />
          <Route path='/adminapp' element={<AdminApp />} />
          <Route path='/adminshowdb' element={<AdminShowdb />} />
          <Route path='/adminmenu' element={<Adminmenu />} />
          <Route path='/showteach' element={<AdminShowteach />} />
          <Route path='/showclass' element={<Showclass />} />
          Showclass
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
