import express from "express";
import cors from "cors";
import router from "./routes.js";

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

// Use process.env.PORT para Vercel
const PORT = process.env.PORT || 3001; // Usar 3001 localmente
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
