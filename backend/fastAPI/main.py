import uvicorn
from os import getenv
from app.api import app 


if(__name__== "__main__"):
    port=int(getenv("PORT",8000))
    uvicorn.run("app.api:app",host="0.0.0.0",port=port, reload=True)