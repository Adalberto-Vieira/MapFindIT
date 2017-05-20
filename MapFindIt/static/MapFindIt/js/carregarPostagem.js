
function setMapa(mapa, pontos, icones, rotas, pontoRotas, areas, pontoAreas, mapId){
		let inicio = {lat: mapa.coordyinicial, lng: mapa.coordxinicial};
		let map = new google.maps.Map(document.getElementById(mapId), {
			zoom: 12,
			center: inicio
		});
		pontos.forEach(function(item, index){
			if(item.fields.idtponto=='P'){
				let codIcone=item.fields.codicone;
				let iconePonto;
				for(let i=0; i<icones.length; i++){
					if(icones[i].pk==codIcone){
						iconePonto=icones[i];
					}
				}
				let pos = {lat: item.fields.coordy, lng: item.fields.coordx};
				let marker = new google.maps.Marker({
					 position: pos,
					 map: map,
				});
				marker.setIcon(imgUrl+'MapFindIt/ImagemIcones/'+iconePonto.pk+'.png');
				let contentString;
				if(item.fields.fotoponto!=""){
					contentString =
					`<div id="content">
		            	<h1 id="firstHeading" class="firstHeading">${item.fields.nomponto}</h1>
		            	<div id="bodyContent">
		            		<img class="img-responsive" style="margin: 0 auto;" src="${imgUrl}MapFindIt/ImagemPonto/${item.pk}.png">
		            		<p>${item.fields.descponto}</p>
		            	</div>
		            </div>`;
				}else{
					contentString =
					`<div id="content">
		            	<h1 id="firstHeading" class="firstHeading">${item.fields.nomponto}</h1>
		            	<div id="bodyContent">
		            		<p>${item.fields.descponto}</p>
		            	</div>
		            </div>`;
				}
		        let infowindow = new google.maps.InfoWindow({
		          content: contentString
		        });
				marker.addListener('click', function() {
		          infowindow.open(map, marker);
		        });
			}

		});
		rotas.forEach(function(item, index){
			let pontosRota=pontoRotas[index];
			console.log(pontosRota);
			let directionsService = new google.maps.DirectionsService();
			let directionsDisplay = new google.maps.DirectionsRenderer({
			  polylineOptions: {
			    strokeColor: `rgb(${item.fields.codcor[0]}, ${item.fields.codcor[1]}, ${item.fields.codcor[2]})`,
					strokeWeight: 5
				},
				suppressMarkers: true
			});
			let pinColor = `rgb(${item.fields.codcor[0]},${item.fields.codcor[1]},${item.fields.codcor[2]})`;
			console.log(index);
			console.log(pinColor);
			for(let x=0; x<pontosRota.length; x++){
				let marker = new google.maps.Marker({
					 position: new google.maps.LatLng(pontosRota[x].fields.idponto[0], pontosRota[x].fields.idponto[1]),
					 map: map,
					 icon: pinSymbol(pinColor)
				});
				let contentString=
					`<div id="content">
		          <h2 id="firstHeading" class="firstHeading">${item.fields.nomerota}</h2>
		          <div id="bodyContent">
		             <p>${item.fields.descrota}</p>
		          </div>
		       </div>`;
		    let infowindow = new google.maps.InfoWindow({
		       content: contentString
		    });
				marker.addListener('click', function() {
		      infowindow.open(map, marker);
		    });
			}
			let waypts=Array();
			for(let x=1; x<pontosRota.length-1; x++){
				waypts.push({location:{lat: pontosRota[x].fields.idponto[0], lng: pontosRota[x].fields.idponto[1]}, stopover:false});
			}
			directionsDisplay.setMap(map);
			let request;
			if(waypts.length>0){
				request = {
					origin: {lat: pontosRota[0].fields.idponto[0], lng: pontosRota[0].fields.idponto[1]},
					destination: {lat: pontosRota[pontosRota.length-1].fields.idponto[0], lng: pontosRota[pontosRota.length-1].fields.idponto[1]},
					waypoints: waypts,
					travelMode: 'DRIVING'
				};
			}else{
				request = {
					origin: {lat: pontosRota[0].fields.idponto[0], lng: pontosRota[0].fields.idponto[1]},
					destination: {lat: pontosRota[pontosRota.length-1].fields.idponto[0], lng: pontosRota[pontosRota.length-1].fields.idponto[1]},
					travelMode: 'DRIVING'
				};
			}

			directionsService.route(request, function(response, status) {
			  if (status == 'OK') {
			    directionsDisplay.setDirections(response);
			  }
			});
		});

		areas.forEach(function(item, index){
			let pontosArea=pontoAreas[index];
			let coords=Array();
			for(let x=0; x<pontosArea.length; x++){
				coords.push({lat: pontosArea[x].fields.idponto[0], lng: pontosArea[x].fields.idponto[1]});
			}
			let areaPoligono = new google.maps.Polygon({
          paths: coords,
          strokeColor: `rgb(${item.fields.codcor[0]}, ${item.fields.codcor[1]}, ${item.fields.codcor[2]})`,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: `rgb(${item.fields.codcor[0]}, ${item.fields.codcor[1]}, ${item.fields.codcor[2]})`,
          fillOpacity: 0.5
      });
      areaPoligono.setMap(map);
			let contentString=
				`<div id="content">
						<h2 id="firstHeading" class="firstHeading">${item.fields.nomarea}</h2>
						<div id="bodyContent">
							 <p>${item.fields.descarea}</p>
						</div>
				 </div>`;
			let infowindow = new google.maps.InfoWindow({
				 content: contentString
			});
			google.maps.event.addListener(areaPoligono, 'click', function (event) {
				infowindow.setPosition(event.latLng);
				infowindow.open(map);
		  });
		});
}

function pinSymbol(color) {
		if(color=='rgb(0,0,0)'){
			return {
	        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
	        fillColor: color,
	        fillOpacity: 1,
	        strokeColor: '#FFF',
	        strokeWeight: 1,
	        scale: 1,
	   };
		}else{
			return {
	        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
	        fillColor: color,
	        fillOpacity: 1,
	        strokeColor: '#000',
	        strokeWeight: 2,
	        scale: 1,
	   };
		}
}

function prepararPostagem(div, data, i){
    let mapa=JSON.parse(data.mapa)[0];
    mapa=mapa.fields;
    let postagem=JSON.parse(data.postagem)[0];
    postagem=postagem.fields;
    let autores=JSON.parse(data.autores);
    let comentarios=JSON.parse(data.comentarios);
    let rotas=JSON.parse(data.rotas);
    let pontoRotas=JSON.parse(data.pontoRotas);
    for(let i=0; i<pontoRotas.length; i++){
      pontoRotas[i]=JSON.parse(pontoRotas[i]);
    }
    let areas=JSON.parse(data.areas);
    let pontoAreas=JSON.parse(data.pontoAreas);
    for(let i=0; i<pontoAreas.length; i++){
      pontoAreas[i]=JSON.parse(pontoAreas[i]);
    }
    console.log(pontoRotas);
    div.append(`
      <div class='row' style="order:${i}; padding-bottom:20px;">
        <div class='col-md-8 col-md-offset-2 white center centerDiv' style='padding-bottom: 20px; display: block;'>
         <a href='#modal_mapa${10*(gruposCarregados-1)+i}' class='tituloMapa' data-toggle='modal' id='titulo_mapa${10*(gruposCarregados-1)+i}'><h4>${mapa.titulomapa}</h4></a>
         <p class="infoPostagem"><small>Postado em: ${formatarData(postagem.datapostagem)} às ${postagem.horapostagem}</small></p>
         <div class='centerDiv'>
           <div class="mapa" name='map${10*(gruposCarregados-1)+i}' id='map${10*(gruposCarregados-1)+i}'></div>
         </div>
         <div class='modal fade' id='modal_mapa${10*(gruposCarregados-1)+i}' name="modalMap" aria-hidden='true'>
            <div class='modal-dialog modal-map-dialog' >
              <div class='modal-content modal-map-content'>
                <div class='modal-header'>
                  <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>
                    ×
                  </button>
                  <h4 class='modal-title'>
                    ${mapa.titulomapa}
                  </h4>

                </div>
                <div class='modal-body modal-map-body'>
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-md-2" id="comentarios${10*(gruposCarregados-1)+i}" style="overflow-y:scroll; margin:0px; background-color: #E5E9ED; max-height: 83vh;">
                        <p style="margin: 0px; padding: 0px;">&nbsp</p>
                      </div>
                      <div class="col-md-10" style="display: block;" id="divMapa${10*(gruposCarregados-1)+i}">
                        <div class="mapaExp" name='mapExp${10*(gruposCarregados-1)+i}' id='mapExp${10*(gruposCarregados-1)+i}'></div>

                      </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
       </div>
     </div>
     <br><br><br>`);
     if(comentarios.length<1){
       $('#comentarios'+(10*(gruposCarregados-1)+i)).append(`
          <div class="row">
            <div class="col-md-12">
              <p style="text-align: left;">Ainda não existem comentários</p>
              </div>
            </div>
        `);
     }
    comentarios.forEach(function(comentario, index){
      $('#comentarios'+(10*(gruposCarregados-1)+i)).append(`
          <div class="row">
            <div class="col-md-12">
              <div class="card-container">
                <div class="card">
                  <div class="content">
                      <div class="main">
                          <h4>${comentario.fields.titulocomentario}</h4>
                          <p style="text-align: left; padding: 0px; margin:0px;"><small><small>${formatarData(comentario.fields.datacomentario)} às ${comentario.fields.horacomentario}</small></small></p>
                          <p style="text-align: left; padding: 0px; margin:0px;"><small><a href="/perfil/${autores[index].pk}">${autores[index].fields.primnomeusuario} ${autores[index].fields.ultnomeusuario}</a></small></p>
                          <p style="text-align: left">${comentario.fields.txtcomentario}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
    $('#comentarios'+(10*(gruposCarregados-1)+i)).append(`
        <button id="comentar${10*(gruposCarregados-1)+i}" class="btn btn-default">Comentar</button>
        <p style="padding:0px; margin:0px">&nbsp</p>
    `);
    $("#titulo_mapa"+(10*(gruposCarregados-1)+i)).on("click", function(){
       setTimeout(function(){
         setMapa(mapa, JSON.parse(data.pontos), JSON.parse(data.icones), rotas, pontoRotas, areas, pontoAreas, "mapExp"+(10*(gruposCarregados-1)+i));
       }, 1000);
    });
    setMapa(mapa, JSON.parse(data.pontos), JSON.parse(data.icones), rotas, pontoRotas, areas, pontoAreas, "map"+(10*(gruposCarregados-1)+i));
}
