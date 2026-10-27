import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import StationDetail from './pages/StationDetail.jsx'

function App() {
  return (
    <>
      <header className="navbar">⚡ EV Charge Finder</header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/station/:id" element={<StationDetail />} />
        </Routes>
      </main>
    </>
  )
}

export default App