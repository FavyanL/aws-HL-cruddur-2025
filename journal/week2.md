# Week 2 — Distributed Tracing

Setting up an environment in HONEYCOMB the creating an API Key in the environment 

create enviroment keys for Honeycomb in the repository 
export HONEYCOMB_API_KEY=
gp env HONEYCOMB_API_KEY=

The whole service needs the API key but each piece of it need it's own service name 
to create a service name in the docker compose file and then the backend 
Configuring OTEL= Open Telemetry to send to honeycomb 
Open Telemetry is open source 
Honeycom is not in the could environment, is get info and it stores it for use but not tied to the cloud
      OTEL_SERVICE_NAME: 'backend-flask'
      OTEL_EXPORTER_OTLP_ENDPOINT: "https://api.honeycomb.io"
      OTEL_EXPORTER_OTLP_HEADER: "X-HONEYCOMB-TEAMS=${HONEYCOMB_API_KEY}"

Install the OpenTelemetry Auto Instrumentation package to instrument your application with OpenTelemetry, in the requirements.txt file
Follow instructions on honeycomb to instrument and send data to honeycomb

Modify the app.py file to add custom instrumentation 
Instructions [odocs.honeycomb.io](https://docs.honeycomb.io/send-data/python/opentelemetry-sdk/) and the docker compose up action, fix any typor or issues and ensure the ports work 

Modificatios also to docker compose app 

On honeycomb go to home and you can visualize the data 
go to query and you can filter by duration or percent of fastest request 
