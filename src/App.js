import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedForm from './AnimatedForm';
import ZodFormPage from './ZodFormPage';
import Header from './Header';

function App() {
  return (
    <Router>
      <Header />
      <div className="App-content">
        <main>
          <Routes>
            <Route path="/" element={<AnimatedForm />} />
            <Route path="/animated-form" element={<AnimatedForm />} />
            <Route path="/zod-form" element={<ZodFormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
