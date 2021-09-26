import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import {
    Form, Input, Container, Row, Col,
    Label, Button, Breadcrumb,
    BreadcrumbItem, Card, CardBody,
    CardTitle
} from 'reactstrap';

import Menu from '../../components/menu'


class CadastrarColaborador extends React.Component {

    state = {
        modelo: [

        ],
        fat_part_no: '',
        total_location: '',
        modelo2: ''
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/dqcmodel`)
            .then(res => {
                const modelo = res.data;
                this.setState({ modelo });
            })
    }

    handleChange = event => { this.setState({ fat_part_no: event.target.value }) }
    handleChange2 = event => { this.setState({ modelo2: event.target.value }) }
    handleChange3 = event => { this.setState({ total_location: event.target.value }) }

    handleSubmit = event => {
        event.preventDefault();

        const fat_part_no = this.state.fat_part_no;
        const modelo = this.state.modelo2;
        const total_location = this.state.total_location;

        axios.post(`http://localhost:3000/dqc84`, { fat_part_no, modelo, total_location })
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
                                <BreadcrumbItem><Link to="/dqc84/index">DQC84</Link></BreadcrumbItem>
                                <BreadcrumbItem active>cadastrar</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Cadastrar DQC84</CardTitle>
                            <Form onSubmit={this.handleSubmit}>
                                <Row form className="mt-5">
                                    <Col sm={4}>
                                        <Label>FAT_PART_NO</Label>
                                        <Input type="text" name="modelo" autocomplete="off" className="text-uppercase" onChange={this.handleChange} />
                                    </Col>
                                    <Col sm={4}>
                                        <Label>MODEL</Label>
                                        <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange2}>
                                            <option>Selecione um modelo</option>
                                            {this.state.modelo.map(modelos =>
                                                <option value={modelos.ID}>{modelos.MODEL}</option>
                                            )}
                                        </Input>
                                    </Col>
                                    <Col sm={4}>
                                        <Label>TOTAL_LOCATION</Label>
                                        <Input type="text" name="modelo" autocomplete="off" className="text-uppercase" onChange={this.handleChange3} />
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