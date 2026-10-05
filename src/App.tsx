import { Route, Routes } from 'react-router-dom';

import { PROJECT_GROUPS } from '@/data/projects';
import Contact from '@/pages/Contact';
import ProjectGroup from '@/pages/ProjectGroup';
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
        {/* Group boards (static paths outrank /projects/:id) */}
        {PROJECT_GROUPS.map((g) => (
          <Route key={g.slug} path={`/projects/${g.slug}`} element={<ProjectGroup slug={g.slug} />} />
        ))}
        <Route path='/projects/:id' element={<ProjectDetail />} />
        <Route path='/skills' element={<Skills />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
