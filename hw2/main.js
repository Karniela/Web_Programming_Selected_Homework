const host_pic =  document.getElementById("host_pic").src;
const collaborators = document.getElementById("Collaborators");
const Spotlight =document.getElementById("Spotlight");

// function to remove guest 
function RemoveGuest(e){
    e.parentNode.parentNode.remove();
}

function RemoveSpotlight(e){
    collaborators.style.width = ('100%');  
    Spotlight.style.display = "none";

}
// if the pin button is toggled, exchange the name and picture, and disable the X button
function ChangeSpotlight(e){
    let Spotlight_name = document.querySelector(".Spotlight_id").innerHTML;
    if (Spotlight_name === '你' ){
        console.log(e.parentNode.previousElementSibling.firstChild);
        e.parentNode.previousElementSibling.firstChild.nextElementSibling.visibility = 'hidden';
        e.parentNode.previousElementSibling.firstChild.nextElementSibling.disabled = true;
        }
    else{
       
        e.parentNode.previousElementSibling.firstChild.nextElementSibling.visibility = 'visible';
        e.parentNode.previousElementSibling.firstChild.nextElementSibling.disabled = false;
    }
    let Spotlight_pic = document.querySelector(".Spotlight_Pic").src;
    
    
    document.querySelector(".Spotlight_Pic").src = e.previousElementSibling.src;
    e.previousElementSibling.src = Spotlight_pic;
    document.querySelector(".Spotlight_id").innerHTML = e.parentNode.nextElementSibling.innerHTML;
    e.parentNode.nextElementSibling.innerHTML = Spotlight_name;
    
    
     
}