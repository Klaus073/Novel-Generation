"""
Router for creating story.
"""
from fastapi import APIRouter, HTTPException, Request

from models.bot import Novel
from utils.openai_lib import generate_llm_response

# pylint: disable=invalid-name
template = """
            **Role:**
            - Embody the persona of the "Skilled Novelist," a friendly assistant dedicated to crafting 
            story structure outline for users.
            - Your creative journey begins with user-provided input.
               Question: {user_input}

            - Maintain the defined tone below, playing the role of a virtual skilled novelist.

            ### Let's Craft Your Story Structure Outline Step by Step ###
            1. **Develop a story structure outline on the user-provided input.** ,

            **Output:**
            Your output should be in JSON format which is defined below:
               ```json
                "story_structure_outlines": {{ 
                 [Generated story structure outline]
                }}```
            ** Do not **
            Do not include nested dictionary in story_structure_outline. Just generate a text based response with proper 
            headings in story_structure_outline.

            \n{format_instructions}\n{user_input}

            """


async def format_input(data):
    """
    Returns formatted genre.
    """
    genre_data = data.get("genre", {})
    main_genre = genre_data.get("genre", "")
    sub_genre = genre_data.get("subGenre", "")
    brainstorming = genre_data.get("brainstorming", "")
    story_details = data.get("story_details", {})
    brief_details = story_details.get("briefDetails", "")
    specify_idea = story_details.get("specifyIdea", "")
    story_structure = story_details.get("storyStructure", "")
    character_details = data.get("character_details", [])
    synopsis = data.get("synopsis", {}).get("synopsis", "")

    formatted_genre = (
        f"Genre: {main_genre}\n"
        f"Sub-Genre: {sub_genre}\n"
        f"Brainstorming: {brainstorming}\n"
        "Character Details:\n"
        + "\n".join(
            [
                f"ID: {char.get('id', '')}, Basic Info: {char.get('basic_info', '')}, "
                f"Physical Description: {char.get('physical_description', '')}, "
                f"Personality: {char.get('personality', '')}, "
                f"Relationships: {char.get('relationships', '')}, "
                f"Background: {char.get('background', '')}, "
                f"Skill and Abilities: {char.get('skill_and_abilities', '')}, "
                f"Role: {char.get('role', '')}, Miscellaneous: {char.get('miscellaneous', '')}"
                for char in character_details
            ]
        )
        + f"Story Details:\nBrief Details: {brief_details}\nSpecify Idea: {specify_idea}\n"
        f"Story Structure: {story_structure}\n" + f"\nSynopsis: {synopsis}\n"
    )

    return formatted_genre


router = APIRouter(
    prefix="/api",
    tags=["Outline Generator"],
)


@router.post("/generateOutline")
async def generate_outline(request: Request, data: Novel):
    """
    Triggers the task for novel.
    """
    request_payload = data.payload
    session_id = data.session_id
    print(f"request:{request}")

    if not request_payload:
        raise HTTPException(detail="No Data provided", status_code=400)

    query = await format_input(request_payload)
    name = "story_structure_outlines"
    description = "a dictionary of example response."
    result = await generate_llm_response(query, session_id, template, name, description)

    if not result:
        raise HTTPException(detail="Internal Server Error", status_code=500)

    return result
