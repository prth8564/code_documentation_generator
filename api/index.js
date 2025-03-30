const express = require("express");
const {GoogleGenAI} = require("@google/genai");
const cors = require('cors');
const ai = new GoogleGenAI({ apiKey: "" });
const app = express();
app.use(express.json());
app.use(cors());
app.post("/geminiCall",async (req,res)=>{
    
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: req.body.inputs,
      });
      res.status(200).json({output:response.text});
})

app.listen(8000,()=>{
    console.log("running in 8k")
})