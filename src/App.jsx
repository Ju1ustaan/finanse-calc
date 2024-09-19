import React from 'react';
import FeedbackForm from './pages/FeedbackForm';
import Header from './components/Header';
import CarFinansingPage from './pages/CarFinansingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/call_back' element={<FeedbackForm />} />
        <Route path='/credit_calculator' element={<CarFinansingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
