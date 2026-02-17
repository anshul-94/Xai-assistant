import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

// SETUP

const app = express();

app.use(cors());
app.use(express.json());
// GEMINI API

const ai = new GoogleGenAI({

apiKey: "AIzaSyCHZB1rQAh_HsBb4UowHhVGG5y2XCjUl5o"
});

app.get("/", (req, res) => {

res.send(`
    
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">


<title>Anshul AI Assistant</title>







<style>
:root{
--bg-main:linear-gradient(135deg,#0f0c29,#1a1a2e,#16213e);
--bg-sidebar:#0f0c29;
--bg-chat:rgba(255,255,255,0.05);
--bg-input:rgba(255,255,255,0.07);
--border:rgba(255,255,255,0.08);
--accent:#00f5a0;
--accent-gradient:linear-gradient(45deg,#00f5a0,#00d9f5);
--text:#ffffff;
--text-light:#9ca3af;
--radius:10px;
}

/* GLOBAL */
html,body{
margin:0;
height:100dvh;
max-width:100%;
overflow-x:hidden;
background:var(--bg-main);
font-family:system-ui,-apple-system,Segoe UI;
color:var(--text);
}

*{
box-sizing:border-box;
}

.app{
display:flex;
height:100dvh;
width:100%;
}

/* SIDEBAR */
.sidebar{
width:260px;
min-width:220px;
background:var(--bg-sidebar);
border-right:1px solid var(--border);
display:flex;
flex-direction:column;
padding:15px;
}

.logo{
font-size:20px;
font-weight:700;
margin-bottom:20px;
background:var(--accent-gradient);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
}

.new-chat{
background:transparent;
border:1px solid var(--border);
color:var(--text);
padding:10px;
border-radius:var(--radius);
cursor:pointer;
margin-top:10px;
transition:all 0.25s ease; /* smooth animation */
}

/* HOVER EFFECT */
.new-chat:hover{

border-color:#00f5a0;

color:#00f5a0;

box-shadow:0 0 8px rgba(0,245,160,0.4);

}


.chat-item{

padding:10px;

border-radius:var(--radius);

color:var(--text-light);

cursor:pointer;

transition:all 0.25s ease;

border:1px solid transparent;

}

/* HOVER EFFECT */

.chat-item:hover{

border-color:#00f5a0;

color:#00f5a0;

box-shadow:0 0 8px rgba(0,245,160,0.4);

background:rgba(0,245,160,0.05);

}

.chat-item.active{
background:rgba(0,245,160,0.15);
color:#00f5a0;
}

.user{
margin-top:auto;
padding-top:15px;
border-top:1px solid var(--border);
color:var(--text-light);
}

/* MAIN */

.main{
flex:1;
display:flex;
flex-direction:column;
height:100%;
min-height:0;
}

.header{
padding:15px;
border-bottom:1px solid var(--border);
background:rgba(255,255,255,0.02);
}

/* CHAT BOX */
.chat-box{
flex:1;
overflow-y:auto;
padding:20px;
padding-bottom:80px;
display:flex;
flex-direction:column;
gap:12px;
height:0;   /* CRITICAL FIX */
}

/* MESSAGE */
.message{
padding:12px 16px;
border-radius:var(--radius);
max-width:70%;
word-wrap:break-word;
}

.message.bot{
background:var(--bg-chat);
border:1px solid var(--border);
align-self:flex-start;
}

.message.user{
background:var(--accent-gradient);
color:#000;
align-self:flex-end;
}

/* INPUT AREA — CLEAN VERSION */
.input-area{
position:sticky;
bottom:0;
display:flex;
align-items:center;
gap:10px;
padding:12px;
margin:10px;
border-top:1px solid var(--border);
border-radius:12px;
background:rgba(15,12,41,0.9);
backdrop-filter:blur(10px);
transition:all 0.25s ease;
}

.input-area{

position:sticky;
bottom:0;

display:flex;
align-items:center;
gap:10px;

padding:12px;
margin:10px;

border:1px solid var(--border);   /* normal border */

border-radius:12px;

background:rgba(15,12,41,0.9);

transition:border-color 0.25s ease;

}
.input-area:hover{

border-color:#00f5a0;   /* highlight border */

}
.input-area:focus-within{

border-color:#00f5a0;

}

.input-area input{
flex:1;
min-width:0;
background:transparent;
border:none;
outline:none;
padding:10px;
border-radius:var(--radius);
color:var(--text);
font-size:16px;
}

.input-area button{
flex-shrink:0;
background:var(--accent-gradient);
border:none;
padding:10px 16px;
border-radius:var(--radius);
cursor:pointer;
color:#000;
font-weight:600;
white-space:nowrap;
}

/* CENTER GREETING */
.center-screen{
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
text-align:center;
opacity:0.9;
transition:0.3s;
width:100%;
display:flex;
flex-direction:column;
align-items:center;
}

.center-screen.hidden{
opacity:0;
pointer-events:none;
transform:translate(-50%,-60%);
}

.center-title{
font-size:clamp(18px,4vw,28px);
font-weight:500;
margin-bottom:10px;
white-space:nowrap;
max-width:90vw;
overflow:hidden;
text-overflow:ellipsis;
}

.center-sub{
font-size:14px;
color:#9ca3af;
}
/* ================= MOBILE ================= */

@media (max-width:768px){

/* hide sidebar */
.sidebar{
display:none;
}

/* chat spacing so messages not hidden */
.chat-box{
padding:15px;
padding-bottom:100px;
}

/* floating input container */
.input-area{

position:fixed;

bottom:2px;

left:5px;

right:5px;

display:flex;

align-items:center;

gap:8px;

padding:8px 10px;

border-radius:14px;

background:rgba(15,12,41,0.95);

border:1px solid var(--border);

box-shadow:0 4px 20px rgba(0,0,0,0.4);

backdrop-filter:blur(12px);

z-index:1000;

}

/* input field responsive */
.input-area input{

flex:1;

min-width:0;

background:transparent;

border:none;

outline:none;

font-size:16px;

padding:10px;

color:white;

}

/* send button responsive */
.input-area button{

flex-shrink:0;

padding:10px 16px;

border-radius:10px;

background:var(--accent-gradient);

border:none;

font-weight:600;

}

/* message width */
.message{
max-width:85%;
}

/* center greeting responsive */
.center-title{
font-size:clamp(16px,5vw,22px);
}

}

/* SMALL MOBILE */

@media (max-width:425px){

.input-area input{
font-size:16px;
padding:8px;
}

.input-area button{
padding:8px 12px;
font-size:14px;
}

}

/* VERY SMALL */

@media (max-width:320px){

.center-title{
font-size:15px;
}

}

/* SCROLLBAR */

::-webkit-scrollbar{
width:5px;
}

::-webkit-scrollbar-thumb{
background:var(--accent-gradient);
border-radius:10px;
}

/* TABLET + MOBILE CENTER FIX */

@media (max-width:1024px){

.center-screen{

position:absolute;

top:0;
left:0;

width:100%;
height:100%;

display:flex;

flex-direction:column;

justify-content:center;

align-items:center;

transform:none;

text-align:center;

padding:20px;

}

}
.chat-box{
flex:1;
position:relative;
display:flex;
flex-direction:column;
justify-content:flex-start;
overflow-y:auto;
}









</style>

















</head>
<body>

<div class="app">

    <!-- SIDEBAR -->
    <div class="sidebar">

        <div class="logo">
            Xai'27
        </div>

        <div class="chat-history">
            <div class="chat-item active">
                AI Assistant
            </div>
        </div>
<button class="new-chat" onclick="newChat()">
            + New Chat
        </button>


        <div class="user">
            Anshul
        </div>

    </div>


    <!-- MAIN CHAT -->
    <div class="main">

        <!-- HEADER -->
        <div class="header">
            Xai'27 AI Assistant
        </div>


        <!-- CHAT BOX -->
<div id="chat-box" class="chat-box">

<div id="center-screen" class="center-screen">

<div class="center-title" id="center-text">
</div>

<div class="center-sub">
    Ask anything  Anshul AI Assistant is ready to help you
</div>

</div>

</div>


        <!-- INPUT AREA -->
        <div class="input-area">

            <input
                id="input"
                placeholder="Ask Xai'27 anything..."
            >

<button onclick="sendMessage(); input.focus();">
Send
</button>


        </div>

    </div>
</div>



<script>


const greetingMessages = [

"Hello! How can I help you today?",
"Welcome! I'm here to help you.",
"Ask me anything — I'm ready to assist.",
"How can I make your day easier?",
"Need help? Just type your question.",
"Let's get started. How can I assist you?",
"What would you like to know?",
"Feel free to ask me anything.",

];
function showCenterGreeting(){

const text =
greetingMessages[
Math.floor(Math.random()*greetingMessages.length)
];

document.getElementById("center-text").innerText = text;

}


function showGreeting(){

const chatBox =
document.getElementById("chat-box");

const randomMessage =
greetingMessages[
Math.floor(Math.random()*greetingMessages.length)
];

const div =
document.createElement("div");

div.className =
"message bot";

div.id =
"botGreeting";

div.innerHTML =
randomMessage;

chatBox.appendChild(div);

}


/* ===============================
NEW CHAT FUNCTION
=============================== */

function newChat(){

const chatBox =
document.getElementById("chat-box");

// remove only messages, not center-screen
const messages =
chatBox.querySelectorAll(".message");

messages.forEach(msg => msg.remove());

// show center screen again
const center =
document.getElementById("center-screen");

center.classList.remove("hidden");

// show new random greeting
showCenterGreeting();

chatBox.scrollTop = 0;

}


/* ===============================
ENTER KEY SUPPORT
=============================== */

const input =
document.getElementById("input");

input.addEventListener(
"keypress",
function(e){

if(e.key==="Enter"){

sendMessage();

}

});


/* ===============================
SEND MESSAGE
=============================== */

async function sendMessage(){

const text =
input.value.trim();

if(!text) return;


/* USER MESSAGE */

addMessage(
text,
"user"
);


// HIDE CENTER SCREEN

const center =
document.getElementById("center-screen");

if(center)
center.classList.add("hidden");

input.value = "";
input.focus();   


addMessage(
"Xai'27 is typing...",
"bot",
"typing"
);





try{

const res =
await fetch(
"/chat",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:text
})

}
);

const data =
await res.json();

removeTyping();

addMessage(
data.reply,
"bot"
);

}
catch{

removeTyping();

addMessage(
"Server not connected.",
"bot"
);

}

}


/* ===============================
ADD MESSAGE
=============================== */

function addMessage(
text,
type,
id
){

const box =
document.getElementById("chat-box");

const div =
document.createElement("div");

div.className =
"message "+type;

if(id)
div.id=id;

div.innerHTML =
text;

box.appendChild(div);

box.scrollTop =
box.scrollHeight;

}


/* ===============================
REMOVE TYPING
=============================== */

function removeTyping(){

const typing =
document.getElementById("typing");

if(typing)
typing.remove();

}


/* ===============================
AUTO LOAD GREETING
=============================== */

window.onload =
function(){

showCenterGreeting();

};


</script>


</body>
</html>




`);

});

// CHAT API

app.post("/chat", async (req, res) => {

try{

const response = await ai.models.generateContent({

model: "gemini-2.5-flash",

config: {
systemInstruction: `
You are Xai'27, an AI assistant created by Anshul.

Identity Rules:
- Your creator is Anshul.
- Only mention Anshul when user asks WHO created you.
- Never say Google created you.

Purpose Rules:
- If user asks WHY you were created, reply only with purpose.
  Hinglish example: "Mujhe users ki help karne ke liye banaya gaya hai."
  Hindi example: "Mujhe users ki madad karne ke liye banaya gaya hai."
  English example: "I was created to help users."

- If user asks WHO created you, reply only with creator.
  Hinglish: "Mujhe Anshul ne banaya hai."
  Hindi: "Mujhe Anshul ne banaya hai."
  English: "I was created by Anshul."

- If user asks BOTH who and why, reply with both in one sentence.
  Hinglish example: "Mujhe Anshul ne banaya hai taki main users ki help kar saku."

- If the user asks for recommendations related to studies, coding, exams, or learning, and the context is India or not specified, always prioritize Indian YouTube channels, platforms, and resources first, and only include international ones as secondary options if helpful.

Universal Clarification Rule:
Whenever the user asks for suggestions, recommendations, or best options but does not clearly specify the category, purpose, or context, always ask a short clarification question first before giving any suggestions.

Do NOT give recommendations until the user clarifies.

Ask the clarification question in the same language and style as the user.

Examples:
- "Aap kis type ka chahte ho? Coding, comedy, learning, vlog, ya kuch aur?"
- "What exactly are you looking for? Coding, learning, entertainment, or something else?"
- "Aapka purpose kya hai? Learning, exam preparation, ya entertainment?"

This rule applies to ALL recommendation cases including YouTube channels, courses, tools, careers, resources, or any suggestions.




Language Rules:
- Reply in EXACT same language as user.
- Hinglish → Hinglish
- Hindi → Hindi
- English → English

Behavior Rules:
- Answer only what user asked.
- Do not add extra details.
- Keep answers short and natural.
- Sound like a friendly human assistant.



Identity:
- Your name is Xai.
- You are an AI assistant, not Google.

Formatting Rules:
- Do NOT use Markdown.
- Do NOT use *, **, or bullet symbols.
- Use plain text only.
- Use numbered lists when giving multiple items.
`
},


contents: req.body.message

});






res.json({

reply:response.text

});

}catch(err){

res.json({

reply:"Error: "+err.message

});

}

});

app.listen(3001,()=>{

console.log("AI Agent running at:");
console.log("http://localhost:3001");

});
