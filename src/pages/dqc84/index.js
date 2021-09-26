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
        axios.get(`http://localhost:3000/dqc84`)
            .then(res => {
                const modelo = res.data;
                this.setState({ modelo });
            })
    }

    handleSearch(nome) {

    }

    handleDelete(id) {
        if (window.confirm("Deseja realmente excluir esse DQC84?")) {
            axios.delete(`http://localhost:3000/dqc84/${id}`)
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
                                <BreadcrumbItem active>DQC84</BreadcrumbItem>
                                <BreadcrumbItem ><Link to="/dqc84/cadastrar">cadastrar</Link></BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col sm="12" className="mt-2">
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">Lista de DQC84</CardTitle>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>FAT_PART_NO</th>
                                                <th>MODEL</th>
                                                <th>TOTAL_LOCATION</th>
                                                <th colspan={2} className="text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.modelo.map(modelos =>
                                                <tr>
                                                    <td>
                                                        {modelos.id_dqc84}
                                                    </td>
                                                    <td>
                                                        {modelos.FAT_PART_NO}
                                                    </td>
                                                    <td>
                                                        {modelos.desc_model}
                                                    </td>
                                                    <td>
                                                        {modelos.TOTAL_LOCATION}
                                                    </td>
                                                    <td>
                                                        <Link className="btn btn-primary btn-sm" to={`/dqc84/editar/${modelos.id_dqc84}`} >Editar</Link>
                                                    </td>
                                                    <td>
                                                        <Button color="danger" size="sm" onClick={() => this.handleDelete(modelos.id_dqc84)}>
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