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
            story idea for users.
            - Your creative journey begins with user-provided input.
               Question: {user_input}

            - Maintain the defined tone below, playing the role of a virtual skilled novelist.

            ### Let's Craft Your Story Idea Step by Step ###
            1. **Develop a story idea based on the user-provided input.** ,

            **Output:**
            Your output should be in JSON format which is defined below:
               ```json
                "story_details": {{ 
                "briefDetails": [Generated brief details],
                "specifyIdea": [Generated idea],
                }}```

            \n{format_instructions}\n{user_input}

            """


# async def genre_format(data):
#     """
#     Returns formatted genre.
#     """
#     genre_data = data.get("genre", {})
#     main_genre = genre_data.get("genre", "")
#     sub_genre = genre_data.get("subGenre", "")
#     brainstorming = genre_data.get("brainstorming", "")
#
#     formatted_genre = (
#         f"Genre: {main_genre}\n"
#         f"Sub-Genre: {sub_genre}\n"
#         f"Brainstorming: {brainstorming}\n"
#     )
#
#     return formatted_genre


router = APIRouter(
    prefix="/api",
    tags=["Story Generator"],
)


@router.post("/generateStory")
async def generate_story(request: Request, data: Novel):
    """
    Triggers the task for novel.
    """
    request_payload = data.payload
    session_id = data.session_id
    print(f"request:{request}")

    if not request_payload:
        raise HTTPException(detail="No Data provided", status_code=400)

    # query = await genre_format(request_payload)
    name = "story_details"
    description = "a dictionary of example response."
    result = await generate_llm_response(request_payload, session_id, template, name, description)

    if not result:
        raise HTTPException(detail="Internal Server Error", status_code=500)

    return result
