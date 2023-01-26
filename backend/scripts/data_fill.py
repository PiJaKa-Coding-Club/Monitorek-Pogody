#!/usr/bin/env python3
from datetime import datetime, timedelta, timezone
from monitorek_pogody.models import Pogoda, Lokalizacja
from monitorek_pogody.views import PLACE_TO_COORDINATES_MAPPING
import random as rnd


def fill_data():
    for city, coordinates in PLACE_TO_COORDINATES_MAPPING.items():
        obj, _ = Lokalizacja.objects.update_or_create(
            szerokosc=coordinates[0], dlugosc=coordinates[1]
        )
        base_date = datetime(
            year=2022, month=12, day=1, hour=0, minute=0, tzinfo=timezone.utc
        )
        wschodS = datetime(
            year=base_date.year,
            month=base_date.month,
            day=base_date.day,
            hour=6,
            minute=0,
            second=0,
            tzinfo=timezone.utc,
        )
        zachodS = datetime(
            year=base_date.year,
            month=base_date.month,
            day=base_date.day,
            hour=17,
            minute=0,
            second=0,
            tzinfo=timezone.utc,
        )
        wschodK = datetime(
            year=base_date.year,
            month=base_date.month,
            day=base_date.day,
            hour=12,
            minute=0,
            second=0,
            tzinfo=timezone.utc,
        )
        zachodK = datetime(
            year=base_date.year,
            month=base_date.month,
            day=base_date.day,
            hour=4,
            minute=0,
            second=0,
            tzinfo=timezone.utc,
        )
        while base_date <= datetime.now(timezone.utc) + timedelta(days=7):
            for hour in range(24):
                Pogoda.objects.update_or_create(
                    defaults={
                        "warunkiPogodowe": rnd.choice(
                            Pogoda.WarunkiPogodoweEnum.values
                        ),
                        "dataPomiaru": base_date,
                        "cisnienie": rnd.randint(980, 1050),
                        "widocznosc": rnd.randint(0, 100),
                        "wilgotnosc": rnd.randint(0, 100),
                        "jakoscPowietrza": rnd.choice(
                            Pogoda.JakoscPowietrzaEnum.values
                        ),
                        "temperaturaOdczuwalna": rnd.randint(-5, 15),
                        "temperaturaRzeczywista": rnd.randint(0, 20),
                        "opady": rnd.randint(0, 15),
                        "predkoscWiatru": rnd.randint(0, 35),
                        "kierunekWiatru": rnd.choice(Pogoda.KierunekEnum.values),
                        "fazaKsiezyca": rnd.choice(Pogoda.FazaEnum.values),
                        "wschodKsiezyca": wschodK,
                        "zachodKsiezyca": zachodK,
                        "indeksUV": rnd.randint(0, 10),
                        "wschodSlonca": wschodS,
                        "zachodSlonca": zachodS,
                        "lokalizacja": obj,
                    },
                    **{
                        "dataPomiaru": base_date,
                        "lokalizacja__pk": obj.pk,
                    }
                )
                base_date = base_date + timedelta(hours=1)
            wschodS = wschodS + timedelta(days=1, seconds=15)
            zachodS = zachodS + timedelta(days=1, seconds=15)
            wschodK = wschodK + timedelta(days=1, seconds=15)
            zachodK = zachodK + timedelta(days=1, seconds=15)
