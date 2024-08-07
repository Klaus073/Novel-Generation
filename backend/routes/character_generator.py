"""
Router for creating character list.
"""
from fastapi import APIRouter, HTTPException, Request
from models.bot import Novel
from utils.openai_lib import generate_llm_response

# pylint: disable=invalid-name
template = """
            **Role:**
            - Embody the persona of the "Skilled Novelist," a friendly assistant dedicated to crafting 
            character list for users.
            - Your creative journey begins with user-provided input.
               Question: {user_input}

            - Maintain the defined tone below, playing the role of a virtual skilled novelist.

            ### Let's Craft Your Character List  Step by Step ###
            1. **Develop Character List based on the user-provided synopsis.** ,


            **Output:**
            Your output should be in JSON format which is defined below:
               ```json
                "character_details": [
                 {{
                    "id": [Generated id] ** i.e 1, 2, 3 etc **,
                    "basic_info" : [Generated 
                                    1. Name:
                                    a. Full name
                                    b. Nicknames or aliases 
                                    2. Age:
                                    3. Date of Birth:
                                    4. Place of Birth:
                                    5. Nationality/ethnicity:
                                    6. Gender:
                                    7. Sexual orientation:
                                    8. Relationship Status:
                                    9. Occupation:
                                    10. Education level:
                                    11. Socioeconomic status:] 
                                    * Don't use sub headings i.e a. [Generated Full name] etc*
                    "physical_description": [Generated 
                                             1. Height:
                                             2. Weight:
                                             3. Build:
                                             4. Hair color:
                                             5. Hair style/length:
                                             6. Eye color:
                                             7. Glasses or contacts:
                                             8. Skin tone:
                                             9. Tattoos, scars, or other markings:
                                             10. Clothing style:
                                             11. Accessories:
                                             12. Distinguishing features:
                                             ],
                    "personality": [Generated 
                                    1. General demeanor:
                                    2. Key personality traits:
                                    3. Strengths:
                                    4. Weaknesses:
                                    5. Likes:
                                    6. Dislikes:
                                    7. Hobbies/interests:
                                    8. Fears:
                                    9. Aspirations/goals:
                                    10. Secrets:
                                    11. Pet peeves:
                                    12. Sense of humor:
                                    13. Quirks or unusual habits:],
                                    14.Character Archetype:
                                    15.Character Enneagram:
                                    16. Dialogue Style:                 
                                    17. Meijer Briggs:
                    "relationships": [Generated 
                                        1. Family:
                                        a. Parents
                                        b. Siblings 
                                        c. Extended family
                                        2. Friends:
                                        a. Close friends
                                        b. Acquaintances
                                        3. Romantic interests:
                                        4. Enemies/rivals:
                                        5. Relationship with other main characters:
                                        6. How they interact with others:],
                                        * Don't use sub headings i.e a. [Generated Parents] etc*
                    "background": [Generated 
                                    1. Childhood:
                                    a. Family life
                                    b. Significant events   
                                    2. Teenage years:
                                    a. School experiences
                                    b. First love, heartbreak, etc.
                                    3. Adulthood:
                                    a. Career
                                    b. Relationships
                                    c. Significant life events
                                    4. How past events have shaped them:
                                    5. How they have changed over time:],
                                    * Don't use sub headings i.e a. [Generated Family life] etc*
                    "skill_and_abilities": [Generated 
                                            1. Physical skills:
                                            2. Intellectual skills:
                                            3. Social skills:
                                            4. Emotional skills:
                                            5. Special/unique talents:
                                            6. Limitations or weaknesses:],
                    "role": [Generated 
                            1. Main goal:
                            2. How they become involved in the plot:
                            3. Conflicts they face:
                            4. Their arc or development:
                            5. Key relationships or interactions with other characters:
                            6. How they contribute to the resolution of the story:
                            ],
                    "miscellaneous": [Generated 
                                        1. Favorite quotes or sayings:
                                        2. Character inspiration or influences:
                                        3. Theme song or soundtrack:
                                        4. Other relevant information or details:
                                        5. Online Presence:
                                        6. Favorite foods:]
                }}
                ]```
            \n{format_instructions}\n{user_input}

            """


async def format_character_list(data):
    """
    Returns formatted character list.
    """
    character_details = data.get("character_details", [])
    formatted_input = "Character Details:\n" + "\n".join(
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

    return formatted_input


async def format_input(data):
    """
    Returns formatted synopsis.
    """
    synopsis_data = data.get("synopsis", {})
    synopsis = synopsis_data.get("synopsis", "")

    formatted_input = f"Synopsis: {synopsis}"

    return formatted_input


router = APIRouter(
    prefix="/api",
    tags=["CharacterList Generator"],
)


@router.post("/generateCharacterList")
async def generate_list(request: Request, data: Novel):
    """
    Triggers the task for novel.
    """
    request_payload = data.payload
    session_id = data.session_id
    print(f"request:{request}")
    single_character = request_payload.get("generate_single")

    if not request_payload:
        raise HTTPException(detail="No Data provided", status_code=400)

    prompt = """
            ** Generate more then 2 characters. If the characters are in input, then start the id from the next number**
            ** If characters are not present then start id from 1 **
            
    """
    query = (
        await format_input(request_payload)
        + await format_character_list(request_payload)
        + prompt
    )
    if single_character:
        print("Coming in Single Character")
        char_details = await format_character_list(request_payload)
        query = (
            query
            + char_details
            + "Generate Single character and remember to follow the same format as provided."
        )
    name = "character_details"
    description = "a list of dictionary of example response"
    result = await generate_llm_response(query, session_id, template, name, description)

    if not result:
        raise HTTPException(detail="Internal Server Error", status_code=500)

    return result
