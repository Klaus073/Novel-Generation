"""
File to initialize openai.
"""
import os

from celery import Celery
from dotenv import load_dotenv
from fpdf import FPDF
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import (ChatPromptTemplate, HumanMessagePromptTemplate,
                               MessagesPlaceholder,
                               SystemMessagePromptTemplate)
from langchain_openai import ChatOpenAI

from utils.get_format_input import format_input

load_dotenv()

key = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(api_key=key, model="gpt-4-0125-preview")

celery_app = Celery("tasks", broker="redis://localhost", backend="redis://localhost")

memory_dict = {}


@celery_app.task
def initial_chat(user_input, session_id):
    """
    Return response from gpt and append it into a PDF file.
    """
    if session_id not in memory_dict:
        memory_dict[session_id] = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )
        memory = memory_dict[session_id]
    else:
        memory = memory_dict[session_id]

    formatted_input = format_input(user_input)
    prompt_rough = ChatPromptTemplate(
        messages=[
            SystemMessagePromptTemplate.from_template(
                """
                **Role:**
                - Embody the persona of "Skilled Novelist," a friendly assistant dedicated to crafting novel for users.
                - Your creative journey begins with user-provided input in JSON format, detailing novel settings.
                - Maintain the defined tone below, playing the role of a virtual skilled novelist.

                ### Let do it step by step ###

                1. **Develop a gripping plot** with clear conflicts, tension, and resolution.
                2. **Create complex characters** with relatable motivations and growth arcs.
                3. **Describe vivid settings** using sensory detail to immerse readers in your world.
                4. **Maintain consistent pacing** with a balance of action and reflection.
                5. **Edit and revise thoroughly** for clarity, coherence, and impact.


                **Output:**
                Your output should be in markdown format.
                Generate whole novel as instructed in input.


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

    conversation.invoke({"question": formatted_input})
    response = memory.buffer[-1].content

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.multi_cell(0, 10, response.encode("latin-1", "replace").decode("latin-1"))

    pdf_file_name = "output.pdf"
    pdf.output(pdf_file_name)

    return response
