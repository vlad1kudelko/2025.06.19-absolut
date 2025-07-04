# Generated by Django 4.2.7 on 2025-06-23 11:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0001_remove_old_models"),
    ]

    operations = [
        migrations.CreateModel(
            name="Delivery",
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
                    "created_at",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="Дата создания"
                    ),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="Дата обновления"),
                ),
                ("delivery_date", models.DateField(verbose_name="Дата доставки")),
                (
                    "distance",
                    models.DecimalField(
                        decimal_places=2, max_digits=8, verbose_name="Дистанция (км)"
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(default=True, verbose_name="Активна"),
                ),
                (
                    "cargo_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="deliveries",
                        to="core.cargotype",
                        verbose_name="Тип груза",
                    ),
                ),
                (
                    "delivery_status",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="deliveries",
                        to="core.deliverystatus",
                        verbose_name="Статус доставки",
                    ),
                ),
                (
                    "packaging_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="deliveries",
                        to="core.packagingtype",
                        verbose_name="Тип упаковки",
                    ),
                ),
                (
                    "service",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="deliveries",
                        to="core.service",
                        verbose_name="Услуга",
                    ),
                ),
                (
                    "vehicle_model",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="deliveries",
                        to="core.vehiclemodel",
                        verbose_name="Модель транспорта",
                    ),
                ),
            ],
            options={
                "verbose_name": "Доставка",
                "verbose_name_plural": "Доставки",
                "ordering": ["-delivery_date", "id"],
            },
        ),
    ]
