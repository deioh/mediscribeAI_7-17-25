import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

def create_app():
    # Load environment variables from .env file
    load_dotenv()

    app = Flask(__name__)

    # Configure CORS to be more restrictive
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://medscribe-ai-9.test"]}})

    # Configure Google GenAI
    API_KEY = os.getenv("API_KEY")
    if not API_KEY:
        raise ValueError("API_KEY is not defined in the environment variables.")
    genai.configure(api_key=API_KEY)

    with app.app_context():
        from . import routes

        app.register_blueprint(routes.bp)

    return app
