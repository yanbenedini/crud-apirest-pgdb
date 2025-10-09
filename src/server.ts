import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json())
app.use(cors);

app.get("/", (req, res) => {
    res.send("Achou");
})

app.get("/users", (req, res) => {
    res.send("Users");
})

app.post("/users", (req, res) => {
    console.log(req)
    res.send("resposta post users")
})


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});
