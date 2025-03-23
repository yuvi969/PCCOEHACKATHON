import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { Homepage } from './pages/homepage'
import { MedicineScanner } from './pages/uploadprescription'
import { HowItWorks } from './pages/howitworks'
import { About } from './pages/aboutpage'
import { Uploadmanually } from './pages/uploadmunually'
import { Startpage } from './pages/startpage'
import { Createacc } from './pages/registernewuser'
import { Userlogin } from './pages/userlogin'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Startpage />}></Route>
          <Route path='/register' element={<Createacc />}></Route>
          <Route path='/userlogin' element={<Userlogin />}></Route>
          <Route path='/homepage' element={<Homepage />}></Route>
          <Route
            path='/upload-prescription'
            element={<MedicineScanner />}
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
