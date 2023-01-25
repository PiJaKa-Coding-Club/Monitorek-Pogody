# Generated by Django 4.1.5 on 2023-01-25 19:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Lokalizacja",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("szerkosc", models.FloatField()),
                ("dlugosc", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="ObiektGeograficzny",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("obiektGeograficzny", models.CharField(max_length=120)),
            ],
        ),
        migrations.CreateModel(
            name="Pogoda",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "warunkiPogodowe",
                    models.CharField(
                        choices=[
                            ("sunny", "Sunny"),
                            ("partiallysunny", "Partiallysunny"),
                            ("cloudy", "Cloudy"),
                            ("rainy", "Rainy"),
                            ("snowy", "Snowy"),
                            ("stormy", "Stormy"),
                            ("tornado", "Tornado"),
                            ("windy", "Windy"),
                        ],
                        max_length=100,
                    ),
                ),
                ("dataPomiaru", models.DateTimeField(auto_now_add=True)),
                ("cisnienie", models.IntegerField()),
                ("widocznosc", models.IntegerField()),
                ("wilgotnosc", models.IntegerField()),
                (
                    "jakoscPowietrza",
                    models.CharField(
                        choices=[
                            ("bardzoDobre", "Bardzodobre"),
                            ("dobre", "Dobre"),
                            ("umiarkowane", "Umiarkowane"),
                            ("zle", "Zle"),
                            ("bardzoZle", "Bardzozle"),
                        ],
                        max_length=255,
                    ),
                ),
                ("temperaturaOdczuwalna", models.IntegerField()),
                ("temperaturaRzeczywista", models.IntegerField()),
                ("opady", models.IntegerField()),
                ("predkoscWiatru", models.IntegerField()),
                (
                    "kierunekWiatru",
                    models.CharField(
                        choices=[
                            ("N", "N"),
                            ("E", "E"),
                            ("W", "W"),
                            ("S", "S"),
                            ("NE", "Ne"),
                            ("NW", "Nw"),
                            ("SE", "Se"),
                            ("SW", "Sw"),
                        ],
                        max_length=255,
                    ),
                ),
                (
                    "fazaKsiezyca",
                    models.CharField(
                        choices=[
                            ("pierwszaKwadra", "Pierwszakwadra"),
                            ("now", "Now"),
                            ("ostatniaKwadra", "Ostatniakwadra"),
                            ("pelnia", "Pelnia"),
                        ],
                        max_length=255,
                    ),
                ),
                ("wschodKsiezyca", models.DateTimeField()),
                ("zachodKsiezyca", models.DateTimeField()),
                ("indeksUV", models.IntegerField()),
                ("wschodSlonca", models.DateTimeField()),
                ("zachodSlonca", models.DateTimeField()),
                (
                    "lokalizacja",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="pogoda",
                        to="monitorek_pogody.lokalizacja",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="lokalizacja",
            name="obiektGeograficzny",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="lokalizacja",
                to="monitorek_pogody.obiektgeograficzny",
            ),
        ),
    ]