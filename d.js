import express from "express";
import cors from "cors";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Proxy /chat to FastAPI
app.post("/chat", async (req, res) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/chat", req.body, {
            timeout: 30000 // 30s timeout
        });
        res.json(response.data);
    } catch (error) {
        console.error("Proxy Error:", error.message);
        res.status(500).json({ 
            reply: "The AI backend is currently unreachable. Please ensure the Python server is running on port 8000." 
        });
    }
});

// Serve frontend
app.get("/", (req, res) => {
    const indexPath = path.join(__dirname, "index.html");
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(404).send("index.html not found. Check project structure.");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend running at http://localhost:${PORT}`);
    console.log(`Proxying requests to http://127.0.0.1:8000`);
});
