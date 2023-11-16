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
//Comprovem l'email
function esEmailValid(email) {
    //js email regex: cercar a google -> js email regex
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()); //True o False
}

function esObligatori(inputArray) {
    inputArray.forEach(function(input) {
        //console.log(input);
        //console.log(input.value);

        if(input.value.trim() === '') {
            //mostraError(input, `${input.id} és obligatori`);
            mostraError(input, 'és obligatori');
        } else {
            mostraCorrecte(input);
        }
    });
}

/**********
    02
**********/
//Event Listeners
/* Primer afegim un listener al form i volem escoltar el submit */
form.addEventListener('submit', function(e) {
    // Amb console.log('submit') veurem que fa un flash...
    //console.log('submit');
    // ...que és el que ha de fer. Volem interceptar açò -> preventDefault
    // preventDefault en aquest cas per e evitarà el submit
    e.preventDefault();    
    //console.log('submit');
    // Vegem que obtenim amb nomusuari
    //console.log(nomusuari); // Tot el control, però només ens interesa el value
    //console.log(nomusuari.value);

     if(nomusuari.value === '') {
        //Si el nomusuari ve buit podem mostrar açò
        //alert('El nom d\'usuari es obligatori');
        //però és molt lleig, farem una funció per tractar errors:
        mostraError(nomusuari, 'El nom d\'usuari és obligatori');
    } else {
        // Igualment tindrém una funció per mostrar quan ha anat bé.
        mostraCorrecte(nomusuari);
    }

/**********
    05
**********/
    // Repetim per a la resta de controls
    if(email.value === '') {
        mostraError(email, 'L\'email és obligatori');
    // aquest elsif el farem en acabar amb password 2
    // Volem que l'email s'escrigui amb format correcte,
    // crearem una funció: anem al punt 06 i tornem
/***********************************************************************
    07 (només el else if, després passen a l'altre fitxer js script2.js)
************************************************************************/
    } else if(!esEmailValid(email.value)) {
        mostraError(email, 'L\'email no és vàlid');
    } else {
        mostraCorrecte(email);
    }

    if(password.value === '') {
        mostraError(password, 'La contrasenya és obligatoria');
    } else {
        mostraCorrecte(password);
    }

    if(password2.value === '') {
        mostraError(password2, 'La contrasenya és obligatoria');
    } else {
        mostraCorrecte(password2);
    }

    esObligatori([nomusuari, email, password, password2]);
});
