"""
Router for taking input data and creating novel.
"""

from celery.result import AsyncResult
from fastapi import APIRouter, HTTPException, Request

from models.bot import Novel
from tasks import celery_app, initial_chat
# from utils.openai_lib import generate_novel_response

router = APIRouter(
    prefix="/api",
    tags=["Novel Generator"],
)


@router.post("/generateNovel")
async def generate_novel(request: Request, data: Novel):
    """
    Triggers the task for novel.
    """
    request_payload = data.payload
    session_id = data.session_id
    print(f"request:{request}")

    if not request_payload:
        raise HTTPException(detail="No Data provided", status_code=400)

    result = initial_chat.delay(request_payload, session_id)
    # result = await generate_novel_response(request_payload, session_id)

    return result


@router.get("/result")
async def final_result(task_id: str):
    """
    Returns the result from celery.
    """
    result = AsyncResult(task_id, app=celery_app)
    if result.successful():
        return {"final_result": result.get()}
    elif result.failed():
        raise HTTPException(detail="Internal Server Error", status_code=500)
    else:
        return {"status": result.state}


#
# @celery_app.task
# async def check_output(query, session_id):
#     response = await main(query, session_id)
#     # print(response)
#     if "continue generation" in response:
#         resp = await main(query, session_id)
#         final_respone = response + resp
#         # print(final_respone)
#         return final_respone
