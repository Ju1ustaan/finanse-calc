import React from 'react';
import FeedbackForm from './pages/FeedbackForm';
import Header from './components/Header';
import CarFinansingPage from './pages/CarFinansingPage';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<FeedbackForm />} />
        <Route path='/credit_calculator' element={<CarFinansingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
