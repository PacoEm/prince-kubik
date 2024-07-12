const TEXT1 = document.getElementById("message_1");
const TEXT2 = document.getElementById("message_2");

export function Show_message(value){
    value.style.visibility = "visible";
    setTimeout(() => {
        value.style.visibility = "hidden";
    }, 3000);

}