FROM python:3.10-slim-buster

WORKDIR /backend-flask

COPY requirements.txt requirements.txt

#install container 
#install the python libraries used for the app
RUN pip3 install -r requirements.txt 

# Outside container > inside container 
# . means everything in the current directory 
# first period . -/backend-flask(outside-container)
# second period . /backend-flask (inside container)
COPY . . 

#set environment variables (ENV Vars) inside the container and will remain set when container runs 
ENV FLASK_ENV=development 

#CMD is the command 
#python 3 -m flask run --host=0.0.0.0 --port=4567
EXPOSE ${PORT}
CMD [ "python3", "-m" , "flask" , "run" , "--host=0.0.0.0" , "port=4567" ]