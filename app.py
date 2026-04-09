import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from chat import chat_llm
import uvicorn

app = FastAPI()

# Absolute path resolution
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(BASE_DIR, "index.html")

class ChatRequest(BaseModel):
    message: str

@app.get("/", response_class=HTMLResponse)
def home():
    try:
        if not os.path.exists(INDEX_PATH):
            raise FileNotFoundError
        with open(INDEX_PATH, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        raise HTTPException(status_code=404, detail="index.html not found on server")

@app.post("/chat")
def chat(data: ChatRequest):
    try:
        reply = chat_llm(data.message)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
