import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
export const App = () => {
  return (
    <div className='font-sans'>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
};
