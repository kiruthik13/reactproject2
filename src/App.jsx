// src/App.jsx
import './App.css';
import { Route, Routes } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Welcome from './welcome';
import Skills from './Skills';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';

// Hooks
import State from './hooks/State';
import Form from './hooks/Form';
import Effect from './hooks/Effect';
import Reducer from './hooks/Reducer'; // Optional: useReducer demo

// Dashboard
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      {/* Navigation bar */}
      <Navbar />

      {/* Routes for navigation */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Service />} />
        <Route path='/form' element={<Form />} />
        <Route path='/state' element={<State />} />
        <Route path='/reducer' element={<Reducer />} /> {/* Optional route */}
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>

      {/* Static welcome and skills content */}
      <Welcome name='Kiruthik' country='India' />
      <h1>HELLO WORLD</h1>

      <div id="skills-section">
        <Skills skill={['React', 'Node', 'Express', 'MangoDb']} />
      </div>

      {/* Hooks Demo */}
      <Effect />
    </>
  );
}

export default App;
