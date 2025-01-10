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

