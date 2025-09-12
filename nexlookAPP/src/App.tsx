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
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/add-piece" element={<AddPiece />} />
            <Route path="/context" element={<ContextScreen />} />
            <Route path="/result" element={<ResultScreen />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
