import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

//import Swal from 'sweetalert2'

function App() {
 
 

  

  const [noticiasList, setNoticias] = useState([]);
  const [search, setSearch] = useState("");


  const getNoticias = ()  => {
    Axios.get("http://localhost:3001/noticias").then((response) => {
      setNoticias(response.data);
    });
  }

  const searcher =(e)=>{
    setSearch(e.target.value)
    console.log(e.target.value)
  }



  let results = []
  if(!search){
    results = noticiasList


  }else{

    results = noticiasList.filter((dato)=>
    dato.zona.toLowerCase().includes(search.toLocaleLowerCase()))
  }


  useEffect(()=>{getNoticias()},[])






  
 



  return (
<div className="background">
    <div className="container">
            
        <nav className="navbar  border-bottom border-body navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand navText" onClick={getNoticias}>NOTICIAS STORM</a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active navText" aria-current="page" href="#">Home</a>
                </li>
              </ul>
              <form className="d-flex navSearch" role="search">
                <input value={search} onChange={searcher} className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search"/>
                <button className="btn btn-outline-light" type="submit">Buscar</button>
              </form>
            </div>
          </div>
        </nav>












      


{results.map((val,key) => {
          return(
<div className="contenedores">
  <div className="row">
            {/* <img key={val.id} src={val.imagen} alt=""></img> */}

    <div className="col-xl-6 col-sm-2">
      <div className="card cardDisplay" style={{width: '20rem'}}>
          <img key={val.id} src={val.imagen} className="card-img-top" alt="avatar"/>
        <div className="card-body">
          <div className="subject-txt">
          <h5 className="card-title title-txt">{val.topic}</h5>
          <p className="card-text">{val.subject}</p>
          
      <div className="botton">
          <p className="card-text">{val.zona}</p>
          <p className="card-text">{val.fecha}</p>

        <a href="https://www.forbes.com/?sh=29d31ba2254c" className="btn btn-dark">Mas informacion</a>
          </div>
            </div>

        </div>
      </div>

          </div>
            </div>
            </div>
          )})}





{/* ----------------tabla---------------- */}


 {/* <button className="btn btn-dark" onClick={getNoticias}>
            Listar
          </button>  */}


        
 



  </div>
</div>
  );
}

export default App;
