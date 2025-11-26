import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Index from './pages/Index'
import UserList from './pages/UserList'
import UserListV2 from './pages/UserListV2'
import UserListV3 from './pages/UserListV3'
import RollingPaperTree from './pages/RollingPaperTree'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* <Route path="/users" element={<UserList />} /> */}
        <Route path="/users/v2" element={<UserListV2 />} />
        <Route path="/users" element={<UserListV3 />} />
        <Route path="/tree/:userId" element={<RollingPaperTree />} />
      </Routes>
    </Router>
  )
}

export default App
