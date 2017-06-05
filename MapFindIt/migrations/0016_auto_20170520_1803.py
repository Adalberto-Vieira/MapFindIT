# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-20 21:03
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('MapFindIt', '0015_remove_ponto_codcor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='area',
            name='idarea',
            field=models.AutoField(db_column='idArea', primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='area',
            name='idmapa',
            field=models.ForeignKey(db_column='idMapa', on_delete=django.db.models.deletion.DO_NOTHING, to='MapFindIt.Mapa'),
        ),
        migrations.AlterField(
            model_name='pontoarea',
            name='idarea',
            field=models.ForeignKey(db_column='idArea', on_delete=django.db.models.deletion.DO_NOTHING, to='MapFindIt.Area'),
        ),
        migrations.AlterUniqueTogether(
            name='area',
            unique_together=set([]),
        ),
        migrations.AlterUniqueTogether(
            name='pontoarea',
            unique_together=set([('idarea', 'idponto')]),
        ),
		migrations.AddField(
            model_name='pontoarea',
            name='id',
            field=models.AutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
    ]