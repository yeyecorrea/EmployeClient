//importamos ChangeEvent recibe cambios y useState guarda esos cambios
import { ChangeEvent, useState} from "react"

//importamos el archivo de configuracion
import { appsettings } from "../settings/appsettings"

//importamos usenavigate que nos permite navegar entre paginas
import { useNavigate } from "react-router-dom"

//importamos la libreria de las alertas
//import Swal from "sweetalert2"

//importamos la interfaz
import { IEmploye } from "../Interfaces/IEmploye"

//importamos lo necesario de reactstrap
import { Container, Row, Col, FormGroup, Form, Label, Input, Button } from "reactstrap"


//Creramos los datos iniciales de nuesta interfaz
const initiaIEmploye = {
    name: "",
    email: "",
    salary: 0
}

export function CreateEmploye() {

    const [employe,setEmpleado] = useState<IEmploye>(initiaIEmploye)
    const navigate = useNavigate();

    //Metodo que actualiza los campos del form
    const inputChangeValue = (event:ChangeEvent<HTMLInputElement>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setEmpleado({ ...employe, [inputName]:inputValue})
    }

    const saveEmploye = async ()=>{
        //invokamos al api y guardamso la respuesta
        const response = await fetch(`${appsettings.apiUrl}Employe/CreateEmploye`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employe)
        })

        if (response.ok) {
            navigate("/")
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

    const back = () =>{
        navigate("/")
    }

    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h4>Nuevo Empleado</h4>
                    <hr />
                    <Form>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" name="name" onChange={inputChangeValue} value={employe.name}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Correo</Label>
                            <Input type="email" name="email" onChange={inputChangeValue} value={employe.email}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Salario</Label>
                            <Input type="number" name="salary" onChange={inputChangeValue} value={employe.salary}></Input>
                        </FormGroup>
                    </Form>
                    <Button color="primary" className="me-4" onClick={saveEmploye}>Guardar</Button>
                    <Button color="secondary" className="me-4" onClick={back}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )
}