import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Composant/NavBar';
import Accueil from './Pages/Accueil';
import Agents from './Pages/Agents';
import Armes from './Pages/Armes';
import Cartes from './Pages/Cartes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Accueil />} />
          <Route path='/Agents' element={<Agents />} />
          <Route path='/Armes' element={<Armes />} />
          <Route path='/Cartes' element={<Cartes />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
