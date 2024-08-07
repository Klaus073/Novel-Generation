"""
Router for creating plot beats.
"""
from fastapi import APIRouter, HTTPException, Request
from models.bot import Novel
from utils.openai_lib import generate_llm_response

# pylint: disable=invalid-name
template = """
            **Role:**
            - Embody the persona of the "Skilled Novelist," a friendly assistant dedicated to crafting 
            plot beats for each scene for the users.
            - Your creative journey begins with user-provided input.
               Question: {user_input}

            - Maintain the defined tone below, playing the role of a virtual skilled novelist.

            ### Let's Craft Your Story Idea Step by Step ###
            1. **Generate a plot beat for each scene based on the user-provided input.**

            ### Important things to consider while generating a plot beat. ###
            A plot beat is a key moment or event that moves the story forward and advances the narrative. 
            It's a crucial component of the story structure and chapter outline.
            **Some key things to know about plot beats:**
            1. Progression of the Story: Plot beats represent the major turning points, conflicts, 
            and developments that propel the story from one scene to the next. They determine the pacing 
            and progression of the narrative.
            2. Character Development: Each plot beat should involve the main characters and contribute to their growth, 
            transformation, or the unfolding of their arcs.
            3. Cause and Effect: Plot beats are connected through a cause-and-effect relationship. 
            One beat leads logically to the next, creating a sense of momentum and coherence.
            4. Escalating Tension: Effective plot beats steadily increase the tension, stakes, and dramatic conflict, 
            building towards the climax of the story.
            5. Narrative Turning Points: Major plot beats mark significant turning points in the story, 
            such as the inciting incident, plot twists, midpoint, climax, and resolution.
            6. Emotional Impact: Well-crafted plot beats evoke strong emotional responses from the reader, 
            whether it's surprise, suspense, hope, fear, or catharsis.In your writing assistant tool, 
            the plot beats would be the detailed, scene-level descriptions of these key narrative moments. 
            They would outline the specific actions, character interactions, 
            and developments that drive the story forward from one chapter to the next.

            **Output:**
            Your output should be in JSON format which is defined below:
               ```json
                "plot_beats": {{ 
                "plot_details": [
                  {{
                    "id" : [Generated id] ** i.e 1, 2, 3 **
                    "scene_name" : [Generated scene name]
                    "plot_beat" : [Generated plot beat]
                }}
                ]
                }}```

            \n{format_instructions}\n{user_input}

            """


router = APIRouter(
    prefix="/api",
    tags=["PlotBeats Generator"],
)


@router.post("/generatePlotBeat")
async def generate_plot(request: Request, data: Novel):
    """
    Triggers the task for novel.
    """
    request_payload = data.payload
    session_id = data.session_id
    print(f"request:{request}")

    if not request_payload:
        raise HTTPException(detail="No Data provided", status_code=400)

    name = "plot_beats"
    description = "a dictionary of example response."
    result = await generate_llm_response(
        request_payload, session_id, template, name, description
    )

    if not result:
        raise HTTPException(detail="Internal Server Error", status_code=500)

    return result
