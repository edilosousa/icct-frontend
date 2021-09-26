import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


import {
    Container, Row, Col, Button, Table,
    Breadcrumb, BreadcrumbItem, Card, CardBody,
    CardTitle
} from 'reactstrap';

import Menu from '../../components/menu'




class Dashboard extends React.Component {

    state = {
        modelo: []
    }




    componentDidMount() {
        axios.get(`http://localhost:3000/dqc841`)
            .then(res => {
                const modelo = res.data;
                this.setState({ modelo });
            })
    }

    handleSearch(nome) {

    }

    handleDelete(id) {
        if (window.confirm("Deseja realmente excluir esse DQC841?")) {
            axios.delete(`http://localhost:3000/dqc841/${id}`)
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
                                <BreadcrumbItem active>DQC841</BreadcrumbItem>
                                <BreadcrumbItem ><Link to="/dqc841/cadastrar">cadastrar</Link></BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col sm="12" className="mt-2">
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">Lista de DQC841</CardTitle>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>FAT_PART_NO</th>
                                                <th>PARTS_NO</th>
                                                <th>UNT_USG</th>
                                                <th>DESCRIPTION</th>
                                                <th>REF_DESIGNATOR</th>
                                                <th colSpan={2} className="text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.modelo.map(modelos =>
                                                <tr>
                                                    <td>
                                                        {modelos.iddcq841}
                                                    </td>
                                                    <td>
                                                        {modelos.fatpart}
                                                    </td>
                                                    <td>
                                                        {modelos.PARTS_NO}
                                                    </td>
                                                    <td>
                                                        {modelos.UNT_USG}
                                                    </td>
                                                    <td>
                                                        {modelos.DESCRIPTION}
                                                    </td>
                                                    <td>
                                                        {modelos.REF_DESIGNATOR}
                                                    </td>
                                                    <td>
                                                        <Link className="btn btn-primary btn-sm" to={`/dqc841/editar/${modelos.iddcq841}`} >Editar</Link>
                                                    </td>
                                                    <td>
                                                        <Button color="danger" size="sm" onClick={() => this.handleDelete(modelos.iddcq841)}>
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