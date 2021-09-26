import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import {
    Form, Input, Container,
    Row, Col, Label, Button,
    Breadcrumb, BreadcrumbItem,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

import Menu from '../../components/menu'


class CadastrarColaborador extends React.Component {

    state = {
        modelo: ''
    }


    handleChange = event => { this.setState({ modelo: event.target.value }) }


    handleSubmit = event => {
        event.preventDefault();

        const modelo = this.state.modelo;


        axios.post(`http://localhost:3000/dqcmodel`, { modelo })
            .then(res => {
                console.log(res);
                if (res.data.affectedRows === 1) {
                    alert("Novo modelo cadastrado com sucesso!")
                } else {
                    alert("Não foi possível salvar um novo modelo")
                }
            })
    }

    render() {
        return (
            <>
                <Menu></Menu>
                <Container className="themed-container">

                    <Row className="mt-4">
                        <Col sm={12}>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/dqcmodel/index">DQCMODEL</Link></BreadcrumbItem>
                                <BreadcrumbItem active>cadastrar</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Cadastrar modelos</CardTitle>
                            <Form onSubmit={this.handleSubmit}>
                                <Row form className="mt-5">
                                    <Col sm={12}>
                                        <Label>Modelo</Label>
                                        <Input type="text" name="modelo" value={this.state.modelo} autocomplete="off" className="text-uppercase" onChange={this.handleChange} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={2}>
                                        <Button type="submit" className="btn btn-success mt-3">Salvar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>

                </Container>
            </>

        )
    }
}


export default CadastrarColaborador;