from datetime import datetime, timedelta, timezone, tzinfo
from django.http import HttpResponseBadRequest, JsonResponse
from django.http.response import HttpResponseNotFound
from django.shortcuts import render
from .models import Pogoda, ObiektGeograficzny, Lokalizacja


PLACE_TO_COORDINATES_MAPPING = {
    # city(miasto): (latitude(szerokość), longitude(długość))
    "Wrocław": (51.107883, 17.038538),
    "Wronki": (52.42, 16.23),
    "Milanówek": (52.118532, 20.671623),
    "Węgorzewo": (54.125641, 21.441392),
}

COORDINATES_TO_PLACE_MAPPING = {
    # (latitude(szerokość), longitude(długość)): city(miasto)
    (51.107883, 17.038538): "Wrocław",
    (52.42, 16.23): "Wronki",
    (52.118532, 20.671623): "Milanówek",
    (54.125641, 21.441392): "Węgorzewo",
}


def get_current_place(request, place):
    place = place.lower().capitalize()

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
    if not q.isalpha():
        return HttpResponseBadRequest(content=b"This place does not exist!")
    coordinates_list = Lokalizacja.objects.values_list("szerokosc", "dlugosc")
    cities = [
        COORDINATES_TO_PLACE_MAPPING[coordinates]
        for coordinates in coordinates_list
        if coordinates in COORDINATES_TO_PLACE_MAPPING
    ]
    if not q == "!":
        cities = list(filter(lambda x: x.lower().startswith(q.lower()), cities))

    return JsonResponse({"cities": cities})


def get_history_data(request, place, dateISO):

    place = place.lower().capitalize()

    try:
        requested_date = datetime.fromisoformat(dateISO)
    except ValueError:
        return HttpResponseBadRequest(content=b"Not a valid date!")

    if place not in PLACE_TO_COORDINATES_MAPPING:
        return HttpResponseBadRequest(content=b"This place does not exist!")

    (lantitude, longitude) = PLACE_TO_COORDINATES_MAPPING[place]

    pogoda_series_data = Pogoda.objects.filter(
        dataPomiaru__lte=datetime.now() + requested_date.utcoffset()
        if requested_date.utcoffset()
        else datetime.now(),
        dataPomiaru__year=requested_date.year,
        dataPomiaru__month=requested_date.month,
        dataPomiaru__day=requested_date.day,
        lokalizacja__szerokosc=lantitude,
        lokalizacja__dlugosc=longitude,
    ).order_by("dataPomiaru")

    if not pogoda_series_data:
        return HttpResponseNotFound(
            content=b"There is no data for a given date or place"
        )

    data = {
        "weather": {
            "place": place,
            "date": dateISO,
            "condition": pogoda_series_data[0].warunkiPogodowe,
            "pressure": [
                {"date": sample.dataPomiaru, "value": sample.cisnienie}
                for sample in pogoda_series_data
            ],
            "air_quality": [
                {"date": sample.dataPomiaru, "value": sample.jakoscPowietrza}
                for sample in pogoda_series_data
            ],
            "humidity": [
                {"date": sample.dataPomiaru, "value": sample.wilgotnosc}
                for sample in pogoda_series_data
            ],
            "visibility": [
                {"date": sample.dataPomiaru, "value": sample.widocznosc}
                for sample in pogoda_series_data
            ],
            "temp_feel": [
                {"date": sample.dataPomiaru, "value": sample.temperaturaOdczuwalna}
                for sample in pogoda_series_data
            ],
            "temp_real": [
                {"date": sample.dataPomiaru, "value": sample.temperaturaRzeczywista}
                for sample in pogoda_series_data
            ],
            "sunset": pogoda_series_data[0].zachodSlonca,
            "sunrise": pogoda_series_data[0].wschodSlonca,
            "uv": [
                {"date": sample.dataPomiaru, "value": sample.indeksUV}
                for sample in pogoda_series_data
            ],
            "moonset": pogoda_series_data[0].zachodKsiezyca,
            "moonrise": pogoda_series_data[0].wschodKsiezyca,
            "moon": pogoda_series_data[0].fazaKsiezyca,
            "rain": [
                {"date": sample.dataPomiaru, "value": sample.opady}
                for sample in pogoda_series_data
            ],
            "wind": [
                {"date": sample.dataPomiaru, "value": sample.predkoscWiatru}
                for sample in pogoda_series_data
            ],
            "wind_direction": [
                {"date": sample.dataPomiaru, "value": sample.kierunekWiatru}
                for sample in pogoda_series_data
            ],
        }
    }

    return JsonResponse(data)
