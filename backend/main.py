"""
main.py - runs the FastAPI server.
"""

import os
from dotenv import load_dotenv

load_dotenv()

#pylint: disable=wrong-import-position
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import routes.novel_generator
import routes.story_generator
import routes.synopsis_generator
import routes.character_generator
import routes.outline_generator
import routes.world_generator
import routes.location_generator
import routes.beat_expansion_generator
import routes.prose_generator
import routes.chapter_outline_generator
#pylint: enable=wrong-import-position

tags_metadata = [
    {
        "name": "Home",
        "description": "Displays Welcome Message.",
    },

    {
        "name": "Novel Generator",
        "description": "Generates novel for users.",
    },

    {

        "name" : "Story Generator",
        "description" : "Generates story idea for users.",
    },

    {
        "name" : "Synopsis Generator",
        "description" : "Generates Synopsis.",
    },

    {
        "name": "CharacterList Generator",
        "description": "Generates List of characters.",
    },

    {
        "name": "Outline Generator",
        "description": "Generates Story Structure outline",
    },

    {
        "name": "World Generator",
        "description": "Generates World details",
    },

    {
        "name": "Location Generator",
        "description": "Generates Location details",
    },

    {
        "name": "PlotBeats Generator",
        "description": "Generates Plot beats",
    },

    {
        "name": "Prose Generator",
        "description": "Generates Prose",
    },

    {
        "name": "ChapterOutline Generator",
        "description": "Generates Chapter Outline",
    }

]

DESCRIPTION = """
Description 🚀
"""

app = FastAPI(
    title="Title",
    description=DESCRIPTION,
    summary="To create a single stop solution for LLMs and other AI tools.",
    version="APLHA",
    contact={
        "name": "Texagon",
        "url": "https://texagon.io",
        "email": "admin@texagon.io",
    },tags_metadata=tags_metadata
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(routes.novel_generator.router)
app.include_router(routes.story_generator.router)
app.include_router(routes.synopsis_generator.router)
app.include_router(routes.character_generator.router)
app.include_router(routes.outline_generator.router)
app.include_router(routes.world_generator.router)
app.include_router(routes.location_generator.router)
app.include_router(routes.beat_expansion_generator.router)
app.include_router(routes.prose_generator.router)
app.include_router(routes.chapter_outline_generator.router)

@app.get("/", tags=['Home'])
def welcome_to_the_api() -> dict:
    """
    Returns a welcome message.
    """
    return {"Welcome": "Work in Progress"}


if __name__ == '__main__':
    uvicorn.run("__main__:app", host="0.0.0.0", port=int(os.getenv("PORT", "8080")), reload=True)
