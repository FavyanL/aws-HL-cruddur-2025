# Week 1 — App Containerization

Created a docker file (pasted code of docker file )

RUN

run container command
docker run --rm -p 4567:4567 -it backend-flask

After running the port section in the terminal seems to be running and the lock remains locked 
once you hit the link to the URL the website says not found 

then ran the following command but did not run since the variables are not set in the environment 
FRONTEND_URL="*" BACKEND_URL="*" docker run --rm -p 4567:4567 -it backend-flask 

So set the variables by
set FRONTEND_URL="*"
set BACKEND_URL="*"

Then after variables are set run the following command
docker run --rm -p 4567:4567 -it backend-flask -e FRONTEND_URL -e BACKEND_URL

got the following error: docker: Error response from daemon: failed to create task for container: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: "-e": executable file not found in $PATH: unknown.

Therefore we can see it is looking for the file but cant find it, so we need to move the order of the command to indicate the path at the end 
and add the start in single quotes to prevent from it being confused with an index file 
docker run --rm -p 4567:4567 -it -e FRONTEND_URL='*' -e BACKEND_URL='*' backend-flask

But the URL still does not work, so need to add the /api/activities/home
https://4567-favyanl-awsbootcampcrud-iey3hp6yycx.ws-us117.gitpod.io/api/activities/home

Then we need to unset the variables so that they are not active 
unset FRONTEND_URL="*"
unset BACKEND_URL="*"


For the FRONT end:

Go into the front end directory 
Run command : npm i 
to install npm, the create the docker file 


Crea a new yml file names docker-compose.yml
will be used to run both containers that need to work together at the same time

both ports in the front end and back end actually work and the inital page shows on the ports URL

*insert scrreenshot of home page*


now to set up the notifications page:

On the backend: creat a notifications_activities.py file modeled after the home page.py file 
  Go to the app.py file in the back ednfolder and add a notifications @app.route modeled after the home page @app route 

  in the openapi.yml file add the appi path to the notifications page with parameter modeled after home page 

On the front end

create a notifications .svg files under the svg folder 
Create a notifications .js and .css in the pages folder and add notifications import to the app.js file
  
