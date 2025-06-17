import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedForm from './AnimatedForm';
import ZupFormPage from './ZodFormPage'; // Nova página
import Header from './Header'; // Novo componente Header

function App() {
  return (
    <Router>
      <Header /> {/* Nosso novo header com navegação */}
      <div className="App-content"> {/* Um wrapper para o conteúdo principal se necessário */}
        <main>
          <Routes>
            {/* Rota para o formulário animado, pode ser a raiz também */}
            <Route path="/" element={<AnimatedForm />} />
            <Route path="/animated-form" element={<AnimatedForm />} />
            <Route path="/zup-form" element={<ZupFormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
