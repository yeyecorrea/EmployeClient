//importamos ChangeEvent recibe cambios y useState guarda esos cambios
import { useEffect, useState} from "react"

//importamos el archivo de configuracion
import { appsettings } from "../settings/appsettings"

//importamos usenavigate que nos permite navegar entre paginas
import { Link } from "react-router-dom"

//importamos la libreria de las alertas
//import Swal from "sweetalert2"

//importamos la interfaz
import { IEmploye } from "../Interfaces/IEmploye"

//importamos lo necesario de reactstrap
import { Container, Row, Col, Table, Button } from "reactstrap"


export function ListEmploye(){
    const [employe,setEmpleado] = useState<IEmploye[]>([])

    const listEmploye = async ()=>{
        //invokamos al api y guardamso la respuesta
        const response = await fetch(`${appsettings.apiUrl}Employe/ListEmploye`)
        if (response.ok) {
            const data = await response.json()
            setEmpleado(data)
        }else{
            /*
            Swal.fire({
                title:"Error!",
                text:"Nose puede guardar el empleado",
                icon:"warning"
            })
            */
        }
    }

    useEffect(() => {
        listEmploye()
    },[])

    return (
        <Container className="mt-5">
             <Row>
                  <Col sm={{ size: 8, offset: 2 }}>
                       <h4>Lista de empleado</h4>
                       <hr />
                       <Link className="btn btn-success mb-3" to="/createEmploye" >Nuevo Empleado</Link>

                       <Table bordered>
                            <thead>
                                 <tr>
                                      <th>Nombre</th>
                                      <th>Correo</th>
                                      <th>Sueldo</th>
                                      <th></th>
                                 </tr>
                            </thead>
                            <tbody>
                                 {
                                      employe.map((item) => (
                                           <tr key={item.employeid}>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.salary}</td>
                                                <td>
                                                     <Link className="btn btn-primary me-2" to={`/editarempleado/${item.employeid}`} >Editar</Link>
                                                     <Button color="danger" onClick={() => {  }}>
                                                          Eliminar
                                                     </Button>
                                                </td>
                                           </tr>
                                      ))
                                 }
                            </tbody>
                       </Table>
                  </Col>
             </Row>
        </Container>
   )
}