import example from '../pictures/example.jpg'
import '../css/artistcard.css'

const Artistcard = ({id,picture,name,key,toArtist}) => {
    return(
        

        <div class="col-lg-4 col-md-6 mb-4" key={key} id={id} onClick={() => toArtist(id)}>
        <div class="card border-light shadow">
          <div class="bg-image hover-overlay ripple " data-mdb-ripple-color="light">
            <img src={picture} class="img-fluid rounded"/>
            <a href="#!">
              <div class="mask" ></div>
            </a>
          </div>
          <div class="card-body" >
            <h5 class="card-title" >{name}</h5>
            
          </div>
        </div>
        </div> 
    )
}

export default Artistcard;