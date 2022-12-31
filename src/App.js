import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Composant/Footer";
import NavBar from "./Composant/NavBar";
import { UserContextProvider } from "./Context/userContext";
import Accueil from "./Pages/Accueil";
import AgentInfo from "./Pages/AgentInfo";
import Agents from "./Pages/Agents";
import Armes from "./Pages/Armes";
import Cartes from "./Pages/Cartes";
import Favoris from "./Pages/Private/Favoris";
import Private from "./Pages/Private/Private";
import Profil from "./Pages/Private/Profil";

function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <UserContextProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/Agents" element={<Agents />} />
              <Route path="/Armes" element={<Armes />} />
              <Route path="/Cartes" element={<Cartes />} />
              <Route path="/AgentInfo/:uuid" element={<AgentInfo />} />
              <Route path="/private" element={<Private />} >
                <Route path="/private/favoris" element={<Favoris />} />
                <Route path="/private/profil" element={<Profil />} />
              </Route>
            </Routes>
            <Footer />
          </UserContextProvider>

        </BrowserRouter>
      </div>
      <div className="AppMobile">
        Ce site a besoin d'une largeur d'ecran superieur a 1450pixel
        <br />
        <p>
          si vous ete sur ordi aggrandisez la fenetre sinon consulter le site
          sur une tablette ou ordinateur
        </p>
      </div>
    </>
  );
}

export default App;
