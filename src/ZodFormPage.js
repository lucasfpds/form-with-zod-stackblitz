import React, { useState } from 'react';
import { z } from 'zod';
import './AnimatedForm.css';

const formSchema = z.object({
  nomeCompleto: z.string()
    .min(3, { message: "O nome completo deve ter pelo menos 3 caracteres." })
    .regex(/^[a-zA-Z\s]+$/, { message: "O nome completo deve conter apenas letras e espaços." }),
  email: z.string()
    .email({ message: "Formato de email inválido." }),
  idade: z.coerce
    .number({ invalid_type_error: "Idade deve ser um número." })
    .int({ message: "Idade deve ser um número inteiro." })
    .min(18, { message: "Você deve ter pelo menos 18 anos." })
    .max(120, { message: "Idade máxima é 120 anos." }),
  website: z.string()
    .url({ message: "URL do website inválida." })
    .optional()
    .or(z.literal('')),
});

const ZupFormPage = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    idade: '',
    website: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validateField(name, formData[name]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  
    if (touched[name] || isSubmitting) {
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
  
  
    let valueToValidate = value;
    if (name === 'idade' && value !== '') {
      valueToValidate = parseInt(value, 10);
      if (isNaN(valueToValidate)) valueToValidate = value;
    }


    const fieldSchema = formSchema.pick({ [name]: true });
    const result = fieldSchema.safeParse({ [name]: valueToValidate });

    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      if (!result.success) {
        newErrors[name] = result.error.formErrors.fieldErrors[name]?.[0];
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTouched({
      nomeCompleto: true,
      email: true,
      idade: true,
      website: true,
    });

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0]] = issue.message;
      }
      setErrors(fieldErrors);
      setIsSubmitting(false);
      console.log('Formulário com erros Zod:', fieldErrors);
      return;
    }

  
    setErrors({});
    console.log('Formulário enviado com Zod:', result.data);
  
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Formulário (Zod) enviado com sucesso!');
    setFormData({ nomeCompleto: '', email: '', idade: '', website: '' });
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return (
    <div className="form-container">
      <h2>Formulário com Validação Zod</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Nome Completo */}
        <div className={`form-group ${errors.nomeCompleto ? 'has-error' : ''}`}>
          <label htmlFor="nomeCompleto">Nome Completo:</label>
          <input
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.nomeCompleto ? 'input-error' : ''}
          />
          {errors.nomeCompleto && <span className="error-message">{errors.nomeCompleto}</span>}
        </div>

        {/* Email */}
        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Idade */}
        <div className={`form-group ${errors.idade ? 'has-error' : ''}`}>
          <label htmlFor="idade">Idade:</label>
          <input
            type="number"
            id="idade"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.idade ? 'input-error' : ''}
          />
          {errors.idade && <span className="error-message">{errors.idade}</span>}
        </div>

        {/* Website (Opcional) */}
        <div className={`form-group ${errors.website ? 'has-error' : ''}`}>
          <label htmlFor="website">Website (Opcional):</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://exemplo.com"
            className={errors.website ? 'input-error' : ''}
          />
          {errors.website && <span className="error-message">{errors.website}</span>}
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar com Zod'}
        </button>
      </form>
    </div>
  );
};

export default ZupFormPage;
