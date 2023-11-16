/* Primer ho farem d'una manera molt simple, emprant grups
   de "if", comprovar els camps i mostrant els errors.
   Després, ho refarem tot per deixar-ho més aclarit, de
   tal manera que si volguessim afegir més camps ho tindrem
   que estar afegint més grups de "if" i la resta com abans.
   El que farem bàsicament és posar cada validació a dins
   la seva propia funció */

/**********
    01
**********/
/* Capturem tots el elements del DOM que necessitem. */
const form = document.getElementById('form'); 
const nomusuari = document.getElementById('nomusuari');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

/**********
    03
**********/
//Funcions
//mostraError: mostra el missatge d'error i destaca el control afectat.
function mostraError(input, missatge) {
    //Ens fem amb el form-control de l'element (input) passat per paràmetre.
    //Ens aprofitem que sabem que és l'element immediatament superior (pare)
    //per a utilitzar la propietat parentElement
    const formControl = input.parentElement;
    //Li assignem la classe error
    formControl.className = 'form-control error';
    const label = formControl.querySelector('label');
    const small = formControl.querySelector('small');
    small.innerText = label.innerText + ' ' + missatge;
}

/**********
    04
**********/
//mostraCorrecte: destaquem el control com a correcte
function mostraCorrecte(input) {
    //Ens fem amb el form-control de l'element (input) passat per paràmetre.
    //Ens aprofitem que sabem que és l'element immediatament superior (pare)
    //per a utilitzar la propietat parentElement
    const formControl = input.parentElement;
    //Li assignem la classe correcto
    formControl.className = 'form-control correcto';
}

/**********
    06
**********/
/**********
    16
**********/
/* Canviem email per input al paràmetre per ser consistents
   amb la resta de funcions. */
//Comprovem l'email
function esEmailValid(input) {
    //js email regex: cercar a google -> js email regex
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(String(email).toLowerCase()); //True o False

    if(re.test(String(input.value.trim()))) {
        mostraCorrecte(input);
    } else {
        mostraError(input, 'Email no es vàlid');
    }    
}

/**********
    08
**********/
//Comprovem els camps obligatoris
/* function esObligatori(input) {

    if(input.value.trim() === '') {
        //mostraError(input, `${input.id} és obligatori`);
        mostraError(input, 'és obligatori');
    } else {
        mostraCorrecte(input);
    }
} */

/**********
    10
**********/
function esObligatori(inputArray) {
    /* Hem de recorrer l'array i fer la comprovació
       per cadascu dels elements */
    inputArray.forEach(function(input) {
        //console.log(input);
        //console.log(input.value);

        if(input.value.trim() === '') {
            //mostraError(input, `${input.id} és obligatori`);
            //mostraError(input, `${prenNomInput(input.id)} és obligatori`);
            mostraError(input, 'és obligatori');
        } else {
            mostraCorrecte(input);
        }
    });
}

/**********
    12
**********/
/* Per si volem emprar el id dels inputs i ferlos capitalitzats */
function prenNomInput(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

/**********
    14
**********/
//Comprovar la longitud dels camps
function conprovaLongitud(input, min, max) {

    if(input.value.length < min) {
        mostraError(input, `ha de tenir almenys ${min} caràcters`);
    } else if(input.value.length > max) {
        mostraError(input, `ha de tenir almenys ${max} caràcters`);
    } else {
        mostraCorrecte(input);
    }

}

/**********
    17
**********/
//Comprovar la coincidència de contrasenyes
function comprovaContrasenyesIguals(input1, input2) {
    if(input1.value != input2.value) {
        mostraError(input2, 'Les contrasenyes no coincideixen');
    }
}


/**********
    02
**********/
//Event Listeners
/* Primer afegim un listener al form i volem escoltar el submit */
form.addEventListener('submit', function(e) {
/**************************************
    07 (continua del fitxer script.js)
**************************************/
/* El primer que farem és eliminar tot menys preventDefault */
    e.preventDefault();    

    /* Volem agrupar tota la funcionalitat anterior en una 
       funció única que tipus esObligatori */
    //esObligatori(nomusuari); //Anem al punt 08
/**********
    09
**********/
/* Fer-ho així ens obliga a fer més crides a la funció */
    //esObligatori(email);
    //esObligatori(password);
    //esObligatori(password2);

    /* Podem millorar açò modificant la funció esObligatori
       de tal manera que li passarem tots els controls a la vegada
       mitjantçant un array -> [nomusuari, email, password, password2]
       anem al punt 10 */

/**********
    11
**********/
    esObligatori([nomusuari, email, password, password2]);

/**********
    13
**********/
/* Anem a afegir la validació de la longitud */
/* Crearem una funció, anem al punt 14 */
    conprovaLongitud(nomusuari, 3, 15);
    conprovaLongitud(password, 6, 25);

/**********
    15
**********/
/* Modificarem ara la validació de l'email
   anem al punt 16 */
   esEmailValid(email);

/**********
    17
**********/
/* Per últim anem a comprovar si les contrasenyes coincideixen.
   anem al punt 18
*/
comprovaContrasenyesIguals(password, password2);
});
