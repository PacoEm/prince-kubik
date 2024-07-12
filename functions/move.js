import { rooms } from "../rooms.js";
import { Action } from "./actions.js";

// constants and variables
const ROOMS_CONTAINER = document.getElementById("global_container");
const USER = document.getElementById("user");
const USER_WIDTH = USER.offsetWidth;
const USER_HEIGHT = USER.offsetHeight;
const ROOM_WIDTH = USER.offsetWidth * 12;
const ROOM_HEIGHT = USER.offsetHeight * 8;

let pos_X = 17;
let pos_Y = 22;

// start position of the user in pixels
USER.style.marginLeft = USER_WIDTH * pos_X + "px";
USER.style.marginTop = USER_HEIGHT * pos_Y + "px";

// start position of the scroll bar
window.scrollTo({
  left: 0,
  top: 1800,
  behavior: "instant",
});

// start state of user's display when climbing a ladder in Climb_ladder()
let climb_img = 1;

function Scroll_room(key){

  // ============================================
  // definies from witch room the user is comming
  // to set the direction of the scroll
  // ============================================

  // ============================================
  // if the user is changing of room by the right
  // ============================================

  // middle rooms
  if(key === "d" && USER_HEIGHT * pos_X / 12 === 75){
    window.scrollTo({
      left: 500,
      behavior: "smooth",
    });
  }
  // right rooms
  else if(key === "d" && USER_HEIGHT * pos_X / 24 === 75){
    window.scrollTo({
      left: 2000,
      behavior: "smooth",
    });  
  }
  // ===========================================
  // if the user is changing of room by the left
  // ===========================================
  // left rooms
  if(key === "q" && USER_HEIGHT * pos_X / 11 === 75){
    window.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }
  // middle rooms
  else if(key === "q" && USER_HEIGHT * pos_X / 23 === 75){
    window.scrollTo({
      left: 500,
      behavior: "smooth",
    }); 
  }  
  // ===========================================
  // if the user is changing of room from bottom
  // ===========================================
  // middle rooms
  if(key === "z" && USER_HEIGHT * pos_Y / 15 === 75){
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  }
  // top rooms
  else if(key === "z" && USER_HEIGHT * pos_Y / 7 === 75){
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    }); 
  }
  // ==========================================
  // if the user is changing of room from above
  // ==========================================
  // middle rooms
  if(key === "s" && USER_HEIGHT * pos_Y / 16 === 75){
    window.scrollTo({
      top: 2000,
      behavior: "smooth",
    });
  }
  // ground floor
  else if(key === "s" && USER_HEIGHT * pos_Y / 8 === 75){
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  }
}

function Climb_ladder(){
  // =============================================================
  // image to display when the user climbs or climbs down a ladder
  // =============================================================
  if(climb_img < 2)
  {
    USER.src = './assets/animations/user_anim_ladder_1.png';
    climb_img += 1;
  }else{
    USER.src = './assets/animations/user_anim_ladder_2.png';
    climb_img -= 1;
  }
}

export function Move(key) {
  // ==================================================
  // manage the user's displacements and his animations
  // ==================================================  

  // ====================================
  // horizontal and vertical displacement
  // ====================================
  // up displacement
  if (key === "z" && rooms[pos_Y - 1][pos_X] === "o") {
    pos_Y -= 1;
    Climb_ladder();
  }
  // down displacement
  else if (key === "s" && rooms[pos_Y + 1][pos_X] === "o") {
    pos_Y += 1;
    Climb_ladder();
  }
  // left displacement
  else if (key === "q" && rooms[pos_Y][pos_X - 1] === "o") {
    pos_X -= 1;
    USER.style.transition = "ease 0.07s"
    USER.src = './assets/animations/user_anim_left.gif';
  }
  // right displacement
  else if (key === "d" && rooms[pos_Y][pos_X + 1] === "o") {
    pos_X += 1;
    USER.style.transition = "ease 0.07s"
    USER.src = './assets/animations/user_anim_right.gif';
  }

  // =============================
  // climbing or going down stairs
  // =============================
  // climbing stairs from the left
  else if (key === "q" && rooms[pos_Y][pos_X - 1] === "S") {
    pos_Y -= 1;
    pos_X -= 1;
    USER.style.transition = "none"
    USER.src = './assets/animations/user_anim_left.gif';
  }
  // climbing stairs from the right
  else if (key === "d" && rooms[pos_Y][pos_X + 1] === "S") {
    pos_Y -= 1;
    pos_X += 1;
    USER.style.transition = "none"
    USER.src = './assets/animations/user_anim_right.gif';
  }
  // going down stairs from the left
  else if (key === "q" && rooms[pos_Y + 1][pos_X] === "S") {
    pos_Y += 1;
    pos_X -= 1;
    USER.style.transition = "none"
    USER.src = './assets/animations/user_anim_left_down.gif';
  }
  // going down stairs from the right
  else if (key === "d" && rooms[pos_Y + 1][pos_X] === "S") {
    pos_Y += 1;
    pos_X += 1;
    USER.style.transition = "none"
    USER.src = './assets/animations/user_anim_right_down.gif';
  }

  // update of the user's position in pixels
  USER.style.marginTop = USER_HEIGHT * pos_Y + "px";
  USER.style.marginLeft = USER_WIDTH * pos_X + "px";

Action(key, pos_X, pos_Y);
Scroll_room(key);

}
