const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve arquivos do frontend

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  const pergunta = req.body.pergunta.toLowerCase();

  // Fluxos condicionais
  if (pergunta.includes("preço") || pergunta.includes("custo")) {
    return res.json({ resposta: "Nossos planos variam conforme a integração. Fale com nosso suporte!" });
  }
  if (pergunta.includes("json")) {
    return res.json({ resposta: "JSON é o formato usado para integrar nossos bots com APIs inteligentes." });
  }

  // Envio da pergunta para a OpenAI
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: pergunta }],
    });

    const resposta = completion.data.choices[0].message.content;
    res.json({ resposta });
  } catch (err) {
    console.error("Erro na API da OpenAI:", err);
    res.status(500).json({ resposta: "Desculpe, houve um erro ao consultar a IA." });
  }
});

app.listen(port, ()) => {
  console.log(Servidor rodando em http:);
}