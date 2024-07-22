import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import MainPages from './pages/MainPages';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/main" element={<MainPages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
