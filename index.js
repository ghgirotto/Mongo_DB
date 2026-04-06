const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// 🔗 CONEXÃO COM MONGO
mongoose.connect('mongodb+srv://Admin:Admin@cluster0.khzqb6r.mongodb.net/meu_projeto?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB conectado 🚀'))
  .catch(err => console.log('Erro ao conectar MongoDB:', err));

// 🧱 SCHEMA (estrutura do banco)
const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// 📌 ROTA TESTE
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// 📌 LISTAR USUÁRIOS
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.log('Erro ao buscar usuários:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar usuários ❌' });
  }
});

// 📌 CRIAR USUÁRIO
app.post('/usuarios', async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);

    const { nome, email } = req.body;

    // 🔴 validação simples
    if (!nome || !email) {
      return res.status(400).json({
        mensagem: "Nome e email são obrigatórios ❗"
      });
    }

    const usuario = new Usuario({ nome, email });

    await usuario.save();

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso ✅",
      usuario
    });

  } catch (error) {
    console.log("ERRO AO SALVAR:", error);

    res.status(500).json({
      mensagem: "Erro ao cadastrar ❌",
      erro: error.message
    });
  }
});

// 🚀 SERVIDOR
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🔥');
});