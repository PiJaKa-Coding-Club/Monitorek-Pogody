from django.db import models

# datetime format = datetime.now(timezone(timedelta(hours=1))).isoformat('T', 'milliseconds')


class Pogoda(models.Model):
    class WarunkiPogodoweEnum(models.Choices):
        SUNNY = "sunny"
        PARTIALLYSUNNY = "partially sunny"
        CLOUDY = "cloudy"
        RAINY = "rainy"
        SNOWY = "snowy"
        STORMY = "stormy"
        TORNADO = "tornado"
        WINDY = "windy"

    class JakoscPowietrzaEnum(models.Choices):
        BARDZODOBRE = "bardzo dobre"
        DOBRE = "dobre"
        UMIARKOWANE = "umiarkowane"
        ZLE = "złe"
        BARDZOZLE = "bardzo złe"

    class FazaEnum(models.Choices):
        PIERWSZAKWADRA = "pierwsza kwadra"
        NOW = "nów"
        OSTATNIAKWADRA = "ostatnia kwadra"
        PELNIA = "pełnia"

    class KierunekEnum(models.Choices):
        N = "N"
        E = "E"
        W = "W"
        S = "S"
        NE = "NE"
        NW = "NW"
        SE = "SE"
        SW = "SW"

    warunkiPogodowe = models.CharField(
        max_length=100, choices=WarunkiPogodoweEnum.choices
    )
    dataPomiaru = models.DateTimeField()
    cisnienie = models.IntegerField()
    widocznosc = models.IntegerField()
    wilgotnosc = models.IntegerField()
    jakoscPowietrza = models.CharField(
        max_length=255, choices=JakoscPowietrzaEnum.choices
    )
    temperaturaOdczuwalna = models.IntegerField()
    temperaturaRzeczywista = models.IntegerField()
    opady = models.IntegerField()
    predkoscWiatru = models.IntegerField()
    kierunekWiatru = models.CharField(max_length=255, choices=KierunekEnum.choices)
    fazaKsiezyca = models.CharField(max_length=255, choices=FazaEnum.choices)
    wschodKsiezyca = models.DateTimeField()
    zachodKsiezyca = models.DateTimeField()
    indeksUV = models.IntegerField()
    wschodSlonca = models.DateTimeField()
    zachodSlonca = models.DateTimeField()
    lokalizacja = models.ForeignKey(
        "Lokalizacja",
        on_delete=models.CASCADE,
        related_name="pogoda",
    )

    class Meta:
        unique_together = ("lokalizacja", "dataPomiaru")


class Lokalizacja(models.Model):
    szerokosc = models.FloatField()
    dlugosc = models.FloatField()
    obiektGeograficzny = models.ForeignKey(
        "ObiektGeograficzny",
        on_delete=models.CASCADE,
        related_name="lokalizacja",
        null=True,
        blank=True,
    )

    class Meta:
        unique_together = ("szerokosc", "dlugosc")


class ObiektGeograficzny(models.Model):
    obiektGeograficzny = models.CharField(max_length=120)
