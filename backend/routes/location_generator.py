"""
Router for creating location settings.
"""
from fastapi import APIRouter, HTTPException, Request
from models.bot import Novel
from utils.get_world_format import format_world_details
from utils.openai_lib import generate_llm_response

# pylint: disable=invalid-name
template = """
            **Role:**
            - Embody the persona of the "Skilled Novelist," a friendly assistant dedicated to crafting 
            location description for users.
            - Your creative journey begins with user-provided input.
               Question: {user_input}

            - Maintain the defined tone below, playing the role of a virtual skilled novelist.

            ### Let's Craft Your World Step by Step ###
            1. **Develop Location description and details based on the user-provided input.** ,
            2.  **If you receive a Location: heading in user-provided input, 
                do not generate the location with same name.
                Generate a different location with same template. **

            **Output:**
            Your output should be in JSON format which is defined below:
               ```json
                "location": {{
                {{
                    "name" : [Generated name],
                    
                    "description" : {{
                        "geographic_location" : [Generated Geographic location (continent, region, etc.)], 
                         "topography" : [Generated Topography (mountains, forests, deserts, etc.)],
                         "climate" : [Generated Climate and weather patterns],
                         "landmarks" : [Generated Notable natural landmarks or features]
                    }},
                    
                    "history_background" : {{ 
                        "origin_and_founding" : [Generated Origin and founding (if applicable)],
                        "historical_events" : [Generated Significant historical events or turning points],
                        "cultural_significance" : [Generated Cultural or mythological significance],
                        "legends_or_folklore"  : [Generated Legends or folklore associated with the location]
                    }},
                    
                    "architecture_infrastructure" : {{
                        "architectural_style" : [Generated Overall architectural style and influences],
                        "notable_buildings" : [Generated Notable buildings, structures, or landmarks],
                        "transportation_systems" : [Generated Transportation systems (roads, canals, etc.)],
                        "defensive_structures" : [Generated Defensive structures (walls, fortifications, etc.)]
                    }},
                    
                    "population_demographics" : {{
                        "population_size" : [Generated Approximate population size],
                        "racial_ethnic_diversity" : [Generated Racial or ethnic diversity],
                        "social_classes" : [Generated Social classes or hierarchies],
                        "prominent_groups" : [Generated Prominent families, clans, or groups]
                    }},
                    
                    "government_politics" : {{
                        "government_system" : [Generated System of government (monarchy, republic, etc.)],
                        "ruling_bodies" : [Generated Ruling bodies or leaders],
                        "laws_and_regulations" : [Generated Laws and regulations],
                        "political_tensions" : [Generated Political factions or tensions]
                    }},
                    
                    "economy_trade" : {{
                        "primary_industries" : [Generated Primary industries and exports],
                        "trade_routes" : [Generated Trade routes and partnerships],
                        "market_districts" : [Generated Market districts or commercial hubs],
                        "currency_system" : [Generated Currency and economic systems]
                    }},
                    
                    "culture_society" : {{
                        "dominant_religions" : [Generated Dominant religions or belief systems],
                        "customs_and_traditions" : [Generated Customs, traditions, and rituals],
                        "arts_and_entertainment" : [Generated Arts, entertainment, and leisure activities],
                        "education_system" : [Generated Education and intellectual pursuits]
                    }},
                    
                    "powers" : {{
                        "magic_prevalence" : [Generated Prevalence and role of magic, powers, or technology],
                        "magic_institutions" : [Generated Institutions, guilds, or 
                                                organizations related to these elements],
                        "magic_limitations" : [Generated Limitations, rules, or consequences],
                        "magic_impact" : [Generated Impact on society and daily life]
                    }},
                    
                    "residents" : {{
                        "key_characters" : [Generated Key characters associated with the location],
                        "influential_figures" : [Generated Influential historical figures or legends],
                        "prominent_families" : [Generated Prominent families, leaders, or public figures]
                    }},
                    
                    "surroundings" : {{
                        "neighboring_areas" : [Generated Neighboring cities, towns, or territories],
                        "relationships_with_surroundings" : [Generated Relationship with surrounding 
                        areas (allies, rivals, etc.)],
                        "trade_and_travel" : [Generated Trade routes or travel between locations],
                        "geographic_barriers" : [Generated Geographic barriers or boundaries]
                    }},
                    
                    "sensory" : {{
                        "sights" : [Generated Sights (architecture, landscapes, etc.)],
                        "sounds" : [Generated Sounds (ambient noises, languages, etc.)],
                        "smells" : [Generated Smells (spices, vegetation, etc.)],
                        "tastes" : [Generated Tastes (local cuisine, drinks, etc.)],
                        "textures" : [Generated Textures (materials, surfaces, etc.)]
                    }},
                    
                    "conflicts_threats" : {{
                        "conflict_sources" : [Generated Potential sources of conflict 
                                          (political, social, environmental, etc.)],
                        "rivals_or_enemies" : [Generated Rivals, enemies, or opposing factions],
                        "natural_disasters" : [Generated Natural disasters or environmental challenges],
                        "supernatural_threats" : [Generated Supernatural or magical threats (if applicable)]
                    }},
                    
                    "physical_attributes" : {{
                        "detailed_descriptions" : [Generated Detailed descriptions of buildings, 
                                                    structures, or landmarks 
                                                  Architectural styles, materials, ornamentation, etc],                                         
                        "natural_formations" : [Generated Natural formations or geological features
                                            Shape, size, composition, textures, unique characteristics],
                        "furniture_and_decor" : [Generated Furniture, decor, and interior design elements
                                            Materials, craftsmanship, symbolic meanings, etc],
                        "artwork_sculptures" : [Generated Artwork, sculptures, or murals
                                                Artistic styles, subject matter, symbolism, etc],
                        "machinery_devices" : [Generated Machinery, devices, or technological artifacts
                                                Design, functionality, inner workings, etc],
                        "weapons_tools" : [Generated Weapons, tools, or everyday objects
                                            Materials, craftsmanship, historical significance, etc],
                        "flora_and_fauna" : [Generated Species, characteristics, unique adaptations, etc.
                                            In this section, you can provide intricate descriptions of the physical 
                                            elements that make up your
                                            setting. This could include architectural details, natural formations, 
                                            artwork, machinery, everyday objects, and even the local flora and fauna. 
                                            The more granular and specific you can be, the
                                            more tangible and vivid your setting will become.]
                    }}            
                
                
                }}
                }}``` 
                
                **Note**
                - Remember, the goal is to create a setting that feels lived-in, rich, and immersive, encouraging
                your readers or audience to fully engage with and invest in the world you've created.
                
             


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
    tags=["Location Generator"],
)


@router.post("/generateLocation")
async def generate_location(request: Request, data: Novel):
    """
    Triggers the task for novel.
    """
    request_payload = data.payload
    location = request_payload.get("locations")

    session_id = data.session_id
    print(f"request:{request}")

    if not request_payload:
        raise HTTPException(detail="No Data provided", status_code=400)

    query = await format_input(request_payload)
    if location:
        print("Coming in location section")
        query = query + f"Locations:{location}"
    name = "location"
    description = "a dictionary of example response"
    result = await generate_llm_response(query, session_id, template, name, description)

    if not result:
        raise HTTPException(detail="Internal Server Error", status_code=500)

    return result
