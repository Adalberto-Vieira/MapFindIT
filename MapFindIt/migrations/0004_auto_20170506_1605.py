# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-06 19:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MapFindIt', '0003_usuario_foto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='txtfrase',
            field=models.CharField(db_column='txtFrase', default='No que você está pensando?', max_length=100),
        ),
    ]