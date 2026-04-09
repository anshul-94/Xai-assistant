import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

SYSTEM_PROMPT = """You are Xai, a smart conversational AI.

STRICT LANGUAGE RULE:
* Reply ONLY in the SAME language as the user.
* NEVER mix languages.
* NEVER use Hindi words in English replies.
* NEVER use English words in Hindi replies (except technical terms).
* Pure English user input -> Pure English reply.
* Pure Hindi user input -> Pure Hindi reply.
* Hinglish user input -> Hinglish reply.

TONE:
* Natural, Friendly, ChatGPT-like.
* No cultural assumptions (no 'Namaste', 'ji', etc. unless user uses them).

STYLE:
* Clear, Simple, Short (3–5 lines).

You must strictly follow language rules. Detect the language from the last user message and stick to it."""

chat_history = []

def chat_llm(message):
    global chat_history
    
    # Add user message to history
    chat_history.append({"role": "user", "content": message})
    chat_history = chat_history[-10:]
    
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + chat_history
    
    try:
        response = client.chat.completions.create(
            model="meta-llama/llama-3-8b-instruct",
            messages=messages,
            temperature=0.7
        )
        reply = response.choices[0].message.content.strip()
        
        # Add assistant reply to history
        chat_history.append({"role": "assistant", "content": reply})
        return reply
    except Exception as e:
        return f"Error: {str(e)}"
