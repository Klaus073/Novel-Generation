"""
Router for creating chapters outlines.
"""
from fastapi import APIRouter, HTTPException, Request
from models.bot import Novel
from utils.openai_lib import generate_llm_response

# pylint: disable=invalid-name
template = """
            **Role:**
            - Embody the persona of the "Skilled Novelist," a friendly assistant dedicated to crafting 
           chapter outlines for the users.
            - Your creative journey begins with user-provided input.
               Question: {user_input}

            - Maintain the defined tone below, playing the role of a virtual skilled novelist.

            ### Let's Craft Your Story Idea Step by Step ###
            1. **Generate a chapter outline based on the user-provided input.** ,

            **Output:**
            Your output should be in JSON format which is defined below:
               ```json
                "chapter_outline": {{ 
                "chapterOverview": [
                  {{
                    "id" : [Generated id] ** i.e 1, 2, 3 **
                    "numberOfScenes" : [Generated number of scenes]
                    "primarySettings" : [Generated primary settings]
                    "chapterGoal" : [Generated chapter goal]
                }}
                ]
                }}```

            \n{format_instructions}\n{user_input}

            """

scene_template = """
            **Role:**
            - Embody the persona of the "Skilled Novelist," a friendly assistant dedicated to crafting 
           scene outlines for the users.
            - Your creative journey begins with user-provided input.
               Question: {user_input}

            - Maintain the defined tone below, playing the role of a virtual skilled novelist.

            ### Let's Craft Your Story Idea Step by Step ###
            1. **Generate a scene outline based on the user-provided input.** ,

            **Output:**
            Your output should be in JSON format which is defined below:
               ```json
                "scene_outlines": {{ 
                "scenes": [
                  {{
                    "id" : [Generated id] ** i.e 1, 2, 3 ** 
                    "characterPOV" : [Generated character POV]
                    "tones" : [Generated tones]
                    "underTones" : [Generated under tones]
                    "subliminalTones" : [Generated subliminal tones]
                    "sceneSummary" : [Generated scene summary]
                }}
                ]
                }}```

            \n{format_instructions}\n{user_input}

            """


router = APIRouter(
    prefix="/api",
    tags=["ChapterOutline Generator"],
)


@router.post("/generateChapterOutline")
async def generate_chapter(request: Request, data: Novel):
    """
    Triggers the task for novel.
    """
    request_payload = data.payload
    session_id = data.session_id
    print(f"request:{request}")

    if not request_payload:
        raise HTTPException(detail="No Data provided", status_code=400)

    name = "chapter_outline"
    description = "a dictionary of example response."
    result = await generate_llm_response(
        request_payload, session_id, template, name, description
    )

    if not result:
        raise HTTPException(detail="Internal Server Error", status_code=500)

    return result


@router.post("/generateSceneOutline")
async def generate_scene(request: Request, data: Novel):
    """
    Triggers the task for novel.
    """
    request_payload = data.payload
    session_id = data.session_id
    print(f"request:{request}")

    if not request_payload:
        raise HTTPException(detail="No Data provided", status_code=400)

    name = "scene_outlines"
    description = "a dictionary of example response."
    result = await generate_llm_response(
        request_payload, session_id, scene_template, name, description
    )

    if not result:
        raise HTTPException(detail="Internal Server Error", status_code=500)

    return result
