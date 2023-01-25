from datetime import datetime, timezone
from django.http import HttpResponseBadRequest, JsonResponse
from django.http.response import HttpResponseNotFound
from django.shortcuts import render
from .models import Pogoda, ObiektGeograficzny, Lokalizacja


PLACE_TO_COORDINATES_MAPPING = {
    # city(miasto): (latitude(szerokość), longitude(długość))
    "Wrocław": (51.107883, 17.038538),
    "Wronki": (52.42, 16.23),
    "Milanówek": (52.118532, 20.671623),
}

COORDINATES_TO_PLACE_MAPPING = {
    # (latitude(szerokość), longitude(długość)): city(miasto)
    (51.107883, 17.038538): "Wrocław",
    (52.42, 16.23): "Wronki",
    (52.118532, 20.671623): "Milanówek",
}


def get_current_place(request, place):
    if place not in PLACE_TO_COORDINATES_MAPPING:
        return HttpResponseBadRequest(content=b"This place does not exist!")

    (lantitude, longitude) = PLACE_TO_COORDINATES_MAPPING[place]
    pogoda: Pogoda = (
        Pogoda.objects.filter(
            lokalizacja__szerokosc=lantitude,
            lokalizacja__dlugosc=longitude,
            dataPomiaru__lt=datetime.now(timezone.utc),
        )
        .order_by("-dataPomiaru")
        .first()
    )

    if not pogoda:
        return HttpResponseNotFound(content=b"The objects has not been found")

    data = {
        "weather": {
            "place": place,
            "condition": pogoda.warunkiPogodowe,
            "pressure": pogoda.cisnienie,
            "air_quality": pogoda.jakoscPowietrza,
            "humidity": pogoda.wilgotnosc,
            "visibility": pogoda.widocznosc,
            "temp_feel": pogoda.temperaturaOdczuwalna,
            "temp_real": pogoda.temperaturaRzeczywista,
            "sunset": pogoda.zachodSlonca.isoformat("T", "milliseconds"),
            "sunrise": pogoda.wschodSlonca.isoformat("T", "milliseconds"),
            "uv": pogoda.indeksUV,
            "moonset": pogoda.zachodKsiezyca.isoformat("T", "milliseconds"),
            "moonrise": pogoda.wschodKsiezyca.isoformat("T", "milliseconds"),
            "moon": pogoda.fazaKsiezyca,
            "rain": pogoda.opady,
            "wind": pogoda.predkoscWiatru,
            "wind_direction": pogoda.kierunekWiatru,
        }
    }

    return JsonResponse(data)


def get_cities(request, q):
    coordinates_list = Lokalizacja.objects.values_list("szerokosc", "dlugosc")
    cities = [
        COORDINATES_TO_PLACE_MAPPING[coordinates]
        for coordinates in coordinates_list
        if coordinates in COORDINATES_TO_PLACE_MAPPING
    ]
    cities.sort()

    return JsonResponse({"cities": cities})


def get_history_data(request, dateISO):
    pass
