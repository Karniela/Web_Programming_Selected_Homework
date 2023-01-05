import example from '../pictures/example.jpg'
import '../css/artcard.css'

const Artcard = ({picture, id, title, painter, key, handleClick}) => {
    return(
        <div class="col-lg-4 col-md-6 mb-4" key={key} onClick={() => handleClick(id)}>
        <div class="card border-light shadow">
          <div class="bg-image hover-overlay ripple " data-mdb-ripple-color="light">
            <img src={picture} class="img-fluid rounded"/>
            <a href="#!">
              <div class="mask" ></div>
            </a>
          </div>
          <div class="card-body" >
            <h5 class="card-title" >{title}</h5>
            <p class="card-text" >{painter}</p>
            
          </div>
        </div>
        </div>    






        
    )
}

export default Artcard;