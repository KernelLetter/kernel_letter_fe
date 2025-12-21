import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Index from './pages/Index'
import UserList from './pages/UserList'
import UserListV2 from './pages/UserListV2'
import UserListV3 from './pages/UserListV3'
import RollingPaperTree from './pages/RollingPaperTree'
import MyLetters from './pages/MyLetters'
import BackgroundMusic from './components/BackgroundMusic'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <BackgroundMusic />
      <Routes>
        <Route path="/" element={<Index />} />
        {/* <Route path="/users" element={<UserList />} /> */}
        <Route path="/users/v2" element={<UserListV2 />} />
        <Route path="/users" element={<UserListV3 />} />
        <Route path="/tree/:userId" element={<RollingPaperTree />} />
        <Route path="/my-letters" element={<MyLetters />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
