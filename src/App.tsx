import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { HomePage, MoviePage, SearchPage } from './pages';
export const App = () => {
  return (
    <div className='font-sans'>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movie/:id' element={<MoviePage />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </div>
  );
};
