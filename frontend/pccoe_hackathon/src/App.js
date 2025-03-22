import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { Homepage } from './pages/homepage'
import { Uploadprescription } from './pages/uploadprescription'
import { HowItWorks } from './pages/howitworks'
import { About } from './pages/aboutpage'
import { Uploadmanually } from './pages/uploadmunually'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route
            path='/upload-prescription'
            element={<Uploadprescription />}
          ></Route>
          <Route path='/howitworks' element={<HowItWorks />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='upload-manually' element={<Uploadmanually />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
