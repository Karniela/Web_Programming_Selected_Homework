var host_pic =  document.getElementById("host_pic").src;
const host_name = document.getElementById("you");



// function to remove guest 
function RemoveGuest(e){
    e.parentNode.parentNode.remove();
}


// if the pin button is toggled, exchange the name and picture
function ChangeSpotlight(e){
    let Spotlight_pic = document.querySelector(".Spotlight_Pic").src;
    let Spotlight_name = document.querySelector(".Spotlight_id").innerHTML;
    
    document.querySelector(".Spotlight_Pic").src = e.previousElementSibling.src;
    e.previousElementSibling.src = Spotlight_pic;
    document.querySelector(".Spotlight_id").innerHTML = e.parentNode.nextElementSibling.innerHTML;
    e.parentNode.nextElementSibling.innerHTML = Spotlight_name;
    
    
}