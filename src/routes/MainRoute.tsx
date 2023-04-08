import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home';

const MainRoute = () => {
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  </BrowserRouter>;
};
