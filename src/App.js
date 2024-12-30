// import logo from './logo.svg';
import './App.css';
import {Routes, Route, HashRouter } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import Header from './components/Header/header';
import RenderData from './components/Data/renderData';
import Footer from './components/Footer/Footer';
import './icons/fontawesome-free-6.5.2-web/css/all.min.css';
import Detail from './components/Detail/Detail';
import Cart from './components/Cart/Cart';
import CheckOut from './components/CheckOut/CheckOut';



function App() {
  return (
    <HashRouter>
    <div className="">
      <Header></Header>
        <Routes>
          <Route path='/' element={ 
            <>
              <Banner/>
              <RenderData/>
            </>
          }/>
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
        </Routes>
      <Footer></Footer>
    </div>
    </HashRouter>
  );
}

export default App;
