"""
Router for creating character list.
"""
from fastapi import APIRouter, HTTPException, Request
from models.bot import Novel
from utils.openai_lib import generate_llm_response
from utils.get_world_format import format_world_details

# pylint: disable=invalid-name
template = """
            **Role:**
            - Embody the persona of the "Skilled Novelist," a friendly assistant dedicated to crafting 
            world details for users.
            - Your creative journey begins with user-provided input.
               Question: {user_input}

            - Maintain the defined tone below, playing the role of a virtual skilled novelist.

            ### Let's Craft Your World Step by Step ###
            1. **Develop World details based on the user-provided input.** ,

            **Output:**
            Your output should be in JSON format which is defined below:
               ```json
                "world_details": {{
                 {{
                    "introduction": "[Generated 
                                    Brief overview of the concept or premise
                                    Highlight overarching themes and key elements]",
                    "history": "[Generated 
                                Origins and evolution of the central concept/power/magic system
                                Significant historical events and their impact
                                Turning points and pivotal moments]",
                    "geography": "[Generated 
                                    Detailed map of the world
                                    Unique characteristics of different regions
                                    Influence of environments on the central concept/power/magic system]",
                    "cultures_and_societies": "[Generated 
                                                Customs, traditions, and belief systems
                                                Social structures and power dynamics
                                                Exploration of specific cultural groups or societies
                                                Religion and Spirituality
                                                Explore the role of religion, spirituality, 
                                                or belief systems within your world.
                                                Examine how these belief systems interact with or influence the 
                                                central concept (e.g., magic, powers, technology).
                                                 Highlight any religious institutions, practices, 
                                                or deities that shape the cultures and societies.
                                                Environmental and Ecological Factors:
                                                Address the impact of the central concept 
                                                on the environment and ecological systems.
                                                Discuss any environmental challenges, disasters, 
                                                or consequences resulting from the use of abilities or technology.
                                                Explore how different cultures or societies approach environmental 
                                                stewardship or conservation efforts.
                                                Scientific Advancements and Technological Progress
                                                If your world involves advanced technology, 
                                                delve into the scientific discoveries and
                                                innovations that have shaped its development.
                                                Examine the impact of technological progress on societal structures, 
                                                economies, and power dynamics. 
                                                Consider the ethical implications or potential misuse 
                                                of technological advancements.
                                                Magical Creatures or Sentient Beings
                                                If your world includes magical creatures or sentient beings, 
                                                detail their roles, cultures, and interactions with other societies.
                                                Explore the relationships, conflicts, 
                                                or alliances between these beings and the various societies or factions.
                                                Address any mythological or legendary 
                                                origins associated with these creatures or beings.
                                                Character Diversity and Representation:
                                                 Ensure that your character arcs and personal journeys represent 
                                                a diverse range of backgrounds, identities, and perspectives.
                                                 Explore how different characters' experiences and 
                                                abilities shape their worldviews and interactions with others.
                                                Address any societal biases, prejudices, or discrimination that 
                                                certain characters may face due to their abilities or identities.]",
                    "arts_and_entertainment": "[Generated 
                                                Impact of the central concept on arts and entertainment
                                                Prestigious competitions or events
                                                Storytelling, performances, and visual arts]",
                    "institutions_and_organizations": "[Generated 
                                                        Schools, academies, guilds, or governing bodies
                                                        Role in development, training, and regulation]",
                    "conflict_and_politics": "[Generated 
                                                Political landscape and power struggles
                                                Ideological differences and their impact
                                                Key conflicts and tensions]",
                    "economy_and_trade": "[Generated 
                                            Economic systems and influence of the central concept
                                            Specialized markets and rare goods]",
                    "language_and_communication": "[Generated 
                                                    Linguistic diversity and communication methods
                                                    Influence of the central concept on language and communication]",
                    "mythology_and_legends": "[Generated 
                                                Myths, legends, and folklore surrounding the central concept
                                                Influence on the perception and cultural significance]",
                    "interactions_with_mundane": "[Generated 
                                                    Dynamic between those with abilities/powers and ordinary people
                                                    Discrimination, fear, or awe towards exceptional individuals]",
                    "unique_quality": "[Generated 
                                        Sources, rules, and limitations 
                                        Mechanisms for accessing and controlling abilities
                                        Potential consequences and drawbacks]",
                    "character_arcs": "[Generated 
                                        In-depth character arcs for main characters and supporting cast
                                        Personal growth and individual journeys shaped by abilities/powers]",
                    "themes": "[Generated 
                                Central themes to be explored
                                Integration of themes into the narrative]",
                    "conclusion": "[Generated 
                                    Summary of key elements
                                    Reiteration of the focus on personal growth and the central concept]",
                    "additional_resources": "[Generated 
                                                Consider including appendices or supplementary materials to 
                                                provide additional context or information.
                                                These could include glossaries, timelines, 
                                                character profiles, or in-depth explorations of
                                                specific topics or concepts within your world.]"
                                            
                }}
                }}``` 
                **Note** Include headings in response not as separated dictionary keys.**
            
       
            \n{format_instructions}\n{user_input}

            """


# pylint: disable=R0914
async def format_input(data):
    """
    Returns formatted genre.
    """
    world_details = await format_world_details(data)
    genre_data = data.get("genre", {})
    main_genre = genre_data.get("genre", "")
    sub_genre = genre_data.get("subGenre", "")
    brainstorming = genre_data.get("brainstorming", "")
    story_details = data.get("story_details", {})
    brief_details = story_details.get("briefDetails", "")
    specify_idea = story_details.get("specifyIdea", "")
    character_details = data.get("character_details", [])
    synopsis = data.get("synopsis", {}).get("synopsis", "")
    formatted_details = (
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
        + f"\nSynopsis: {synopsis}\n"
        + f"\nWorld Details : {world_details}\n"
    )

    return formatted_details


router = APIRouter(
    prefix="/api",
    tags=["World Generator"],
)


@router.post("/generateWorld")
async def generate_world(request: Request, data: Novel):
    """
    Triggers the task for novel.
    """
    final_template = template
    request_payload = data.payload
    refine = request_payload.get("refine")
    print(f"refine: {refine}")

    if refine != "":
        final_template = template.replace(
            "**Develop World details based on the user-provided input.**",
            "**Refine world details based on the user-provided input**" + f"** Refining Instructions: {refine}",
        )

    session_id = data.session_id
    print(f"request:{request}")

    if not request_payload:
        raise HTTPException(detail="No Data provided", status_code=400)

    query = await format_input(request_payload)
    name = "world_details"
    description = "a dictionary of example response"
    result = await generate_llm_response(
        query, session_id, final_template, name, description
    )

    if not result:
        raise HTTPException(detail="Internal Server Error", status_code=500)

    return result
