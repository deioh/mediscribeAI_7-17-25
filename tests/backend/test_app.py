import pytest
from api import create_app

@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })
    yield app

@pytest.fixture
def client(app):
    return app.test_client()

def test_health_check(client):
    """A simple test to check if the app is running."""
    response = client.get("/")
    assert response.status_code == 404 # No root route, so 404 is expected
