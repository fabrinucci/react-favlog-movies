import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { MoviePage } from './pages/MoviePage';
export const App = () => {
  return (
    <div className='font-sans'>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movie/:id' element={<MoviePage />} />
      </Routes>
    </div>
  );
};
