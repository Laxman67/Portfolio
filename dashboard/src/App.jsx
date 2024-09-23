import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import Provider from react-redux
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
import { useEffect } from 'react';
import { getUser } from './store/slice/userSlices';
import { getAllMessages } from './store/slice/messagesSlices';
import { getAllSkills } from './store/slice/skillSlice';
import { getAllTimeline } from './store/slice/timelineSlices';
import { getAllSoftwareApplication } from './store/slice/applicationslice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllTimeline());
    dispatch(getAllSkills());
    dispatch(getAllSoftwareApplication());
  }, [dispatch]);
  return (
    <>
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
    </>
  );
};

export default App;
