import { Route, Routes } from 'react-router-dom';

import { CATEGORIES } from '@/data/projects';
import Contact from '@/pages/Contact';
import ProjectCategory from '@/pages/ProjectCategory';
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
        {/* Category lists (static paths outrank /projects/:id) */}
        {CATEGORIES.map((c) => (
          <Route key={c.slug} path={`/projects/${c.slug}`} element={<ProjectCategory kind={c.kind} />} />
        ))}
        <Route path='/projects/:id' element={<ProjectDetail />} />
        <Route path='/skills' element={<Skills />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
