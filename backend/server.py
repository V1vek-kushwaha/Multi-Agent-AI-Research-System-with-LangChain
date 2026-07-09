"""
FastAPI wrapper around the existing multi-agent research pipeline.
Run with:uvicorn server:app --reload --port 8000


"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from pipeline import run_research_pipeline

app = FastAPI(title="Multi-Agent Research API")

# Allow the Vite dev server (and localhost preview build) to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://multi-agent-ai-research-system-with-nine.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ResearchRequest(BaseModel):
    topic: str


class ResearchResponse(BaseModel):
    topic: str
    search_results: str
    research_data: str
    report: str
    critic_response: str


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/research", response_model=ResearchResponse)
def research(payload: ResearchRequest):
    """
    Runs the full 4-step pipeline (search -> read -> write -> critique)
    synchronously and returns the final state. FastAPI runs sync `def`
    endpoints in a threadpool automatically, so this won't block the
    event loop even though run_research_pipeline() is blocking.
    """
    topic = payload.topic.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="Topic cannot be empty.")

    try:
        state = run_research_pipeline(topic)
    except Exception as exc:  # surface pipeline errors as a clean 500
        raise HTTPException(status_code=500, detail=f"Pipeline failed: {exc}") from exc

    # NOTE: depending on what writer_chain / critic_chain return in agents.py
    # (a plain string vs. a message/object), you may need to adjust the
    # str(...) casts below to pull out e.g. `.content`.
    return ResearchResponse(
        topic=topic,
        search_results=str(state.get("search_results", "")),
        research_data=str(state.get("research_data", "")),
        report=str(state.get("report", "")),
        critic_response=str(state.get("critic_response", "")),
    )
