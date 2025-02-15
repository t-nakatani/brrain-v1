import uvicorn
from fastapi import FastAPI
from pydantic_ai import Agent

from app.prompts.system_prompt import system_prompt
from app.prompts.runtime_prompt import runtime_prompt

from pydantic import BaseModel

app = FastAPI()

agent = Agent(
    model="gpt-4o-mini",
    system_prompt=system_prompt,
)


@app.get("/")
def read_root():
    return {"message": "Hello World"}


class ChatRequest(BaseModel):
    message: str


@app.get("/chat")
def chat(request: ChatRequest):
    result = agent.run_sync(runtime_prompt.format(user_input=request.message))
    return result.data


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
