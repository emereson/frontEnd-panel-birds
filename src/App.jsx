import { Route, Routes } from 'react-router-dom';
import './App.css';
import './pages/pagesStyle/crudPop.css';
import './pages/pagesStyle/crud.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './utils/ProtecteRoutes';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './pages/Header';
import Birds from './pages/Birds';
import Vaccine from './pages/Vaccine';
import FamilyTree from './pages/FamilyTree';
import Configuration from './pages/Configuration';
import BirdId from './pages/BirdId';
import Users from './pages/Users';
import RegisterFight from './pages/RegisterFight';
import BirdsInCare from './pages/BirdsInCare';
import RegisterBirths from './pages/RegisterBirths';

function App() {
  const userDataJSON = localStorage.getItem('userData');
  const userData = JSON.parse(userDataJSON);

  return (
    <>
      <ToastContainer />

      {userData ? <Header /> : null}
      <Routes>
        <Route path="/log-in" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />

          <Route path="/birds" element={<Birds />} />
          <Route path="/bird/:id" element={<BirdId />} />
          <Route path="/register-fight" element={<RegisterFight />} />
          <Route path="/birds-in-care" element={<BirdsInCare />} />

          <Route path="/register-births" element={<RegisterBirths />} />
          <Route path="/vaccine" element={<Vaccine />} />
          <Route path="/familyTree" element={<FamilyTree />} />
          <Route path="/configuration" element={<Configuration />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
