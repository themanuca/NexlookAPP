import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Wardrobe from './pages/Wardrobe'
import AddPiece from './pages/AddPiece'
import ContextScreen from './pages/ContextScreen'
import ResultScreen from './pages/ResultScreen'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

function App() {
  return (
    <Router>
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/guarda-roupa" element={<Wardrobe />} />
            <Route path="/adicionar-peca" element={<AddPiece />} />
            <Route path="/contexto" element={<ContextScreen />} />
            <Route path="/resultado" element={<ResultScreen />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
