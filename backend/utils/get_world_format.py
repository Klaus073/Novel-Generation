"""
Returns formatted world details
"""


# pylint: disable=R0914
async def format_world_details(data):
    """
    Returns formatted world details.
    """
    world_data = data.get("world_details", {})
    introduction = world_data.get("introduction", "")
    history = world_data.get("history", "")
    geography = world_data.get("geography", "")
    cultures_and_societies = world_data.get("cultures_and_societies", "")
    arts_and_entertainment = world_data.get("arts_and_entertainment", "")
    institutions_and_organizations = world_data.get(
        "institutions_and_organizations", ""
    )
    conflict_and_politics = world_data.get("conflict_and_politics", "")
    economy_and_trade = world_data.get("economy_and_trade", "")
    language_and_communication = world_data.get("language_and_communication", "")
    mythology_and_legends = world_data.get("mythology_and_legends", "")
    interactions_with_mundane = world_data.get("interactions_with_mundane", "")
    unique_quality = world_data.get("unique_quality", "")
    character_arcs = world_data.get("character_arcs", "")
    themes = world_data.get("themes", "")
    conclusion = world_data.get("conclusion", "")
    additional_resources = world_data.get("additional_resources", "")

    formatted_world_details = (
        f"Introduction: {introduction}\n"
        f"History: {history}\n"
        f"Geography: {geography}\n"
        f"Cultures and Societies: {cultures_and_societies}\n"
        f"Arts and Entertainment: {arts_and_entertainment}\n"
        f"Institutions and Organizations: {institutions_and_organizations}\n"
        f"Conflict and Politics: {conflict_and_politics}\n"
        f"Economy and Trade: {economy_and_trade}\n"
        f"Language and Communication: {language_and_communication}\n"
        f"Mythology and Legends: {mythology_and_legends}\n"
        f"Interactions with Mundane: {interactions_with_mundane}\n"
        f"Unique Quality: {unique_quality}\n"
        f"Character Arcs: {character_arcs}\n"
        f"Themes: {themes}\n"
        f"Conclusion: {conclusion}\n"
        f"Additional Resources: {additional_resources}\n"
    )
    return formatted_world_details
