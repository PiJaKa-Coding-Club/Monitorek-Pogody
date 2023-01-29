from django.test import TestCase, Client
import json


class RequestTests(TestCase):
    def setUp(self):
        self.c = Client()

    def test_cities_endpoint_exist(self):
        code = self.c.get("/cities/Wro").status_code
        assert (code == 200)

    def test_return_list_of_cities(self):
        response = self.c.get("/cities/wro")
        cities = json.loads(response.content.decode('utf-8'))
        assert (cities["cities"] == ["Wrocław", "Wronki"])

    def test_empty_list_of_cities(self):
        response = self.c.get("/cities/abhgafgsgds").content
        cities = json.loads(response.decode('utf-8'))
        assert (cities["cities"] == [])

    def test_error_in_getting_list_of_cities(self):
        code = self.c.get("/cities/113").status_code
        assert (code == 400)
