import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


import {
    Container, Row, Col, Button,
    Table, Breadcrumb, BreadcrumbItem,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

import Menu from '../../components/menu'




class Dashboard extends React.Component {

    state = {
        modelo: []
    }


    componentDidMount() {
        axios.get(`http://localhost:3000/dqcmodel`)
            .then(res => {
                const modelo = res.data;
                this.setState({ modelo });
            })
    }

    handleDelete(id) {
        if (window.confirm("Deseja realmente excluir esse modelo?")) {
            axios.delete(`http://localhost:3000/dqcmodel/${id}`)
                .then(res => {
                    console.log(res);
                    console.log(res.data.affectedRows);
                    if (res.data.affectedRows === 1) {
                        alert("Excluído com sucesso!")
                    } else {
                        alert("Não foi possível excluir")
                    }
                    this.componentDidMount();
                })
        }
    }

    render() {
        return (
            <>
                <Menu></Menu>
                <Container className="themed-container">
                    <Row className="mt-4">
                        <Col sm="12">
                            <Breadcrumb>
                                <BreadcrumbItem active>DQCMODEL</BreadcrumbItem>
                                <BreadcrumbItem ><Link to="/dqcmodel/cadastrar">cadastrar</Link></BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col sm="12" className="mt-2">
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">Lista de modelos</CardTitle>



                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>MODEL</th>
                                                <th colspan={2} className="text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.modelo.map(modelos =>
                                                <tr>
                                                    <td>
                                                        {modelos.ID}
                                                    </td>
                                                    <td>
                                                        {modelos.MODEL}
                                                    </td>
                                                    <td className="text-center">
                                                        <Link className="btn btn-primary btn-sm" to={`/dqcmodel/editar/${modelos.ID}`} >Editar</Link>
                                                    </td>
                                                    <td>
                                                        <Button color="danger" size="sm" onClick={() => this.handleDelete(modelos.ID)}>
                                                            Excluir
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                            }
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>


            </>

        )
    }
}


export default Dashboard;