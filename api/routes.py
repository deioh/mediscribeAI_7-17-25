import os
from flask import Blueprint, request, Response
import google.generativeai as genai

bp = Blueprint('api', __name__, url_prefix='/api')

MODEL_NAME = os.getenv("MODEL_NAME", "gemini-1.5-flash-latest")

@bp.route("/generate", methods=["POST"])
def generate_note():
    try:
        data = request.json
        if not data:
            return Response("Invalid JSON", status=400)

        shorthand = data.get("shorthand")
        mode = data.get("mode")

        if not shorthand or not mode:
            return Response("Missing shorthand or mode in request body", status=400)

        expand_instruction = """As a medical transcriptionist, expand the user's clinical shorthand into a full, professional patient note. Format the note into sections (e.g., History, Complaint, Plan), correct obvious typos, and maintain a neutral clinical tone. Do not add information not present in the shorthand."""
        summarize_instruction = """You are a medical assistant summarizing a clinician's shorthand. Your task is to synthesize the shorthand into a concise, narrative paragraph. Use complete sentences and a professional, clinical tone. Do NOT use bullet points, markdown formatting, or any descriptive headers."""

        system_instruction = expand_instruction if mode == "expand" else summarize_instruction

        model = genai.GenerativeModel(
            model_name=MODEL_NAME,
            system_instruction=system_instruction
        )

        # Start streaming response
        def generate():
            try:
                response_stream = model.generate_content(
                    shorthand,
                    stream=True
                )
                for chunk in response_stream:
                    if chunk.text:
                        yield chunk.text
            except Exception as e:
                print(f"[server] Error during '/api/generate' stream: {e}")
                yield "Error generating response."

        return Response(generate(), mimetype='text/plain; charset=utf-8')

    except Exception as e:
        print(f"[server] An error occurred: {e}")
        return Response("An error occurred while generating the note.", status=500)
