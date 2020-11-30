(function() {
    "use strict";

    var regalo = document.getElementById('regalo');

    if(document.getElementById('mapa')){
        var map = L.map('mapa').setView([-31.372518, -64.173911], 18);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([-31.372518, -64.173911]).addTo(map)
                .bindPopup('GDLWebCamp<br> Boletos ya disponibles')
                .openPopup()
    }

    

    document.addEventListener('DOMContentLoaded', function(){
        
    
        // Campos datos usuarios
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');

        // Campos pases
        var pase_dia = document.getElementById('pase_dia');
        var pase_dosdias = document.getElementById('pase_dosdias');
        var pase_completo = document.getElementById('pase_completo');

        //Botones y div
        var calcular = document.getElementById('calcular');
        var divError = document.getElementById('error');
        var btnRegistro = document.getElementById('btnRegistro');
        var listaProductosHtml = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');

        //Extras
        var camisetas = document.getElementById('camisa_evento');
        var etiquetas = document.getElementById('etiquetas');

        //Eventos

        if(document.getElementById('calcular')){

            calcular.addEventListener("click", calcularMontos);

            pase_dia.addEventListener("blur", mostrarDias);
            pase_dosdias.addEventListener("blur", mostrarDias)
            pase_completo.addEventListener("blur", mostrarDias)

            nombre.addEventListener("blur", validarCampos);
            apellido.addEventListener("blur", validarCampos);
            email.addEventListener("blur", validarCampos);
            email.addEventListener("blur", validarMail);

            function calcularMontos(event) {
                event.preventDefault();
                if(regalo.value == ''){
                    alert("Debes elegir un regalo");
                    regalo.focus();
                }
                else{
                    var boletosDia = parseInt(pase_dia.value, 10) || 0,
                        boletosDosDias = parseInt(pase_dosdias.value, 10) || 0,
                        boletoCompleto = parseInt(pase_completo.value, 10) || 0,
                        cantCamisas = parseInt(camisetas.value, 10)|| 0,
                        cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

                    var totalPagar = (boletosDia * 30) + 
                                    (boletosDosDias * 45) + 
                                    (boletoCompleto * 50) +
                                    ((cantCamisas * 10) * .93) + 
                                    (cantEtiquetas * 2);

                    var listadoProductos = new Array();

                    if(boletosDia >= 1){
                        listadoProductos.push(boletosDia + ' Pases por día');
                    }
                    if(boletosDosDias >= 1){
                        listadoProductos.push(boletosDosDias + ' Pases por dos día');
                    }
                    if(boletoCompleto >= 1){
                        listadoProductos.push(boletoCompleto + ' Pases completos');
                    }
                    if(cantCamisas >= 1){
                        listadoProductos.push(cantCamisas + ' Camisas');
                    }
                    if(cantEtiquetas >= 1){
                        listadoProductos.push(cantEtiquetas + ' Etiquetas');
                    }
                    
                    listaProductosHtml.style.display = "block"
                    listaProductosHtml.innerHTML = '';
                    for(var i = 0; i < listadoProductos.length; i++){
                        listaProductosHtml.innerHTML += listadoProductos[i] + '<br>'
                    }

                    suma.innerHTML = "$ " + totalPagar.toFixed(2);
                }

            }

            function mostrarDias(){
                var boletosDia = parseInt(pase_dia.value, 10) || 0,
                    boletosDosDias = parseInt(pase_dosdias.value, 10) || 0,
                    boletoCompleto = parseInt(pase_completo.value, 10) || 0

                var diasElegidos = [];

                if(boletosDia > 0){
                    diasElegidos.push('viernes');
                }
                if(boletosDosDias > 0){
                    diasElegidos.push('viernes', 'sabado');
                }
                if(boletoCompleto > 0){
                    diasElegidos.push('viernes', 'sabado', 'domingo');
                }

                for(var i = 0; i < diasElegidos.length; i++){
                    document.getElementById(diasElegidos[i]).style.display = "block";
                }
            }

            function validarCampos(){
                if(this.value == ""){
                    divError.style.display = 'block';
                    divError.innerHTML = 'Este campo es obligatorio';
                    divError.style.color = 'red';
                    this.style.border = '1px solid red';
                }
                else{
                    divError.style.display = 'none';
                    this.style.border = '1px solid #e1e1e1';
                }
            }

            function validarMail() {
                if(this.value.indexOf("@") > -1){
                    divError.style.display = 'none';
                    this.style.border = '1px solid #e1e1e1';
                }
                else{
                    divError.style.display = 'block';
                    divError.innerHTML = 'Campo incorrecto';
                    divError.style.color = 'red';
                    this.style.border = '1px solid red';
                }
            }
        }
    }); // DOM CONTENT LOADED 
})();


$(function() {

    //menu fijo
    var windowHeight = $(window).height();
    var barraHeight = $('.barra').innerHeight();

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        
        if(scroll > windowHeight){
            $('.barra').addClass('fixed');
            $('body').css({'margin-top': barraHeight+'px'});
        }   
        else{
            $('.barra').removeClass('fixed');
            $('body').css({'margin-top': '0px'});
        }
    }); 

    //Menu responsive
    $('.menu-movil').on('click', function(){
        $('.navegacion-principal').slideToggle();
    });

    //Lettering para el titulo
    $('.nombre-sitio').lettering();

    //Tabs programas de conferencias
    $('.programa-evento .infor-curso:first').show();
    $('.menu-programa a:first').addClass('activo');

    $('.menu-programa a').on('click', function(){
        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo')
        $('.ocultar').hide();

        var enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);

        //Para que no haga un salto hacia abajo al hacer click
        return false;
    })

    //Animaciones para los numeros
    $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6 }, 3000)
    $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15 }, 3000)
    $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3 }, 2000)
    $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9 }, 2000)

    //Animacion en contador de dias
    $('.cuenta-regresiva').countdown('2020/12/10 09:00:00', function(event){
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    })
})