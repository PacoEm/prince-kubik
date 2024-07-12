import { rooms } from "../rooms.js";
import { Show_message} from "./show_message.js";

const MECA = document.getElementById("mecanisme_1");
const GEAR = document.getElementById("engrenage");
const LIB = document.getElementById("biblio");
const LIB2 = document.getElementById("biblio_2");
const KEY  = document.getElementById("clef");
const KEY_CONT = document.getElementById("conteneur_clef");
const TRUNK = document.getElementById("coffre_ferme");
const WAND = document.getElementById("baguette");
const STAR  = document.getElementById("etoile");
const TEXT1 = document.getElementById("message_1");
const TEXT2 = document.getElementById("message_2");
const END = document.getElementById("end_screen");

const TAKE = new Audio('./assets/sounds/vibraslap.mp3');
const USE = new Audio('./assets/sounds/grincement.mp3');
const WIN = new Audio('./assets/sounds/victoire.mp3');
WIN.volume = 0.5;

GEAR.style.visibility = "visible";
WAND.style.visibility = "hidden";
STAR.style.visibility = "hidden";
TEXT1.style.visibility = "hidden";
TEXT2.style.visibility = "hidden";
KEY.style.visibility = "visible";
END.style.visibility = "hidden";


let mecanism_state;

let meca_state = "not_ready";
let trunk_state = "not_open";

function test_meca(value){
  return value;
}
function test_trunk(value){
  return value;
}

export function Action(key, pos_X, pos_Y){

    // ===============================
    // if the user is trying an action
    // ===============================
    if (key === "a"){
      // =============================
      // management of gear + mecanism
      // =============================
      // if the user is in front of the GEAR
      if (rooms[pos_Y][pos_X + 1] === "G"){
        // if the GEAR is visible, user take it and gear disapears
        if (GEAR.style.visibility = "visible"){
          GEAR.style.visibility = "hidden";
          TAKE.play();
        }
      }

      // if the user is in front of mecanism and the gear is not taken, a message appears
      if (rooms[pos_Y][pos_X + 1] === "M" && GEAR.style.visibility === "visible" && meca_state === "not_ready"){
        Show_message(TEXT1);
      }
      // if the user is in front of mecanism and the gear taken, user put it on mecanism
      else if (rooms[pos_Y][pos_X + 1] === "M" && GEAR.style.visibility === "hidden" && meca_state === "not_ready"){
        MECA.src = './assets/images/elements/switch_complet.png';
        meca_state = test_meca("ready");
        TAKE.play();       
      }

      // if the user is in front of mecanism ready to use, switch on, library goes left
      else if (rooms[pos_Y][pos_X + 1] === "M" && meca_state === "ready"){
          MECA.src = './assets/images/elements/switch_on.png';
          LIB.style.transform = "translateX(-119px)";
          LIB.style.transition = "ease 1.5s";
          LIB2.style.transform = "translateX(-119px)";
          LIB2.style.transition = "ease 1.5s";
          KEY_CONT.style.transform = "translateX(-119px)";
          KEY_CONT.style.transition = "ease 1.5s";
          rooms[14][14] = "o";
          meca_state = test_meca("on");
          USE.play();
      }

      // if the user is in front of the mecanism is on, switch off, library goes right 
      else if (rooms[pos_Y][pos_X + 1] === "M" && meca_state === "on"){
          MECA.src = './assets/images/elements/switch_off.png';
          LIB.style.transform = "translateX(0px)";
          LIB.style.transition = "ease 1.5s";
          LIB2.style.transform = "translateX(0px)";
          LIB2.style.transition = "ease 1.5s";
          KEY_CONT.style.transform = "translateX(0px)";
          KEY_CONT.style.transition = "ease 1.5s";
          rooms[14][14] = " ";
          meca_state = test_meca("ready");
          USE.play();
      } 
      // _____________________________________________________________________________

      // ==============================
      // management of key + magic wand
      // ==============================    
      // if the user is in front of the key
      if (rooms[pos_Y][pos_X - 1] === "K"){
        // if the key is visible, user take it and the key disapears
        if (KEY.style.visibility = "visible"){
          KEY.style.visibility = "hidden";
          TAKE.play();
        }
      }  
      // if the key is in front of trunk but key is not taken, a message appears 
      if (rooms[pos_Y][pos_X + 1] === "T" && KEY.style.visibility === "visible"){
        Show_message(TEXT2);
      }    
      // if the key is taken, the user can open the trunk  
      if (rooms[pos_Y][pos_X + 1] === "T" && KEY.style.visibility === "hidden"){
        TRUNK.src = './assets/images/elements/coffre_baguette_ouvert.png';
        TRUNK.style.transform = "translateY(-19px)";
        WAND.style.visibility = "visible";
        STAR.style.visibility = "visible";
        rooms[pos_Y][pos_X + 1] = "p";
        USE.play();
      }    
      // if the trunk is opened, user can take the wand 
      else if (rooms[pos_Y][pos_X + 1] === "p"){
        WAND.style.visibility = "hidden";
        STAR.style.visibility = "hidden";
        rooms[7][5] = "b";
        console.log(rooms);
        TAKE.play();
      }    
      // _____________________________________________________________________________

      // ========================
      // management of end screen
      // ========================
      // if user is in front of princess and the wan is taken, the game ends  
      if (rooms[pos_Y][pos_X - 1] === "b"){
        END.style.visibility = "visible";
        WIN.play();
      }       
    }
}

