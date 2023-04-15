import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

const MainRoute = () => {
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  </BrowserRouter>;
};
