const host_pic =  document.getElementById("host_pic").src;
const collaborators = document.getElementById("Collaborators");
const Spotlight =document.getElementById("Spotlight");
const Guests = document.getElementsByClassName("Guest");
const Host = document.getElementById("host_section");
var Spotlight_Exist = true;
// function to remove guest 
function RemoveGuest(e){
    e.parentNode.parentNode.remove();
    console.log(collaborators.querySelectorAll(".Guest").length);
    console.log(collaborators.querySelector(".Guest").firstChild.nextElementSibling.nextElementSibling.nextElementSibling);
    let Spotlight_pic = document.querySelector(".Spotlight_Pic").src;
    let Spotlight_name = document.querySelector(".Spotlight_id").innerHTML;
    if (collaborators.querySelectorAll(".Guest").length===1 && collaborators.querySelector(".Guest").firstChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML === "你"){
        Spotlight.style.display = "initial";
        Spotlight.style.width = "500%";
        Host.style.width = "100%";
        collaborators.display = "none";
        collaborators.querySelector(".Guest").remove();
        Spotlight_pic =  "https://spy-family.net/assets/img/special/anya/01.png";
        Spotlight_name = "你";
    }
}

function RemoveSpotlight(e){
    var colab1 = document.querySelector('.Guest');
    var colab_clone = colab1.cloneNode(true);
    let Spotlight_pic = document.querySelector(".Spotlight_Pic").src;
    let Spotlight_name = document.querySelector(".Spotlight_id").innerHTML;
    
    colab_clone.id = 'Guest_6';
    colab_clone.firstChild.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.src = Spotlight_pic;
    colab_clone.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = Spotlight_name;
    colab1.after(colab_clone);
    console.log(colab_clone.firstChild.nextElementSibling.firstChild);
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
}

// if the pin button is toggled, exchange the name and picture, and disable the X button
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