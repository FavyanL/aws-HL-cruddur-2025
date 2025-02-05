from flask import Flask, request
from flask_cors import CORS, cross_origin
import os
import logging 

from services.home_activities import *
from services.notifications_activities import *
from services.user_activities import *
from services.create_activity import *
from services.create_reply import *
from services.search_activities import *
from services.message_groups import *
from services.messages import *
from services.create_message import *
from services.show_activity import *

from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter  # Add this!
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.trace.sampling import ALWAYS_ON 
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor

#X-Ray 
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.ext.flask.middleware import XRayMiddleware
from aws_xray_sdk.core import patch_all

# Initialize Flask app
app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

xray_url = os.getenv("AWS_XRAY_URL")
xray_recorder.configure(service="backend-flask", daemon_address=os.getenv("AWS_XRAY_DAEMON_ADDRESS", "xray-daemon:2000"))
XRayMiddleware(app, xray_recorder)
xray_recorder.configure(context_missing='LOG_ERROR')

patch_all()

xray_recorder.begin_segment('FlaskAppInitialization')

# OpenTelemetry setup
# Load API key
honeycomb_api_key = os.getenv("HONEYCOMB_API_KEY")
if not honeycomb_api_key:
    logger.error("HONEYCOMB_API_KEY environment variable is not set!")
    raise ValueError("HONEYCOMB_API_KEY environment variable is missing!")

# Configure TracerProvider with AlwaysOnSampler
provider = TracerProvider(sampler=ALWAYS_ON)

# Set up OTLP exporter with Honeycomb
otlp_exporter = OTLPSpanExporter(
    endpoint="https://api.honeycomb.io:443/v1/traces",
    headers={"x-honeycomb-team": honeycomb_api_key}
)
provider.add_span_processor(BatchSpanProcessor(otlp_exporter))

# Optional: Add ConsoleSpanExporter for debugging
console_processor = ConsoleSpanExporter()
provider.add_span_processor(BatchSpanProcessor(console_processor))

trace.set_tracer_provider(provider)
tracer = trace.get_tracer(__name__)

# Instrument Flask and requests
FlaskInstrumentor().instrument_app(app)
RequestsInstrumentor().instrument()

# Enable CORS
frontend = os.getenv('FRONTEND_URL')
backend = os.getenv('BACKEND_URL')
origins = [frontend, backend]
cors = CORS(
    app, 
    resources={r"/api/*": {"origins": origins}},
    expose_headers="location,link",
    allow_headers="content-type,if-modified-since",
    methods="OPTIONS,GET,HEAD,POST"
)

@app.route("/")
def home():
    with tracer.start_as_current_span("home-handler"):
        return {"message": "Hello, Honeycomb!"}, 200

@app.route("/api/message_groups", methods=['GET'])
def data_message_groups():
    user_handle = 'andrewbrown'
    model = MessageGroups.run(user_handle=user_handle)
    if model['errors']:
        return model['errors'], 422
    return model['data'], 200

@app.route("/api/messages/@<string:handle>", methods=['GET'])
def data_messages(handle):
    user_sender_handle = 'andrewbrown'
    user_receiver_handle = request.args.get('user_receiver_handle')
    model = Messages.run(user_sender_handle=user_sender_handle, user_receiver_handle=user_receiver_handle)
    if model['errors']:
        return model['errors'], 422
    return model['data'], 200

@app.route("/api/messages", methods=['POST', 'OPTIONS'])
@cross_origin()
def data_create_message():
    user_sender_handle = 'andrewbrown'
    user_receiver_handle = request.json['user_receiver_handle']
    message = request.json['message']
    model = CreateMessage.run(
        message=message, 
        user_sender_handle=user_sender_handle, 
        user_receiver_handle=user_receiver_handle
    )
    if model['errors']:
        return model['errors'], 422
    return model['data'], 200

@app.route("/api/activities/home", methods=['GET'])
def data_home():
    data = HomeActivities.run()
    return data, 200

@app.route("/api/activities/notifications", methods=['GET'])
def data_notifications():
    data = NotificationsActivities.run()
    return data, 200

@app.route("/api/activities/@<string:handle>", methods=['GET'])
def data_handle(handle):
    model = UserActivities.run(handle)
    if model['errors']:
        return model['errors'], 422
    return model['data'], 200

@app.route("/api/activities/search", methods=['GET'])
def data_search():
    term = request.args.get('term')
    model = SearchActivities.run(term)
    if model['errors']:
        return model['errors'], 422
    return model['data'], 200

@app.route("/api/activities", methods=['POST', 'OPTIONS'])
@cross_origin()
def data_activities():
    user_handle = 'andrewbrown'
    message = request.json['message']
    ttl = request.json['ttl']
    model = CreateActivity.run(message, user_handle, ttl)
    if model['errors']:
        return model['errors'], 422
    return model['data'], 200

@app.route("/api/activities/<string:activity_uuid>", methods=['GET'])
def data_show_activity(activity_uuid):
    data = ShowActivity.run(activity_uuid=activity_uuid)
    return data, 200

@app.route("/api/activities/<string:activity_uuid>/reply", methods=['POST', 'OPTIONS'])
@cross_origin()
def data_activities_reply(activity_uuid):
    user_handle = 'andrewbrown'
    message = request.json['message']
    model = CreateReply.run(message, user_handle, activity_uuid)
    if model['errors']:
        return model['errors'], 422
    return model['data'], 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4567, debug=True)

@app.route("/test-xray")
def test_xray():
    try:
        # Ensure segment starts
        segment = xray_recorder.begin_segment('TestSegment')
        subsegment = xray_recorder.begin_subsegment('TestSubsegment')
        subsegment.put_annotation("test", "flask-xray")
        xray_recorder.end_subsegment()
        xray_recorder.end_segment()

        return {"message": "X-Ray Trace Successful"}
    except Exception as e:
        return {"error": str(e)}, 500

