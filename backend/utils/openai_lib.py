"""
Returns llm response.
"""
import os

from dotenv import load_dotenv
# from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.output_parsers import ResponseSchema, StructuredOutputParser
from langchain.prompts import PromptTemplate, ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import (ChatPromptTemplate, HumanMessagePromptTemplate,
                               MessagesPlaceholder,
                               SystemMessagePromptTemplate)

load_dotenv()

key = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(api_key=key, model="gpt-4-0125-preview", temperature = 0.4)

memory_dict = {}


async def generate_llm_response(user_input, session_id, template, name, description):
    """
    Returns response from llm.
    """
    print(memory_dict)
    response_schemas = [
        ResponseSchema(
            name=name, description=description
        )
    ]

    output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
    format_instructions = output_parser.get_format_instructions()

    if session_id not in memory_dict:
        memory_dict[session_id] = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )
        memory = memory_dict[session_id]
    else:
        memory = memory_dict[session_id]

    prompt = PromptTemplate(
        template=template,
        input_variables=["user_input"],
        partial_variables={"format_instructions": format_instructions},
        memory = memory
    )

    chain = prompt | llm | output_parser
    x = chain.invoke({"user_input": user_input})

    return x


def generate_novel_response(user_input, session_id, chapter_number):
    """
    Returns response from llm.
    """
    # print(len(user_input))

    if session_id not in memory_dict:
        memory_dict[session_id] = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )
        memory = memory_dict[session_id]
    else:
        memory = memory_dict[session_id]

    # template =      """ 
    #                 **Role:**
    #                 - Embody the persona of "Skilled Novelist," a friendly assistant dedicated to crafting novel for users.
    #                 - Your creative journey begins with user-provided input in JSON format, detailing novel settings.
    #                 - Maintain the defined tone of a virtual skilled novelist.

    #                 <User Question> Question: {user_input} </User Question>
                
    #                 ### Let do it step by step ###

    #                 1. **Develop a gripping plot** with clear conflicts, tension, and resolution.
    #                 2. **Create complex characters** with relatable motivations and growth arcs.
    #                 3. **Describe vivid settings** using sensory detail to immerse readers in your world.
    #                 4. **Maintain consistent pacing** with a balance of action and reflection.
    #                 5. **Edit and revise thoroughly** for clarity, coherence, and impact.
                    
    #                 ## Be coherent and remember your previous response.

    #                 **Output:**
    #                 - Generate a whole chapter {chapter_number} as instructed in input.
    #                 - Output should contain Chapter Title.
    #                 - Output should be in markdown format.
    #                 - If output is in-completed, add line at the end 'continue generating' otherwise don't add.
    #                 - Chapter should contain at least 15 paragraphs.
    #                 - The paragraphs should contain extensive details.

    #                 """
    # prompt = ChatPromptTemplate.from_template(
    #     template=template,
    #     memory=memory
    # )
    # chain = prompt | llm

    ####

    prompt_rough = ChatPromptTemplate(
        messages=[
            SystemMessagePromptTemplate.from_template(
                """
                **Role:**
                - Embody the persona of "Skilled Novelist," a friendly assistant dedicated to crafting novel for users.
                - Your creative journey begins with user-provided input in JSON format, detailing novel settings.
                - Maintain the tone of a virtual skilled novelist.

                ## User input Order Instructions ##
                - At first you will receive a json representation of instructions defined to generate the novel for user.
                - After that you will receive instruction of printing novel chapter in order wise.

                ### Follow the steps to craft good Novel. ###

                1. **Develop a gripping plot** with clear conflicts, tension, and resolution.
                2. **Create complex characters** with relatable motivations and growth arcs.
                3. **Describe vivid settings** using sensory detail to immerse readers in your world.
                4. **Maintain consistent pacing** with a balance of action and reflection.
                5. **Edit and revise thoroughly** for clarity, coherence, and impact.


                
                


                **Output:**
                -Generate a whole novel chapter wise with coherent flow along the chapters.
                - DO NOT add scenes in chapters.
                -Your output should be in markdown format.
                
                


                """
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{question}"),
        ]
    )
    conversation = LLMChain(
        llm=llm,
        prompt=prompt_rough,
        verbose=False,
        memory=memory,
    )

    final_user_input =f"""
                Following are the settings for Novel you Need to generate.
                Understand it carfully and Output of total {chapter_number} Chapters and maintain the coherence between chapters.
                Generate first chapter.

                Settings = {user_input}

                """

    # conversation.invoke({"question": user_input})


    ####

    final_response = ""
    previous_chapter = []
    chapters = {}


    conversation.invoke({"question": final_user_input})

    print("--------------------------------")
    print(memory.buffer[-1].content)
    print("--------------------------------")
    chapters["chapter 1"] = memory.buffer[-1].content

    for i in range(2,chapter_number+1):
            
        final_user_input = f"Generate chapter {i}"
        conversation.invoke({"question": final_user_input})

        chapters[f"chapter {i}"] = memory.buffer[-1].content

        print("--------------------------------")
        print(memory.buffer[-1].content)
        print("--------------------------------")

    return chapters
   
        

    # for i in range(chapter_number):
    #     conversation.invoke({"question": final_user_input})
    #     print("--------------------------------")
    #     print(memory.buffer[-1].content)
    #     print("--------------------------------")
    #     final_user_input = f"Generate chapter {i+2}"
    #     chapters[f"chapter {i+1}"] = memory.buffer[-1].content
    #     if "--CONTINUE GENERATION--" in memory.buffer[-1].content :
    #         conversation.invoke({"question": f"Continue Generating chapter {i+1} remaining content"})

    #         print("--------------------------------")
    #         print(f"Continue Generating chapter {i+1} remaining content")
    #         print("--------------------------------")

    #         print("--------------------------------")
    #         print(memory.buffer[-1].content)
    #         print("--------------------------------")
    #         chapters[f"chapter {i+1}"] += memory.buffer[-1].content
    #     print("--------------------------------")
    #     print(f"Generate chapter {i+2}")
    #     print("--------------------------------")
       

            



        # if previous_chapter:
        #     x = chain.invoke({"user_input": user_input, "chapter_number" : i+1, "previous_chapter" : previous_chapter[-1]})
        #     response_content = x.content.strip()
        # else:
        #     x = chain.invoke({"user_input": user_input, "chapter_number" : i+1, "previous_chapter" : ""})
        #     response_content = x.content.strip()
        #     previous_chapter.append(response_content)
        # if "continue generating" in response_content:
        #     final_response += response_content.replace("continue generating", "Generate next chapter")
        # else:
        #     final_response += response_content + "\n"

    


# async def generate_synopsis_response(user_input, session_id):
#     """
#     Returns response from llm.
#     """
#
#     response_schemas = [
#         ResponseSchema(
#             name="synopsis",
#             description="a dictionary of example response with a nested key of synopsis.",
#         )
#     ]
#
#     output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
#     format_instructions = output_parser.get_format_instructions()
#
#     if session_id not in memory_dict:
#         memory_dict[session_id] = ConversationBufferMemory(
#             memory_key="chat_history", return_messages=True
#         )
#         memory = memory_dict[session_id]
#     else:
#         memory = memory_dict[session_id]
#
#     print(memory)
#     prompt = PromptTemplate(
#         template=template,
#         input_variables=["user_input"],
#         partial_variables={"format_instructions": format_instructions},
#     )
#
#     chain = prompt | llm | output_parser
#     x = chain.invoke({"user_input": user_input})
#
#     return x
#
#
# async def generate_list_response(user_input, session_id):
#     """
#     Returns response from llm.
#     """
#
#     response_schemas = [
#         ResponseSchema(
#             name="character_details",
#             description="a list of dictionary of example response",
#         )
#     ]
#
#     output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
#     format_instructions = output_parser.get_format_instructions()
#
#     if session_id not in memory_dict:
#         memory_dict[session_id] = ConversationBufferMemory(
#             memory_key="chat_history", return_messages=True
#         )
#         memory = memory_dict[session_id]
#     else:
#         memory = memory_dict[session_id]
#
#     print(memory)
#     prompt = PromptTemplate(
#         template=template,
#         input_variables=["user_input"],
#         partial_variables={"format_instructions": format_instructions},
#     )
#
#     chain = prompt | llm | output_parser
#     x = chain.invoke({"user_input": user_input})
#
#     return x


#
#
# def main(user_input, session_id):
#     try:
#         session_memory = get_or_create_memory_for_session(session_id)
#     except:
#         print("session issues")
#     try:
#         output = initial_chat(user_input, session_memory)
#
#         print(output)
#         return output
#     except Exception as e:
#         output = {"error": "Something Went Wrong ....", "code": "500"}
#         return output
#
#
# x = {
#     "Story_Title": "The Enigma of Elysium",
#     "Author_Name": "Eleanor Wells",
#     "Story_Details": {
#         "Details": "A gripping tale of mystery and adventure set in a futuristic dystopia
#         where humanity's fate hangs in the balance.",
#         "Specify_Idea": "The protagonist, a skilled hacker,
#         embarks on a perilous journey to uncover the truth behind a powerful corporation's sinister agenda.",
#         "Story_Structure": "The story follows a classic hero's journey arc,
#         with the protagonist facing escalating challenges and
#         moral dilemmas as they navigate the treacherous landscape of Elysium.",
#     },
#     "Synopsis": "In the sprawling metropolis of Elysium,
#     a shadowy corporation holds sway over society,
#     manipulating minds and controlling destinies.
#     When a young hacker stumbles upon a dark secret,
#     she becomes embroiled in a dangerous game of cat and mouse,
#     where the stakes are nothing less than the future of humanity.",
#     "Characters_Details": [
#         {
#             "Name": "Aria Reynolds",
#             "Role": "Protagonist",
#             "Description": "A skilled hacker with a sharp wit and a fierce determination to uncover the truth.",
#         },
#         {
#             "Name": "Elijah Stone",
#             "Role": "Antagonist",
#             "Description": "The enigmatic CEO of Elysium Corporation, whose ambitions know no bounds.",
#         },
#         {
#             "Name": "Dr. Maya Chen",
#             "Role": "Ally",
#             "Description": "A brilliant scientist who aids Aria in her quest,
#             risking everything for the greater good.",
#         },
#     ],
#     "World_Generation": {
#         "Introduction": "Elysium is a sprawling megacity teeming with life,
#         yet hiding dark secrets beneath its gleaming facade.",
#         "History": "Decades of corporate dominance have reshaped society,
#         creating vast disparities in wealth and power.",
#         "Geography": "From towering skyscrapers to sprawling slums,
#         Elysium is a study in contrasts, where the line between utopia and dystopia blurs.",
#     },
#     "Outline": {
#         "Chapter_1": "Aria's ordinary life is shattered
#         when she uncovers a disturbing truth about Elysium Corporation.",
#         "Chapter_2": "With the help of Dr. Chen,
#         Aria delves deeper into the corporation's secrets, uncovering a web of lies and deception.",
#         "Chapter_3": "As tensions rise and danger looms,
#         Aria must confront her own fears and doubts, forging alliances and facing betrayals along the way.",
#         "Chapter_4": "The final showdown between Aria and Elijah Stone,
#         where the fate of Elysium hangs in the balance.",
#     },
#     "Settings": {
#         "Writing_Style": "The writing style is fast-paced and immersive,
#         drawing readers into the heart of the action.",
#         "Narrative_Style": "The narrative unfolds through multiple perspectives,
#         offering insights into the minds of both heroes and villains.",
#         "Character_POV": "The story primarily follows Aria's perspective,
#         but occasionally shifts to other key characters to provide a broader view of events.",
#         "Tone": "The tone is dark and gritty, reflecting the harsh realities of life in a dystopian society.",
#         "Chapters_in_Outline": 4,
#         "Chapters_Prologue": "The prologue sets the stage for the story,
#         introducing key themes and foreshadowing events to come.",
#     },
# }

# print(initial_chat(x,"asd"))

# import asyncio
# async def example_async_function():
#     # Call the format_input function without using await
#
#     result = await initial_chat(x, "asd")
#     print(result)
#
# asyncio.run(example_async_function())
