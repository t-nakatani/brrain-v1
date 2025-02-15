from typing import Optional

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic_ai import Agent
from pydantic_ai.format_as_xml import format_as_xml
from fastapi.responses import JSONResponse
from app.prompts.system_prompt import system_prompt
from app.prompts.runtime_prompt import runtime_prompt
from app.models import AgentResponse

from pydantic import BaseModel
from loguru import logger

app = FastAPI()

# CORSミドルウェアを追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Viteのデフォルトポート
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = Agent(
    model="gpt-4o-mini",
    system_prompt=system_prompt,
)


@app.get("/")
def read_root():
    return {"message": "Hello World"}


class ChatRequest(BaseModel):
    message: str
    context: list[str]
    latent_intent: Optional[str] = None


@app.post("/api/chat")  # GETからPOSTに変更し、パスを/api/chatに修正
async def chat(request: ChatRequest):
    logger.info(f"Received request: {request}")
    result = await agent.run(runtime_prompt.format(user_input=format_as_xml(request)), result_type=AgentResponse)
    logger.debug(f"Result: {result.data}")
    return JSONResponse(result.data.model_dump())


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
