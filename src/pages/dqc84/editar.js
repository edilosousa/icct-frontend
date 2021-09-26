import React from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

import {
    Form, Input, Container, Row, Col,
    Label, Button, Table, Breadcrumb,
    BreadcrumbItem, Card, CardBody,
    CardTitle
} from 'reactstrap';

import Menu from '../../components/menu'

export default class EditColaborador extends React.Component {
    state = {
        modelo: [],
        id: '',
        model2: '',
        fat_part_no: '',
        total_location: ''
    }
    componentDidMount() {

        axios.get(`http://localhost:3000/dqc84/${this.props.match.params.id}`)
            .then(res => {

                console.log(res)
                const id = res.data.id_dqc84;
                const model2 = res.data.id_model_dqc84;
                const fat_part_no = res.data.FAT_PART_NO;
                const total_location = res.data.TOTAL_LOCATION;
                this.setState({ id, model2, fat_part_no, total_location });
            })
        axios.get(`http://localhost:3000/dqcmodel`)
            .then(res => {
                const modelo = res.data;
                this.setState({ modelo });
            })
    }

    handleChange = event => { this.setState({ fat_part_no: event.target.value }) }
    handleChange1 = event => { this.setState({ model2: event.target.value }) }
    handleChange2 = event => { this.setState({ total_location: event.target.value }) }


    handleSubmit = event => {
        event.preventDefault();

        const id = this.state.id;
        const model = this.state.model2;
        const fat_part_no = this.state.fat_part_no;
        const total_location = this.state.total_location;

        axios.put(`http://localhost:3000/dqc84`, { id: id, model: model, fat_part_no: fat_part_no, total_location: total_location })
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
                                <BreadcrumbItem><Link to="/dqc84/index">DQC84</Link></BreadcrumbItem>
                                <BreadcrumbItem active>editar</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Editar DQC84</CardTitle>
                            <Form onSubmit={this.handleSubmit}>
                                <Row form className="mt-5">
                                    <Col sm={1}>
                                        <Label>ID</Label>
                                        <Input type="text" name="id" disabled value={this.state.id} autocomplete="off" />
                                    </Col>
                                    <Col sm={3}>
                                        <Label>FAT_PART_NO</Label>
                                        <Input type="text" name="fat_part_no" value={this.state.fat_part_no} autocomplete="off" className="text-uppercase" onChange={this.handleChange} />
                                    </Col>
                                    <Col sm={4}>
                                        <Label>MODEL</Label>
                                        <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange1}>
                                            <option>Selecione um modelo</option>
                                            {this.state.modelo.map(modelos =>
                                                <option value={modelos.ID} selected={this.state.model2 == modelos.ID}>{modelos.MODEL}</option>
                                            )}
                                        </Input>
                                    </Col>
                                    <Col sm={4}>
                                        <Label>TOTAL_LOCATION</Label>
                                        <Input type="text" name="modelo" autocomplete="off" className="text-uppercase" value={this.state.total_location} onChange={this.handleChange2} />
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



