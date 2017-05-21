//Coloca a mascara na data de nascimento
$('document').ready(function(){
	jQuery("#dataNascimento").mask("99/99/9999");
});

//Função para determinar se a senha cumpre com os requisitos minimos
function minCaracSenha(senha){
	return senha.match(/[a-zA-Z]/g) && senha.match(/[0-9]/g);
}

//Variaveis para guardar os erros
var erroEmail;
var erroSenhaConf;
var erroSenha;
var erroSexo;
var erroTermo;
var erroData;
var erroEmailExiste;

//Valida o form de cadastro
function validateCadastro(){
	let email = $('#emailCad');
	let emailConf = $('#emailConf');
	let senha = $('#password');
	let senhaConf = $('#password_confirmation');
	let data = $('#dataNascimento');
	let sexoM = $('#masc');
	let sexoF= $('#femin');
	let termos = $('#aceito');
	let retorno=true;
	//Verifica se os email são iguais
  	if (email.val() != emailConf.val()) {
				//Adiciona erros caso não sejam
        emailConf.parent().addClass('has-error');
        if($('#erroEmail').length === 0) {
       		erroEmail=$('<span id="erroEmail" class="help-block">Os e-mails não correspondem</span>').appendTo(emailConf.parent());
        }
        retorno=false;
    }else{
			//Removem erros caso sejam
			emailConf.parent().removeClass('has-error');
			if(erroEmail){
				erroEmail.remove();
			}
		}
		//Verifica se as senhas são iguais
    if (senha.val() != senhaConf.val()) {
        senhaConf.parent().addClass('has-error');
       	if($('#erroSenhaConf').length === 0) {
       		erroSenhaConf=$('<span id="erroSenhaConf" class="help-block">As senhas não correspondem</span>').appendTo(senhaConf.parent());
       	}
        retorno=false;
    }else{
			senhaConf.parent().removeClass('has-error');
			if(erroSenhaConf){
				erroSenhaConf.remove();
			}
		}
		//Verifica se a senha cumpre o minimo de tamanho e segurança
    if(senha.val().length < 6 || !minCaracSenha(senha.val())){
    	senha.parent().addClass('has-error');
    	if($('#erroSenha').length === 0) {
    		erroSenha=$('<span id="erroSenha" class="help-block">A senha deve ter ao menos 6 caracteres e deve conter números e letras</span>').appendTo(senha.parent());
    	}
    	retorno=false;
    }else{
			senha.parent().removeClass('has-error');
			if(erroSenha){
				erroSenha.remove();
			}
		}
		//Transforma a data digitada no formato YYYY-MM-DD
    let newdate = data.val().split("/").reverse().join("-");
		//Cria um objeto date
    let dataValidacao = new Date(newdate);
		//Caso o objeto date não possua erros e o ano seja válido
    if(dataValidacao.toString()=="Invalid Date" || dataValidacao.getFullYear()<1900 ){
    	data.parent().addClass('has-error');
    	if($("#erroData").length === 0){
    		erroData=$('<span id="erroData" class="help-block">Data Inválida</span>').appendTo(data.parent());
    	}
    	retorno =false;
    }else{
			data.parent().removeClass('has-error');
			if(erroData){
				erroData.remove();
			}
		}
		//Verifica se um dos sexos está selecionado
    if(!sexoM.is(':checked') && !sexoF.is(':checked')){
    	if($("#erroSexo").length === 0){
    		erroSexo=$('<div class="has-error"><span id="erroSexo" class="help-block">Nada Selecionado</span></div>').appendTo(sexoM.parent().parent());
    	}
    	retorno=false;
    }else{
			if(erroSexo){
				erroSexo.remove();
			}
		}
		//Verifica se o usuario aceitou os termos
    if(!termos.is(':checked')){
    	if($('#erroTermo').length === 0){
    	  erroTermo=$('<div class="has-error"><span id="erroTermo" class="help-block">Você deve aceitar os termos e condições para se cadastrar</span></div>').appendTo(termos.parent());
    	}
    	retorno=false;
    }else{
			if(erroTermo){
				erroTermo.remove();
			}
		}
		//Ajax para verificar se o email já foi cadastrado
    $.ajax({
        url: '/ajax/checkarEmail/',
        data: {
          'email': email.val()
        },
        dataType: 'json',
        success: function (data) {
					//Caso o email exista
		      if (data.existe) {
		         email.parent().addClass('has-error');
		         if($('#erroEmailExiste').length === 0) {
		           erroEmailExiste=$('<span id="erroEmailExiste" class="help-block">E-mail já cadastrado</span>').appendTo(email.parent());
		         }
		         retorno=false;
		      }else{
						email.parent().removeClass('has-error');
						if(erroEmailExiste){
							erroEmailExiste.remove();
						}
					}
					//Se não ocorreu nenhum erro em nenhum campo submite o formulario
		      if(retorno){
		      	$('#formCadastro').submit();
		      }
	    	}
    });
}

//Validar o login
function validateLogin(){
	let email = $('#emailLogin');
	let senha = $('#senhaLogin');
	//Ajax para verificar se o email e senha batem
	$.ajax({
        url: '/ajax/checkarLogin/',
        data: {
          'email': email.val(),
          'senha': senha.val()
        },
        dataType: 'json',
        success: function (data) {
					//Caso não batam exibe erros, se baterem submete o form
		      if (!data.existe) {
		         email.parent().addClass('has-error');
						 senha.parent().addClass('has-error');
		         if($('#erroLogin').length === 0) {
		           senha.parent().append('<span id="erroLogin" class="help-block">E-mail ou senha incorretos</span>');
		         }
		      }else{
						$('#formLogin').submit();
					}
		    }
    });
}
//INICIA MAPAS TEMPORÁRIOS
function initMap() {
        var maps = document.getElementsByName('map');
        for(let i=0; i<10; i++){
            var uluru = {lat: -25.363, lng: 131.044};
            var map = new google.maps.Map(maps[i], {
              zoom: 4,
              center: uluru
            });
            var marker = new google.maps.Marker({
               position: uluru,
               map: map
            });
        }
}
