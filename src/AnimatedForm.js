import React, { useState } from 'react';
import './AnimatedForm.css';

const AnimatedForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case 'nome':
        if (!value) {
          newErrors.nome = 'O nome é obrigatório.';
        } else if (value.length < 3) {
          newErrors.nome = 'O nome deve ter pelo menos 3 caracteres.';
        } else {
          delete newErrors.nome;
        }
        break;
      case 'email':
        if (!value) {
          newErrors.email = 'O email é obrigatório.';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'O formato do email é inválido.';
        } else {
          delete newErrors.email;
        }
        break;
      case 'mensagem':
        if (!value) {
          newErrors.mensagem = 'A mensagem é obrigatória.';
        } else if (value.length < 10) {
          newErrors.mensagem = 'A mensagem deve ter pelo menos 10 caracteres.';
        } else {
          delete newErrors.mensagem;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let formIsValid = true;
    const currentErrors = {};
    Object.keys(formData).forEach(fieldName => {
        if (fieldName === 'nome' && !formData.nome) {
            currentErrors.nome = 'O nome é obrigatório.';
            formIsValid = false;
        } else if (fieldName === 'nome' && formData.nome.length < 3) {
            currentErrors.nome = 'O nome deve ter pelo menos 3 caracteres.';
            formIsValid = false;
        }

        if (fieldName === 'email' && !formData.email) {
            currentErrors.email = 'O email é obrigatório.';
            formIsValid = false;
        } else if (fieldName === 'email' && !/\S+@\S+\.\S+/.test(formData.email)) {
            currentErrors.email = 'O formato do email é inválido.';
            formIsValid = false;
        }

        if (fieldName === 'mensagem' && !formData.mensagem) {
            currentErrors.mensagem = 'A mensagem é obrigatória.';
            formIsValid = false;
        } else if (fieldName === 'mensagem' && formData.mensagem.length < 10) {
            currentErrors.mensagem = 'A mensagem deve ter pelo menos 10 caracteres.';
            formIsValid = false;
        }
    });

    setErrors(currentErrors);

    if (formIsValid && Object.keys(errors).length === 0) {
      console.log('Formulário enviado:', formData);
      setTimeout(() => {
        alert('Formulário enviado com sucesso!');
        setFormData({ nome: '', email: '', mensagem: '' });
        setErrors({});
        setIsSubmitting(false);
      }, 1500);
    } else {
      console.log('Formulário com erros:', currentErrors);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Formulário Animado</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className={`form-group ${errors.nome ? 'has-error' : ''}`}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={errors.nome ? 'input-error' : ''}
          />
          {errors.nome && <span className="error-message">{errors.nome}</span>}
        </div>

        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className={`form-group ${errors.mensagem ? 'has-error' : ''}`}>
          <label htmlFor="mensagem">Mensagem:</label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            className={errors.mensagem ? 'input-error' : ''}
          />
          {errors.mensagem && <span className="error-message">{errors.mensagem}</span>}
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default AnimatedForm;
