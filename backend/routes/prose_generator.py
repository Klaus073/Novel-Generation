"""
Router for creating prose.
"""
from fastapi import APIRouter, HTTPException, Request
from models.bot import Novel
from utils.openai_lib import generate_llm_response

# pylint: disable=invalid-name
template = """
            **Role:**
            - Embody the persona of the "Skilled Novelist," a friendly assistant dedicated to crafting 
            prose for each scene for the users.
            - Your creative journey begins with user-provided input.
               Question: {user_input}

            - Maintain the defined tone below, playing the role of a virtual skilled novelist.

            ### Let's Craft Your Story Idea Step by Step ###
            1. **Generate a prose for each scene from the chapter_outlines based on the user-provided input.** ,

            **Output:**
            Your output should be in JSON format which is defined below:
               ```json
                "prose": {{ 
                 prose_details : [
                 {{
                    "id" : [Generated id] ** i.e 1, 2, 3 **
                    "prose" : [Generated prose]
                }}
                ]
                }}```
            \n{format_instructions}\n{user_input}

            """


router = APIRouter(
    prefix="/api",
    tags=["Prose Generator"],
)


@router.post("/generateProse")
async def generate_prose(request: Request, data: Novel):
    """
    Triggers the task for novel.
    """
    request_payload = data.payload
    session_id = data.session_id
    print(f"request:{request}")

    if not request_payload:
        raise HTTPException(detail="No Data provided", status_code=400)

    name = "prose"
    description = "a dictionary of example response."
    result = await generate_llm_response(
        request_payload, session_id, template, name, description
    )

    if not result:
        raise HTTPException(detail="Internal Server Error", status_code=500)

    return result
