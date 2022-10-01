const host_pic =  document.getElementById("host_pic").src;
const collaborators = document.getElementById("Collaborators");
const Spotlight =document.getElementById("Spotlight");
const Guests = document.getElementsByClassName("Guest");
const Host = document.getElementById("host_section");
const number_of_guests = getRandomInt(16);
var Spotlight_Exist = true;
var Today = new Date;

// function to show current time

function showtime(){
    var time_now = Today.toLocaleTimeString();
    return time_now
}
setInterval(() => {
    document.getElementById("time").innerHTML = showtime();
}, 1000);

// function to remove guest 
function RemoveGuest(e){
    e.parentNode.parentNode.remove();
    
    if (collaborators.querySelectorAll(".Guest").length===1 && collaborators.querySelector(".Guest").firstChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML === "你"){
        
        Spotlight.style.display = "initial";
        Spotlight.style.width = "500%";
        Host.style.width = "100%";
        collaborators.display = "none";
        collaborators.querySelector(".Guest").remove(); 
        document.querySelector(".Spotlight_Pic").src =  "https://spy-family.net/assets/img/special/anya/01.png";
        document.querySelector(".Spotlight_id").innerHTML = "你"; 
    }
    var all_participants = collaborators.querySelectorAll(".Guest");
    var participants_num = all_participants.length;
    var last_index = participants_num-1;
    var last_two_index = participants_num-2;
    if (participants_num%2 !== 0 && Spotlight_Exist === true){
            for (var i = 0; i < participants_num; i++) {
            console.log("change width");
            all_participants[i].style.width = "47%";
            }
            all_participants[last_index].style.width = "75%";
        }else{
            for (var i = 0; i < participants_num; i++) {
            console.log("change width");
            all_participants[i].style.width = "47%";
            }
        }
    if (participants_num%3 === 1 && Spotlight_Exist === false){
            for (var i = 0; i < participants_num; i++) {
                console.log("change width");
                all_participants[i].style.width = "30%";
            }
            all_participants[last_index].style.width = "50%";
        }else if(participants_num%3 === 2 && Spotlight_Exist === false){
            for (var i = 0; i < participants_num; i++) {
                console.log("change width");
                all_participants[i].style.width = "30%";
            }
            all_participants[last_index].style.width = "40%";
            all_participants[last_two_index].style.width = "40%"
        }else if(participants_num%3 === 0 && Spotlight_Exist === false){
            for (var i = 0; i < participants_num; i++) {
                console.log("change width");
                all_participants[i].style.width = "30%";
            }
            
        }
}

// funtion to remove current spotlight and change into grid view
function RemoveSpotlight(e){
    var colab1 = document.querySelector('.Guest');
    var colab_clone = colab1.cloneNode(true);
    let Spotlight_pic = document.querySelector(".Spotlight_Pic").src;
    let Spotlight_name = document.querySelector(".Spotlight_id").innerHTML;
    
    colab_clone.id = 'Guest_6';
    colab_clone.firstChild.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.src = Spotlight_pic;
    colab_clone.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = Spotlight_name;
    colab1.after(colab_clone);
    
    if (Spotlight_name === '你' ){
        colab_clone.firstChild.nextElementSibling.firstChild.nextElementSibling.style.display = "none";   
        }else{
            colab_clone.firstChild.nextElementSibling.firstChild.nextElementSibling.style.display = "initial";   
        }
    for (var i = 0; i < Guests.length; i++) {
        Guests[i].style.width=("30%");    
        Guests[i].style.height=("40%");
        }
    collaborators.style.width = ('100%');  
    collaborators.style.height = ('90%');
    Spotlight.style.display = "none";
    Spotlight_Exist = false;

    const all_participants = collaborators.querySelectorAll(".Guest");
    const participants_num = all_participants.length;
    var last_index = participants_num-1;
    var last_two_index = participants_num-2;
    
    if (participants_num%3 === 1 && Spotlight_Exist === false){
            all_participants[last_index].style.width = "50%";
        }else if(participants_num%3 === 2 && Spotlight_Exist === false){
            all_participants[last_index].style.width = "40%";
            all_participants[last_two_index].style.width = "40%"
        }
}

// If the pin button is toggled, exchange the name and picture, and disable the X button
function ChangeSpotlight(e){
    let Spotlight_name = document.querySelector(".Spotlight_id").innerHTML;
    if (Spotlight_Exist === true){
    if (Spotlight_name === '你' ){
        e.parentNode.previousElementSibling.firstChild.nextElementSibling.style.display = "none";   
        }else{   
        e.parentNode.previousElementSibling.firstChild.nextElementSibling.style.display = "initial";
        }
    let Spotlight_pic = document.querySelector(".Spotlight_Pic").src;
    document.querySelector(".Spotlight_Pic").src = e.previousElementSibling.src;
    e.previousElementSibling.src = Spotlight_pic;
    document.querySelector(".Spotlight_id").innerHTML = e.parentNode.nextElementSibling.innerHTML;
    e.parentNode.nextElementSibling.innerHTML = Spotlight_name;



    }else{
        Spotlight.style.display = ("initial");
        collaborators.style.width= ("27%");
        document.querySelector(".Spotlight_Pic").src = e.previousElementSibling.src;
        document.querySelector(".Spotlight_id").innerHTML = e.parentNode.nextElementSibling.innerHTML;
        console.log(e.parentNode.parentNode);
        e.parentNode.parentNode.remove();
        Spotlight_Exist = true;
    }   
}

// function to add new participants
function AddPeople(e){
    var colab1 = document.querySelector('.Guest');
    if (collaborators.querySelectorAll(".Guest").length===0){
        alert('You just kicked everyone out. You deserve to be alone:)');
    }else{
        var nickname = prompt("Please enter your nickname");
        var profile_image = prompt("Please choose your profile image(enter link)", "https://spy-family.net/assets/img/special/summermission04/05.png");
        var colab_clone = colab1.cloneNode(true);
        colab_clone.id = nickname;
        colab_clone.firstChild.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.src = profile_image;
        colab_clone.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = nickname;
        colab1.after(colab_clone);
        
        const all_participants = collaborators.querySelectorAll(".Guest");
        const participants_num = all_participants.length;
        var last_index = participants_num-1;
        var last_two_index = participants_num-2;

        if (participants_num%2 !== 0 && Spotlight_Exist === true){
            for (var i = 0; i < participants_num; i++) {
                console.log("change width");
                all_participants[i].style.width = "47%";
                }
                
                all_participants[last_index].style.width = "75%";
            }else{
                for (var i = 0; i < participants_num; i++) {
                    console.log("change width");
                    all_participants[i].style.width = "47%";
                    }
            }
        if (participants_num%3 === 1 && Spotlight_Exist === false){
            for (var i = 0; i < participants_num; i++) {
                console.log("change width");
                all_participants[i].style.width = "30%";
                }
            all_participants[last_index].style.width = "50%";
        }else if(participants_num%3 === 2 && Spotlight_Exist === false){
            for (var i = 0; i < participants_num; i++) {
                console.log("change width");
                all_participants[i].style.width = "30%";
            }
            all_participants[last_index].style.width = "40%";
            all_participants[last_two_index].style.width = "40%"
        }else if(participants_num%3 === 0 && Spotlight_Exist === false){
            for (var i = 0; i < participants_num; i++) {
                console.log("change width");
                all_participants[i].style.width = "30%";
            }
                
            }
    }
}

// show random number of participant
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function show_random_number(){
    
    const all_participants = collaborators.querySelectorAll(".Guest");
    const participants_num = all_participants.length;
    console.log(number_of_guests);
    console.log(all_participants.length);   
    for (var i = number_of_guests; i < participants_num; i++) {
        all_participants[i].remove();
        }
    if (number_of_guests%2 !== 0){
        var last_index = number_of_guests-1;
        all_participants[last_index].style.width = "75%";
    }

}
show_random_number();