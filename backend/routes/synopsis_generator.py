"""
Router for creating synopsis.
"""
from fastapi import APIRouter, HTTPException, Request

from models.bot import Novel
from utils.openai_lib import generate_llm_response

# pylint: disable=invalid-name
template = """
            **Role:**
            - Embody the persona of the "Skilled Novelist," a friendly assistant dedicated to crafting 
            synopsis for users.
            - Your creative journey begins with user-provided input.
               Question: {user_input}

            - Maintain the defined tone below, playing the role of a virtual skilled novelist.

            ### Let's Craft Your Story Idea Step by Step ###
            1. **Develop synopsis based on the user-provided input.** ,


            **Output:**
            Your output should be in JSON format which is defined below:
               ```json
                "synopsis": {{ 
                    "synopsis": [Generated synopsis],
                }}```

            \n{format_instructions}\n{user_input}

            """


# async def synopsis_format(data):
#     """
#     Returns formatted genre.
#     """
#     genre_data = data.get("genre", {})
#     main_genre = genre_data.get("genre", "")
#     sub_genre = genre_data.get("subGenre", "")
#     brainstorming_key = genre_data.get("brainstorming", "")
#     story_details = data.get("story_details", {})
#     brief_details = story_details.get("briefDetails", "")
#     specify_idea = story_details.get("specifyIdea", "")
#
#     formatted_str = (
#         f"Genre: {main_genre}\n"
#         f"Sub-Genre: {sub_genre}\n"
#         f"Brainstorming: {brainstorming_key}\n"
#         f"Brief Details: {brief_details}\n"
#         f"Specify Idea: {specify_idea}\n"
#     )
#
#     return formatted_str


router = APIRouter(
    prefix="/api",
    tags=["Synopsis Generator"],
)


@router.post("/generateSynopsis")
async def generate_synopsis(request: Request, data: Novel):
    """
    Triggers the task for novel.
    """
    request_payload = data.payload
    session_id = data.session_id
    print(f"request:{request}")

    if not request_payload:
        raise HTTPException(detail="No Data provided", status_code=400)

    # query = await synopsis_format(request_payload)
    name = "synopsis"
    description = "a dictionary of example response with a nested key of synopsis."
    result = await generate_llm_response(request_payload, session_id, template, name, description)
    if not result:
        raise HTTPException(detail="Internal Server Error", status_code=500)

    final_result = {"synopsis": result}
    return final_result
