import { Route, Routes } from 'react-router-dom';

import Contact from '@/pages/Contact';
import Home from '@/pages/Home';
import Me from '@/pages/Me';
import ProjectDetail from '@/pages/ProjectDetail';
import Projects from '@/pages/Projects';
import Skills from '@/pages/Skills';

function App() {
  return (
    <div className='relative h-screen w-screen overflow-hidden bg-white'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/me' element={<Me />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/projects/:id' element={<ProjectDetail />} />
        <Route path='/skills' element={<Skills />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
