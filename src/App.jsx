import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './component/home/HomePage';
import Navbar from './component/Navbar/Nav';
import Details from './component/details/Details';
import Generate from './component/generate/Generate';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* dynamic “name” param */}
        <Route path="/details/:id" element={<Details />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </BrowserRouter>
  );
}
