// import Inicio from './pages/Inicio';
import Usuarios from './pages/Usuarios';
import Detalhes from './pages/Detalhes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from 'components/Header';

export default function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Usuarios />} />
        <Route path='usuarios' element={<Usuarios />} />
        <Route path='detalhes' element={<Detalhes />} />
        <Route path='detalhes/:id' element={<Detalhes />} />
      </Routes>
    </Router>
  );
}