import streamlit as st
from openai_lib import generate_novel_response
import json

st.header("Novel Craft")
input_text = st.text_area("Input")
session_id = st.text_input("session id ")
output = None
if st.button("Submit"):
    # data = json.loads(input_text)
    # session_id = "XYZ"
    # chapters = data.get("story")["genre"]["totalChapters"]
    # print(chapters)
    output = generate_novel_response(input_text, session_id, 4)
    # print(output)

if output:
    st.write(output)

# """
# Function for testing display.
# """
# import asyncio
#
# from openai_lib import main
#
#
# async def async_main(data, session_id):
#     """
#     Testing..
#     """
#
#     while True:
#         output = await main(data, session_id)
#         st.write(output)
#         if "continue generation" in output:
#             data = {"question": "continue generation"}
#         else:
#             break
#
#
# def run_async_main():
#     """
#     testing..
#     """
#
#     loop = asyncio.new_event_loop()
#     asyncio.set_event_loop(loop)
#     loop.run_until_complete(async_main(data, session_id))
#
#
# st.sidebar.header("Session ID")
# session_id = st.sidebar.text_input("Session ID")
# st.header("Novel Creaftery")
#
# input_text = st.text_area("Input")
#
# if st.button("Submit"):
#     data = input_text
#     run_async_main()
