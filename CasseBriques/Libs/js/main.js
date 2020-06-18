let balles = [];
let lancerBalle;
let hauteurAire;
let largeurAire;

$(document).ready(init);

function init() {
    ajoutBalle()
    lancerBalle = setInterval(mouvementBalles, 10);
    largeurAire = $('.playfield').width();
    hauteurAire = $('.playfield').height();

}

function ajoutBalle() {
    let balleParId = creerIdBalle();
    $('.playfield').prepend('<div class="balle" data-id="' + balleParId + '"></div>');
    balles.push(
        {
            id: balleParId,
            left: 100,
            top: 100,
            hSpeed: 2,
            vSpeed: 2
        }
    )
}

function creerIdBalle(){
    let code="";
    for (let $compteur = 0; $compteur<8; $compteur++) {

        code += String.fromCharCode(65 + Math.random() * 26);
    }
    return code;
}

function mouvementBalles() {
    balles.forEach(function (b){
        b.left += b.hSpeed;
        b.top += b.vSpeed;
        if (b.left < 0){
            b.hSpeed = -b.hSpeed;
        }
        if (b.top < 0){
            b.vSpeed = -b.vSpeed;
        }
        if (b.left > largeurAire){
            b.hSpeed = -b.hSpeed;
        }
        if (b.top > hauteurAire){
            b.vSpeed = -b.vSpeed
        }
        $('.balle[data-id="' + b.id + '"]').css({left: b.left, top: b.top});
    });
}