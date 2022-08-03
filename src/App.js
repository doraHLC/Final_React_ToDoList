import { Routes, Route } from "react-router-dom";
import PageLogin from './components/pages/PageLogin';
import PageSignUp from './components/pages/PageSignUp';
import PageTodolist from './components/pages/PageTodolist';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fab, fas, far);

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLogin />} />
      <Route path="/PageSignUp" element={<PageSignUp />} />
      <Route path="/PageTodolist" element={<PageTodolist />} />
    </Routes>
  );
}

export default App;
