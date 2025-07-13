from app.main import app
import json

def test_recommend():
    client = app.test_client()
    res = client.post('/recommend', json={'mood': 'I feel great'})
    assert res.status_code == 200
    assert 'recommendations' in res.json
