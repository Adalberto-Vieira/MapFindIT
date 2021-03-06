from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^$', views.home),
    url(r'^novoMapa/$', views.pontoInicial),
    url(r'^perfil/(?P<idusuario>[0-9]+)/$', views.perfil, name="perfil"),
    url(r'^ajax/checkarEmail/$', views.checkarEmail),
    url(r'^ajax/checkarLogin/$', views.checkarLogin),
    url(r'^ajax/checkarSenha/$', views.checkarSenha),
    url(r'^ajax/carregarMapasPerfil/$', views.mapasPerfil),
    url(r'^ajax/salvarComentario/$', views.salvarComentario),
    url(r'^ajax/adicionarView/$', views.adicionarView),
]
