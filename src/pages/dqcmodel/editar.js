import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import {
    Form, Input, Container, Row,
    Col, Label, Button,
    Breadcrumb, BreadcrumbItem,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

import Menu from '../../components/menu'

export default class EditColaborador extends React.Component {
    state = {
        id: '',
        model: ''
    }
    componentDidMount() {
        axios.get(`http://localhost:3000/dqcmodel/${this.props.match.params.id}`)
            .then(res => {
                const id = res.data.ID;
                const model = res.data.MODEL;
                this.setState({ id, model });
            })
    }

    handleChange = event => { this.setState({ id: event.target.value }) }
    handleChange2 = event => { this.setState({ model: event.target.value }) }


    handleSubmit = event => {
        event.preventDefault();

        const id = this.state.id;
        const model = this.state.model;

        axios.put(`http://localhost:3000/dqcmodel`, { id: id, model: model })
            .then(res => {
                console.log(res);
                console.log(res.data.affectedRows);
                if (res.data.affectedRows === 1) {
                    alert("Editado com sucesso!")
                } else {
                    alert("Não foi possível editar")
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
                                <BreadcrumbItem active>editar</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Editar modelo</CardTitle>
                            <Form onSubmit={this.handleSubmit}>
                                <Row form className="mt-5">
                                    <Col sm={1}>
                                        <Label>ID</Label>
                                        <Input type="text" name="id" disabled value={this.state.id} autocomplete="off" onChange={this.handleChange} />
                                    </Col>
                                    <Col sm={11}>
                                        <Label>MODEL</Label>
                                        <Input type="text" name="model" value={this.state.model} autocomplete="off" className="text-uppercase" onChange={this.handleChange2} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={2}>
                                        <Button type="submit" className="btn btn-warning mt-3">Alterar</Button>
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



