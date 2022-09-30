const host_pic =  document.getElementById("host_pic").src;
const collaborators = document.getElementById("Collaborators");
const Spotlight =document.getElementById("Spotlight");
var Spotlight_Exist = true;
// function to remove guest 
function RemoveGuest(e){
    e.parentNode.parentNode.remove();
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
        console.log(e.parentNode.previousElementSibling.firstChild);
        e.parentNode.previousElementSibling.firstChild.nextElementSibling.style.display = "none";   
        }
    else{   
        e.parentNode.previousElementSibling.firstChild.nextElementSibling.style.display = "initial";
        e.parentNode.previousElementSibling.firstChild.nextElementSibling.disabled = false;
    }
    let Spotlight_pic = document.querySelector(".Spotlight_Pic").src;
    document.querySelector(".Spotlight_Pic").src = e.previousElementSibling.src;
    e.previousElementSibling.src = Spotlight_pic;
    document.querySelector(".Spotlight_id").innerHTML = e.parentNode.nextElementSibling.innerHTML;
    e.parentNode.nextElementSibling.innerHTML = Spotlight_name;
    }
    
     
}