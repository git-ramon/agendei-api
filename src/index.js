import express from "express";
import cors from "cors";
import router from "./routes.js";

require('dotenv').config();

const app = express();

// Configuração do CORS com a origem específica para a sua aplicação web
const corsOptions = {
    origin: 'https://agendei-web-mauve.vercel.app',  // Permitir apenas essa origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],  // Permitir cabeçalhos
};

// Aplicar CORS antes de qualquer outra configuração de rota
app.use(cors(corsOptions));

app.use(express.json());
app.use(cors());
app.use(router);

// Use process.env.PORT para Vercel
const PORT = process.env.PORT || 3001; // Usar 3001 localmente
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
