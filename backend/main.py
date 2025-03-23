from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chatbot import get_chat_response
from youtube_api import get_youtube_suggestions

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Mental Health Chatbot API"}

@app.post("/chat")
async def chat(user_input: dict):
    response = get_chat_response(user_input["message"])
    return {"response": response}

@app.get("/youtube")
async def youtube(query: str):
    videos = get_youtube_suggestions(query)
    return {"videos": videos}

