from typing import Union
from fastapi import FastAPI
import razorpay
import json
from fastapi.middleware.cors import CORSMiddleware
import uuid
import g4f

app = FastAPI()
g4f.debug.logging = True  # Enable debug logging
g4f.debug.version_check = False  # Disable automatic version checking
print(g4f.Provider.Bing.params)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# razorpay test keys
client = razorpay.Client(
    auth=("rzp_test_9ZmmKs5tcL0Yap", "yo7Jye50bw2GZv3ze0OrOFQA"))


@app.get("/api")
def read_root():
    return {"Hello": "World"}


@app.get("/api/createOrder")
def createOrder(amount):

    res = client.order.create({
        "amount": amount,
        "currency": "INR",
        "receipt": str(uuid.uuid4()),
    })
    print(res)
    return json.dumps(res)


@app.get('/api/ask')
def askQuestion(question, tags):
    message = f"here is a question:{question}, recommend me which category of medicine should i take, below are the categories \n{tags},\n answer in json format and with key 'answer' and its value should be a single suitbale category which you pick, if category is multiple seperate it by commas in the answer, from the tags i've provided"
    print(tags)
    response = g4f.ChatCompletion.create(
        model=g4f.models.dolphin_mixtral_8x7b,
        messages=[
            {"role": "user", "content": message}],

    )
    print(response)
    return response
