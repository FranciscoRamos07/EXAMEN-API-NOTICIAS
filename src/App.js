import "./App.css";
import { useState } from "react";
import Axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import Swal from 'sweetalert2'

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [puesto, setPuesto] = useState("");
  const [anos, setAnos] = useState();
  const [id, setId] = useState();
 

  const [editar,setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      puesto: puesto,
      anos: anos,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro Exitoso!</strong>",
        html: "<i>el empleado <strong>" + nombre + "</strong> fue registrado con exito!</i>",
        icon: 'success',
        timer: 2000
      })
    });
  };


  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      puesto: puesto,
      anos: anos,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizacion Exitosa!</strong>",
        html: "<i>el empleado <strong>" + nombre + "</strong> fue Actualizado con exito!</i>",
        icon: 'success',
        timer: 2000
      })
    });
  };



  const deleteEmple = (val) => {


    Swal.fire({
      title: 'Confirmar Eliminado',
      html: "<i>Deseas eliminar a <strong>" + val.nombre + "</strong>???</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
          limpiarCampos();
          Swal.fire(
            'Eliminado!',
            val.nombre+' fue Eliminado.',
            'success',

          )
        });
        
      }
    })




  };

  const limpiarCampos = () => {
    setAnos("");
    setNombre("");
    setPuesto("");
    setEdad("");
    setPais("");
    setId("");
    setEditar(false);
  }

  const editarEmpleado = (val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPuesto(val.puesto);
    setPais(val.pais);
    setAnos(val.anos);
    setId(val.id);
   
  }

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  }



  
  
 



  return (
    <div className="container">
 

      <div className="card text-center">
        <div className="card-header">Gestion de empleados</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:{""}
            </span>
            <input
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              value={nombre}
              placeholder="Ingrese Un Nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:{""}
            </span>
            <input
              type="number"
              value={edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais:{""}
            </span>
            <input
              type="text"
              value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Nacionalidad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Puesto:{""}
            </span>
            <input
              type="text"
              value={puesto}
              onChange={(event) => {
                setPuesto(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Puesto"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Años de experiencia:{""}
            </span>
            <input
              type="number"
              value={anos}
              onChange={(event) => {
                setAnos(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese los Años de experiencia "
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">

          {
            editar == true?
            <div>
              <button className="btn btn-warning m-2" onClick={update}>Actualizar</button> 
              <button className="btn btn-danger m-2" onClick={limpiarCampos}>Cancelar</button> 
            </div>
          :
          <button className="btn btn-success" onClick={add}>Registrar</button>
           


          }
                <br/>
                <br/>
          <button className="btn btn-dark" onClick={getEmpleados}>
            Listar
          </button>
          
        </div>
      </div>
{/* ----------------tabla---------------- */}
              <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Pais</th>
                <th scope="col">Puesto</th>
                <th scope="col">Experiencia</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>

            {empleadosList.map((val,key) => {
            return (
            <tr key={val.id}>
            <th >{val.id}</th>
            <td>{val.nombre}</td>
            <td>{val.edad}</td>
            <td>{val.pais}</td>
            <td>{val.puesto}</td>
            <td>{val.anos}</td>
            <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button"
              onClick={()=>{
                editarEmpleado(val)
              }}
              
              class="btn btn-info">Editar</button>
              <button type="button" 
              onClick={()=>{
                deleteEmple(val);
              }}
              class="btn btn-danger">Eliminar</button>
            </div>
            </td>
            </tr>
            )
            })}

            </tbody>
        </table>


    </div>
  );
}

export default App;
