# Generated by Django 4.1.5 on 2023-01-26 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("monitorek_pogody", "0008_alter_pogoda_datapomiaru"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pogoda",
            name="warunkiPogodowe",
            field=models.CharField(
                choices=[
                    ("sunny", "Sunny"),
                    ("partially sunny", "Partiallysunny"),
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
    ]
