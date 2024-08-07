"""
A function to return formatted input string.
"""


# pylint: disable=R0914
def format_input(data):
    """
    Returns a formatted string.
    """
    story = data.get("story", {})
    character_details = story.get("character_details", [])
    genre = story.get("genre", {})
    genre_name = genre.get("genre", "")
    sub_genre = genre.get("subGenre", "")
    story_details = story.get("story_details", {})
    brief_details = story_details.get("briefDetails", "")
    specify_idea = story_details.get("specifyIdea", "")
    story_structure = story_details.get("storyStructure", "")
    outlines = story.get("outlines", {})
    story_outline = outlines.get("outlines", "")
    world_details = story.get("world_details", [])
    synopsis = story.get("synopsis", {}).get("synopsis", "")
    settings = story.get("settings", {})
    writing_style = settings.get("writing_style", "")
    narrative_style = settings.get("narrative_style", "")
    character_pov = settings.get("character_pov", "")
    tone = settings.get("tone", "")
    outline_chapters = settings.get("outline_chapters", "")
    chapter_prologue = settings.get("chapter_prologue", "")

    formatted_input = (
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
        + f"\nGenre: {genre_name}\nSubgenre: {sub_genre}\n"
        + f"Story Details:\nBrief Details: {brief_details}\nSpecify Idea: {specify_idea}\n"
          f"Story Structure: {story_structure}\n"
        + f"Outlines: {story_outline}\n"
        + "\n".join(
            [
                f"World Details:\nID: {world.get('id', '')}, Introduction: {world.get('introduction', '')}, "
                f"History: {world.get('history', '')}, Geography: "
                f"{world.get('geography', '')}, Cultures and Societies: {world.get('cultures_and_societies', '')}, "
                f"Arts and Entertainment: {world.get('arts_and_entertainment', '')}, "
                f"Institutions and Organizations: {world.get('institutions_and_organizations', '')}, "
                f"Conflict and Politics: {world.get('conflict_and_politics', '')}, Economy and Trade: "
                f"{world.get('economy_and_trade', '')}, Language and Communication: "
                f"{world.get('language_and_communication', '')}, "
                f"Mythology and Legends: {world.get('mythology_and_legends', '')}, "
                f"Interactions with Mundane: {world.get('interactions_with_mundane', '')}, "
                f"Unique Quality: {world.get('unique_quality', '')}, "
                f"Character Arcs: {world.get('character_arcs', '')}, "
                f"Themes: {world.get('themes', '')}, Conclusion: {world.get('conclusion', '')}, "
                f"Additional Resources: {world.get('additional_resources', '')}"
                for world in world_details
            ]
        )
        + f"\nSynopsis: {synopsis}\n"
        + f"Settings:\nWriting Style: {writing_style}\nNarrative Style: {narrative_style}\nCharacter "
        f"POV: {character_pov}\nTone: {tone}\nOutline Chapters: {outline_chapters}\n"
        f"Chapter Prologue: {chapter_prologue}\n"
    )

    return formatted_input



