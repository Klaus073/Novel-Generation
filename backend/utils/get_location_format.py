"""
Returns formatted location.
"""


# pylint: disable=R0914
async def format_location(location_data):
    """
    Returns formatted location.
    """
    name = location_data.get("name", "")
    description = location_data.get("description", "")
    history_background = location_data.get("history_background", "")
    architecture_infrastructure = location_data.get("architecture_infrastructure", "")
    population_demographics = location_data.get("population_demographics", "")
    government_politics = location_data.get("government_politics", "")
    economy_trade = location_data.get("economy_trade", "")
    culture_society = location_data.get("culture_society", "")
    powers = location_data.get("powers", "")
    residents = location_data.get("residents", "")
    surroundings = location_data.get("surroundings", "")
    sensory = location_data.get("sensory", "")
    conflicts_threats = location_data.get("conflicts_threats", "")
    physical_attributes = location_data.get("physical_attributes", "")
    species_characteristics = location_data.get("species_characteristics", "")

    formatted_location = (
        f"Name: {name}\n"
        f"Description: {description}\n"
        f"History and Background: {history_background}\n"
        f"Architecture and Infrastructure: {architecture_infrastructure}\n"
        f"Population and Demographics: {population_demographics}\n"
        f"Government and Politics: {government_politics}\n"
        f"Economy and Trade: {economy_trade}\n"
        f"Culture and Society: {culture_society}\n"
        f"Powers: {powers}\n"
        f"Residents: {residents}\n"
        f"Surroundings: {surroundings}\n"
        f"Sensory Experience: {sensory}\n"
        f"Conflicts and Threats: {conflicts_threats}\n"
        f"Physical Attributes: {physical_attributes}\n"
        f"Species Characteristics: {species_characteristics}\n"
    )

    return formatted_location
