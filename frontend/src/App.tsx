import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import AddCardPage from './pages/add_card_page';
import InfoCardPage from './pages/info_card_page';
import EditCardPage from './pages/edit_card_page';
import AddExpantionPage from './pages/add_exp_page';
import EditExpantionPage from './pages/edit_exp_page';
import TestingPage from './pages/modal_testing';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Login/>}></Route>
          <Route path = '/home' element = {<Home/>}></Route>
          <Route path = '/add_card' element = {<AddCardPage></AddCardPage>}></Route>
          <Route path = '/card/:id' element = {<InfoCardPage></InfoCardPage>}></Route>
          <Route path = '/edit_card/:id' element = {<EditCardPage></EditCardPage>}></Route>
          <Route path = '/add_expantion' element = {<AddExpantionPage></AddExpantionPage>}></Route>
          <Route path = '/edit_expantion/:id' element = {<EditExpantionPage></EditExpantionPage>}></Route>
          <Route path = '/test' element = {<TestingPage></TestingPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
