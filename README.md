# Projeto de Formulários Interativos

Este repositório contém uma aplicação React que demonstra duas abordagens para criar formulários interativos com validação e animações suaves:

1. **Formulário Animado** – validação manual em tempo real e feedback visual com CSS.
2. **Formulário com Zod** – validação declarativa de esquema usando a biblioteca [Zod](https://github.com/colinhacks/zod).

---

## 📦 Estrutura do Projeto

```
novo/
├── public/
│   └── public/index.html
├── src/
│   ├── src/AnimatedForm.js
│   ├── src/AnimatedForm.css
│   ├── src/ZodFormPage.js
│   ├── src/Header.js
│   ├── src/Header.css
│   ├── src/App.js
│   └── src/index.js
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Instalação e Execução

Pré-requisitos:  
- Node.js (>=14) e npm

Passos:

```bash
# 1. Clonar o repositório
git clone https://seu-repositorio-url.git
cd nome-do-repositorio

# 2. Instalar dependências
npm install

# 3. Iniciar em modo desenvolvimento
npm start
```

Acesse http://localhost:3000 no navegador.  
Para produção, gere o build com `npm run build`.

---

## 🖥️ Navegação

O componente `Header` (em `src/Header.js`) usa `react-router-dom` para criar dois botões de navegação:

```jsx
// src/Header.js
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="main-header">
      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/animated-form" className={({isActive})=>isActive?'active':''}>
              <button className="nav-button">Formulário Animado</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/zod-form" className={({isActive})=>isActive?'active':''}>
              <button className="nav-button">Formulário Zod</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
```

As rotas estão definidas em `src/App.js`:

```jsx
// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import AnimatedForm from './AnimatedForm'
import ZodFormPage from './ZodFormPage'

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<AnimatedForm />} />
          <Route path="/animated-form" element={<AnimatedForm />} />
          <Route path="/zod-form" element={<ZodFormPage />} />
        </Routes>
      </main>
    </Router>
  )
}
```

---

## ✨ Formulário Animado

- **Componentes**: `src/AnimatedForm.js` + `src/AnimatedForm.css`
- **Validação manual** via `useState`

### Lógica principal

```js
// src/AnimatedForm.js
const [formData, setFormData] = useState({ nome:'', email:'', mensagem:'' })
const [errors, setErrors]     = useState({})
const [isSubmitting, setIsSubmitting] = useState(false)
const [submissionMessage, setSubmissionMessage] = useState('')

function validate(name, value) {
  let newErrors = {...errors}
  switch(name) {
    case 'nome':
      if (!value) newErrors.nome = 'O nome é obrigatório.'
      else if (value.length < 3) newErrors.nome = 'Deve ter ao menos 3 caracteres.'
      else delete newErrors.nome
      break
    // email e mensagem...
  }
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

function handleChange(e) {
  const {name, value} = e.target
  setFormData({...formData, [name]: value})
  if (submissionMessage) setSubmissionMessage('')
  validate(name, value)
}

function handleSubmit(e) {
  e.preventDefault()
  setIsSubmitting(true)
  // revalida todos os campos
  // se válido, exibe mensagem de sucesso e limpa formData
  // senão, mantém erros e desabilita envio
}
```

### Feedback visual e animações

```css
/* src/AnimatedForm.css */
.submission-message {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-weight: bold;
  transition: opacity 0.3s ease;
}
.submission-message.success {
  background: #d4edda; color: #155724; border:1px solid #c3e6cb;
}
.submission-message.error {
  background: #f8d7da; color: #721c24; border:1px solid #f5c6cb;
}
.form-container { animation: fadeInForm 0.8s ease-out forwards; }
@keyframes fadeInForm {
  from {opacity:0; transform:translateY(20px)}
  to   {opacity:1; transform:translateY(0)}
}
.error-message {
  color: #dc3545;
  opacity: 0; max-height: 0;
  transition: opacity 0.3s, max-height 0.3s;
}
.form-group.has-error .error-message {
  opacity: 1; max-height: 50px; margin-top:6px;
}
```

---

## 🔒 Formulário com Zod

- **Componente**: `src/ZodFormPage.js`
- **Validação declarativa** via [Zod](https://github.com/colinhacks/zod)

### Esquema de validação

```js
// src/ZodFormPage.js
import { z } from 'zod'

const formSchema = z.object({
  nomeCompleto: z.string()
    .min(3, "Ao menos 3 caracteres")
    .regex(/^[A-Za-z\s]+$/, "Somente letras e espaços"),
  email: z.string()
    .email("Formato de email inválido"),
  idade: z.coerce.number({ invalid_type_error:"Idade deve ser número" })
    .int("Inteiro obrigatório")
    .min(18, "Mínimo 18 anos")
    .max(120, "Máx. 120 anos"),
  website: z.string()
    .url("URL inválida")
    .optional()
    .or(z.literal(''))
})
```

### Fluxo de validação

```js
// validação por campo
function validateField(name, value) {
  let val = name === 'idade' && value!=='' ? parseInt(value,10) : value
  const result = formSchema.pick({[name]:true}).safeParse({[name]:val})
  setErrors(prev => ({
    ...prev,
    [name]: result.success ? undefined : result.error.formErrors.fieldErrors[name]?.[0]
  }))
}

// submissão final
async function handleSubmit(e) {
  e.preventDefault()
  const result = formSchema.safeParse(formData)
  if (!result.success) {
    // extrai e exibe mensagens de erro
  } else {
    // simula envio, alerta de sucesso, limpa formulário
  }
}
```

---

## 🛠️ Scripts disponíveis

- `npm start` — inicia o servidor de desenvolvimento  
- `npm run build` — gera versão para produção  
- `npm test` — executa testes (padrão Create React App)  
- `npm run eject` — expõe configurações (use com cuidado)

---

## 📄 Licença

Este projeto é licenciado sob a [MIT License](LICENSE).  
2025 © Lucas Fernandes

