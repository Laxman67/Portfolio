import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { store } from '../src/store/store'; // Import the configured Redux store
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManageSkills from './pages/ManageSkills';
import ManageTimeline from './pages/ManageTimeline';
import ManageProjects from './pages/ManageProjects';
import ViewProject from './pages/ViewProject';
import UpdateProject from './pages/UpdateProject';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Provider store={store}>
      {/* Wrap the Router with Provider and pass the store */}
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<ResetPassword />} />
          <Route path='/manage/skills' element={<ManageSkills />} />
          <Route path='/manage/timeline' element={<ManageTimeline />} />
          <Route path='/manage/project' element={<ManageProjects />} />
          <Route path='/view/project/:id' element={<ViewProject />} />
          <Route path='/update/project/:id' element={<UpdateProject />} />
        </Routes>
        <ToastContainer position='bottom-right' theme='dark' />
      </Router>
    </Provider>
  );
};

export default App;
