export const characterDetails = [
  {
    id: "basic_info",
    label: "Basic Information",
    placeholder: "Name, age, date of birth, gender, nationality, etc.",
  },
  {
    id: "physical_description",
    label: "Physical Description",
    placeholder: "Height, weight, build, hair color/style, skin tone, etc.",
  },
  {
    id: "personality",
    label: "Personality",
    placeholder: "Strengths, weaknesses, likes, dislikes, etc.",
  },
  {
    id: "relationships",
    label: "Relationships",
    placeholder: "Family, friends, romantic interests, etc.",
  },
  {
    id: "background",
    label: "Background/History",
    placeholder: "Childhood, adulthood, how past events have shaped them, etc.",
  },
  {
    id: "skill_and_abilities",
    label: "Skills and Abilities",
    placeholder: "Physical skills, Intellectual skills, social skills etc.",
  },
  {
    id: "role",
    label: "Role in the story",
    placeholder: "Main goal, internal conflict, external conflict, etc.",
  },
  {
    id: "miscellaneous",
    label: "Miscellaneous",
    placeholder: "Favourite food, favourite music etc.",
  },
];

export const worldDetails = [
  {
    id: "introduction",
    label: "Introduction",
    placeholder: "Brief overview of the concept or premise",
  },
  {
    id: "history",
    label: "History",
    placeholder:
      "Origins and evolution of the central concept/power/magic system",
  },
  {
    id: "geography",
    label: "Geography",
    placeholder: "Detailed map of the world",
  },
  {
    id: "cultures_and_societies",
    label: "Cultures and Societies",
    placeholder: "Customs, traditions, and belief systems",
  },
  {
    id: "arts_and_entertainment",
    label: "Arts and Entertainment",
    placeholder: "Impact of the central concept on arts and entertainment",
  },
  {
    id: "institutions_and_organizations",
    label: "Institutions and Organizations",
    placeholder: "Schools, academies, guilds, or governing bodies",
  },
  {
    id: "conflict_and_politics",
    label: "Conflict and Politics",
    placeholder:
      "Political landscape and power struggles, Key conflicts and tensions",
  },
  {
    id: "economy_and_trade",
    label: "Economy and Trade",
    placeholder: "Economic systems and influence of the central concept",
  },
  {
    id: "language_and_communication",
    label: "Language and Communication",
    placeholder: "Linguistic diversity and communication methods",
  },
  {
    id: "mythology_and_legends",
    label: "Mythology and Legends",
    placeholder: "Myths, legends, and folklore surrounding the central concept",
  },
  {
    id: "interactions_with_mundane",
    label: "Interactions with the Mundane",
    placeholder: "Discrimination, fear, or awe towards exceptional individuals",
  },
  {
    id: "unique_quality",
    label: "Magical Systems/Powers/Technology",
    placeholder: "Sources, rules, and limitations",
  },
  {
    id: "character_arcs",
    label: "Character Arcs",
    placeholder:
      "In-depth character arcs for main characters and supporting cast",
  },
  {
    id: "themes",
    label: "Themes",
    placeholder:
      "Central themes to be explored, Integration of themes into the narrative",
  },
  {
    id: "conclusion",
    label: "Conclusion",
    placeholder: "Summary of key elements",
  },
  {
    id: "additional_resources",
    label: "Appendices and Additional Resources",
    placeholder: "Glossaries, timelines, character profiles",
  },
];

export const settingsDetails = [
  {
    id: "writing_style",
    label: "Writing Style",
    placeholder: "Please enter the writing style",
    type: "input",
  },
  {
    id: "narrative_style",
    label: "Narrative Style",
    placeholder: "Please enter the narrative style",
    type: "input",
  },
  {
    id: "character_pov",
    label: "Character POV",
    placeholder:
      "Please enter the character pov. (Character Name: POV the story is to be told)",
    type: "input",
  },
  {
    id: "tone",
    label: "Tone",
    placeholder: "Please specify the tone of the story",
    type: "input",
  },
  {
    id: "outline_chapters",
    label: "Chapters in the Outline",
    placeholder: "Please specify the chapters in the story. (In digits)",
    type: "input",
  },
  {
    id: "chapter_prologue",
    label: "Chapter Prologue",
    placeholder:
      "Chapter 1 - A curious letter:Christine has a rough day at work, her coworkers ... Chapter 2 - The man in black: Christine goes to the bar with her friends ...",
    type: "textarea",
  },
];

export const storyStructures = [
  "Three-Act Structure",
  "Hero's Journey",
  "Dan Harmon’s Story Circle",
  "Tragic Plot Embryo",
  "Freytag’s Pyramid",
  "Five-Act Structure",
  "Fichtean Curve",
  "Save the Cat Beat Sheet",
  "A Disturbance and Two Doorways",
  "Seven-Point Structure",
  "Snowflake Method",
  "Kishōtenketsu Structure",
  "Red Herring Structure",
  "Story Spine",
  "In Medias Res",
  "Eight-Point Arc",
  "22-Step Story Structure",
  "Nine-Act Structure (2-Act Structure)",
  "Sequential Narrative",
  "Branching Narrative",
  "Nested Loop Structure",
  "Frame Narrative (Frame Story)",
  "Episodic Structure",
  "Objective Narrative Structure",
  "Parallel Narrative Structure",
  "Circular Story Structure",
  "Nonlinear Narrative",
  "The Nine-Sequence Structure",
];

export const locationDetails = [
  {
    categoryLabel: "General Description",
    categoryId: "description",
    fields: [
      {
        name: "geographic_location",
        label: "Geographic Location",
        placeholder: "Continent, region, etc.",
      },
      {
        name: "topography",
        label: "Topography",
        placeholder: "Mountains, forests, deserts, etc.",
      },
      {
        name: "climate",
        label: "Climate and Weather Patterns",
        placeholder: "Weather patterns, climate conditions, etc.",
      },
      {
        name: "landmarks",
        label: "Notable Natural Landmarks or Features",
        placeholder: "Famous landmarks, natural wonders, etc.",
      },
    ],
  },
  {
    categoryLabel: "History and Background",
    categoryId: "history_background",
    fields: [
      {
        name: "origin_and_founding",
        label: "Origin and Founding",
        placeholder: "History of establishment, founding events, etc.",
      },
      {
        name: "historical_events",
        label: "Significant Historical Events",
        placeholder: "Key historical moments, milestones, etc.",
      },
      {
        name: "cultural_significance",
        label: "Cultural or Mythological Significance",
        placeholder: "Cultural importance, myths, legends, etc.",
      },
      {
        name: "legends_or_folklore",
        label: "Legends or Folklore",
        placeholder: "Popular myths, legends, folklore, etc.",
      },
    ],
  },
  {
    categoryLabel: "Architecture and Infrastructure",
    categoryId: "architecture_infrastructure",
    fields: [
      {
        name: "architectural_style",
        label: "Overall Architectural Style and Influences",
        placeholder: "Architectural styles, influences, etc.",
      },
      {
        name: "notable_buildings",
        label: "Notable Buildings, Structures, or Landmarks",
        placeholder: "Famous buildings, landmarks, etc.",
      },
      {
        name: "transportation_systems",
        label: "Transportation Systems",
        placeholder: "Roads, canals, public transit, etc.",
      },
      {
        name: "defensive_structures",
        label: "Defensive Structures",
        placeholder: "Walls, fortifications, etc.",
      },
    ],
  },
  {
    categoryLabel: "Population and Demographics",
    categoryId: "population_demographics",
    fields: [
      {
        name: "population_size",
        label: "Approximate Population Size",
        placeholder: "Total population count, estimates, etc.",
      },
      {
        name: "racial_ethnic_diversity",
        label: "Racial or Ethnic Diversity",
        placeholder: "Demographic diversity, ethnic groups, etc.",
      },
      {
        name: "social_classes",
        label: "Social Classes or Hierarchies",
        placeholder: "Social hierarchy, classes, etc.",
      },
      {
        name: "prominent_groups",
        label: "Prominent Families, Clans, or Groups",
        placeholder: "Well-known families, clans, groups, etc.",
      },
    ],
  },
  {
    categoryLabel: "Government and Politics",
    categoryId: "government_politics",
    fields: [
      {
        name: "government_system",
        label: "System of Government",
        placeholder: "Monarchy, republic, governance structure, etc.",
      },
      {
        name: "ruling_bodies",
        label: "Ruling Bodies or Leaders",
        placeholder: "Government bodies, leaders, etc.",
      },
      {
        name: "laws_and_regulations",
        label: "Laws and Regulations",
        placeholder: "Legal framework, regulations, etc.",
      },
      {
        name: "political_tensions",
        label: "Political Factions or Tensions",
        placeholder: "Political factions, tensions, etc.",
      },
    ],
  },
  {
    categoryLabel: "Economy and Trade",
    categoryId: "economy_trade",
    fields: [
      {
        name: "primary_industries",
        label: "Primary Industries and Exports",
        placeholder: "Main industries, exports, etc.",
      },
      {
        name: "trade_routes",
        label: "Trade Routes and Partnerships",
        placeholder: "Routes, trade partnerships, etc.",
      },
      {
        name: "market_districts",
        label: "Market Districts or Commercial Hubs",
        placeholder: "Key market areas, commercial centers, etc.",
      },
      {
        name: "currency_system",
        label: "Currency and Economic Systems",
        placeholder: "Type of currency, economic systems, etc.",
      },
    ],
  },
  {
    categoryLabel: "Culture and Society",
    categoryId: "culture_society",
    fields: [
      {
        name: "dominant_religions",
        label: "Dominant Religions or Belief Systems",
        placeholder: "Main religions, belief systems, etc.",
      },
      {
        name: "customs_and_traditions",
        label: "Customs, Traditions, and Rituals",
        placeholder: "Cultural customs, traditions, rituals, etc.",
      },
      {
        name: "arts_and_entertainment",
        label: "Arts, Entertainment, and Leisure Activities",
        placeholder: "Art forms, entertainment, leisure activities, etc.",
      },
      {
        name: "education_system",
        label: "Education and Intellectual Pursuits",
        placeholder: "Education system, intellectual pursuits, etc.",
      },
    ],
  },
  {
    categoryLabel: "Magic/Powers/Technology",
    categoryId: "powers",
    fields: [
      {
        name: "magic_prevalence",
        label: "Prevalence and Role of Magic, Powers, or Technology",
        placeholder: "Extent of magic/tech, roles, etc.",
      },
      {
        name: "magic_institutions",
        label: "Institutions, Guilds, or Organizations",
        placeholder: "Magic guilds, organizations, etc.",
      },
      {
        name: "magic_limitations",
        label: "Limitations, Rules, or Consequences",
        placeholder: "Limits, rules, consequences of magic, etc.",
      },
      {
        name: "magic_impact",
        label: "Impact on Society and Daily Life",
        placeholder: "Societal impact, daily life effects, etc.",
      },
    ],
  },
  {
    categoryLabel: "Notable Residents",
    categoryId: "residents",
    fields: [
      {
        name: "key_characters",
        label: "Key Characters Associated with the Location",
        placeholder: "Important characters, residents, etc.",
      },
      {
        name: "influential_figures",
        label: "Influential Historical Figures or Legends",
        placeholder: "Historical figures, legends, etc.",
      },
      {
        name: "prominent_families",
        label: "Prominent Families, Leaders, or Public Figures",
        placeholder: "Well-known families, leaders, figures, etc.",
      },
    ],
  },
  {
    categoryLabel: "Surrounding Areas",
    categoryId: "surroundings",
    fields: [
      {
        name: "neighboring_areas",
        label: "Neighboring Cities, Towns, or Territories",
        placeholder: "Adjacent areas, territories, etc.",
      },
      {
        name: "relationships_with_surroundings",
        label: "Relationship with Surrounding Areas",
        placeholder: "Allies, rivals, etc.",
      },
      {
        name: "trade_and_travel",
        label: "Trade Routes or Travel between Locations",
        placeholder: "Trading routes, travel paths, etc.",
      },
      {
        name: "geographic_barriers",
        label: "Geographic Barriers or Boundaries",
        placeholder: "Natural barriers, boundaries, etc.",
      },
    ],
  },
  {
    categoryLabel: "Sensory Details",
    categoryId: "sensory",
    fields: [
      {
        name: "sights",
        label: "Sights",
        placeholder: "Visual descriptions, landmarks, etc.",
      },
      {
        name: "sounds",
        label: "Sounds",
        placeholder: "Auditory experiences, languages, etc.",
      },
      { name: "smells", label: "Smells", placeholder: "Aromas, scents, etc." },
      {
        name: "tastes",
        label: "Tastes",
        placeholder: "Flavors, local cuisine, etc.",
      },
      {
        name: "textures",
        label: "Textures",
        placeholder: "Tactile sensations, materials, etc.",
      },
    ],
  },
  {
    categoryLabel: "Potential Conflicts or Threats",
    categoryId: "conflicts_threats",
    fields: [
      {
        name: "conflict_sources",
        label: "Potential Sources of Conflict",
        placeholder: "Political, social, environmental, etc.",
      },
      {
        name: "rivals_or_enemies",
        label: "Rivals, Enemies, or Opposing Factions",
        placeholder: "Competitors, adversaries, etc.",
      },
      {
        name: "natural_disasters",
        label: "Natural Disasters or Environmental Challenges",
        placeholder: "Disasters, environmental threats, etc.",
      },
      {
        name: "supernatural_threats",
        label: "Supernatural or Magical Threats",
        placeholder: "Magical dangers, supernatural threats, etc.",
      },
    ],
  },
  {
    categoryLabel: "Physical Attributes and Items",
    categoryId: "physical_attributes",
    fields: [
      {
        name: "detailed_descriptions",
        label: "Detailed Descriptions of Buildings, Structures, or Landmarks",
        placeholder: "Architectural styles, materials, ornamentation, etc.",
      },
      {
        name: "natural_formations",
        label: "Natural Formations or Geological Features",
        placeholder:
          "Shape, size, composition, textures, unique characteristics",
      },
      {
        name: "furniture_and_decor",
        label: "Furniture, Decor, and Interior Design Elements",
        placeholder: " Materials, craftsmanship, symbolic meanings, etc.",
      },
      {
        name: "artwork_sculptures",
        label: "Artwork, Sculptures, or Murals",
        placeholder: "Artistic styles, subject matter, symbolism, etc.",
      },
      {
        name: "machinery_devices",
        label: "Machinery, Devices, or Technological Artifacts",
        placeholder: "Design, functionality, inner workings, etc. ",
      },
      {
        name: "weapons_tools",
        label: "Weapons, Tools, or Everyday Objects",
        placeholder: "Materials, craftsmanship, historical significance, etc",
      },
      {
        name: "flora_and_fauna",
        label: "Flora and Fauna",
        placeholder: "Species, characteristics, unique adaptations, etc.",
      },
    ],
  },
];
