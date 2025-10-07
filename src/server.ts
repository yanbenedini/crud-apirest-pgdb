import express from "express";

const app = express();
const PORT = 3000;


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


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});
