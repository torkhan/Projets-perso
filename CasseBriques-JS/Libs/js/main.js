let balles = [];
let briques = [];
let lancerBalle;
let hauteurAire;
let largeurAire;
let tailleBalle;
let curLevel;
let raquette;
let gameRefresh;


$(document).ready(init);

function init() {
    curLevel = 0;
    largeurAire = $('.playfield').width();
    hauteurAire = $('.playfield').height();
    creerAire();

    $(window).on('mousemove', dessineRaquette);
    raquette = {width: $('.raquette').width(), top: $ ('.raquette').offset().top - $('.playfield').offset().top};





}

function ajoutBalle() {
    let balleParId = creerIdBalle();
    if(balles.length < 5){
        $('.playfield').prepend('<div class="balle" data-id="' + balleParId + '"></div>');
        tailleBalle = $('.balle:first').width();
        balles.push(

            {
                id: balleParId,
                left: Math.random() * (largeurAire - tailleBalle),
                top: ($('.ligneDeBrique').length * 34) + tailleBalle,
                hSpeed: 2,
                vSpeed: 2
            }

        )

    }
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

        let procheBrique = briques.filter(function (f)
        {
            return f.top + 34 > b.top && f.left <= b.left && f.left + 100 >= b.left + tailleBalle;
        });
        if(procheBrique.length > 0){

            $('.brique[data-id="' + procheBrique[0].id + '"]').remove();
            briques.splice(briques.indexOf(procheBrique[0]),1);
            b.vSpeed = -b.vSpeed;
        }
        if (b.left < 0){
            b.hSpeed = -b.hSpeed;
        }
        if (b.top < 0){
            b.vSpeed = -b.vSpeed;
        }
        if (b.left > largeurAire - tailleBalle){
            b.hSpeed = -b.hSpeed;
        }
        if (b.top > hauteurAire - tailleBalle){
            b.vSpeed = -b.vSpeed
        }
        if (b.top > raquette.top){
            $('.balle[data-id="' + b.id + '"]').remove();
            balles.splice(balles.indexOf(b), 1);
        }
        if(b.top + tailleBalle >= raquette.top){
            if(b.left >= raquette.left && b.left <= raquette.left + raquette.width - tailleBalle){
                b.vSpeed = -b.vSpeed;
            }
        }
        $('.balle[data-id="' + b.id + '"]').css({left: b.left, top: b.top});
    });
}

function affNiveau(){
    $('.texteNiveauActuel').text("niveau N° " +  (curLevel+1)).animate({
        opacity:0,
    },3000)
}
function creerAire(){
    affNiveau();

    niveaux[curLevel].forEach(function (e, i){

        let ligne = $('<div class="ligneDeBrique"></div>');
        e.forEach (function (f, j){
            briques.push({
                id: i + '-' + j,
                top: i * 34,
                left: j * 86

            });
            ligne.append('<div class="brique ' + f + 'Brique" data-id="' + i + '-' + j + '"></div>');
        });
        $('.playfield').prepend(ligne);
      /*  $('.brique.Brique').remove();
        $('.brique.Brique').splice(briques.indexOf([0]),1);*/
    });
    briques.forEach(function (e, i) {
        $('.brique[data-id="' + e.id + '"]').animate({
                top: e.top + 'px'
            },500
        );
    });
    briques.forEach(function (e, i) {
        $('.brique[data-id="' + e.id + '"]').animate({
                left: e.left + 'px'
            },1000, function(){
                if(i === briques.length-1){
                    remplirTexteBoite();
                }
            }
        );
    });
}
function dessineRaquette(b) {
    if(gameRefresh !== undefined){
    raquette.left = Math.min(largeurAire - raquette.width, Math.max(2, b.offsetX));
    $('.raquette').css ('left', raquette.left + 'px');
    }
}
function messageDepart(titre, description, texteBouton, boutonLancement){
    $('body').append('<div class="boiteInfo"><label class="titreBoite"> ' + titre + ' </label><label class ="messageBoite"> ' + description + ' </label><button class="boutonTexte"> ' + texteBouton + ' </button></div>');
    $('.boutonTexte').on('click', boutonLancement);
}
function remplirTexteBoite(){
    messageDepart("Casse-briques", "Si vous vous croyez prêt à relever ce défi....", "....CLIQUEZ ICI", startGame);
}
function enleverMessage(){
    $('.boutonTexte').off();//on enlève l'écouteur
    $('.boiteInfo').remove();//on enlève la boite
}
function startGame(){
    enleverMessage();
    ajoutBalle();
    /*lancerBalle = setInterval(mouvementBalles, 10);*/
    gameRefresh = setInterval(mouvementBalles, 10);

}
