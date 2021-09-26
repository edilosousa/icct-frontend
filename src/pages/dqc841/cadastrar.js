import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Form, Input, Container, Row, Col, Label, Button, Table, Breadcrumb, BreadcrumbItem, Se } from 'reactstrap';

import Menu from '../../components/menu'


class CadastrarColaborador extends React.Component {

    state = {
        modelo: [

        ],
        fat_part_no: '',
        parts_no: '',
        unt_sg: '',
        description: '',
        ref_designator: '',
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/dqc84`)
            .then(res => {
                const modelo = res.data;
                this.setState({ modelo });
            })
    }

    handleChange1 = event => { this.setState({ fat_part_no: event.target.value }) }
    handleChange2 = event => { this.setState({ parts_no: event.target.value }) }
    handleChange3 = event => { this.setState({ unt_sg: event.target.value }) }
    handleChange4 = event => { this.setState({ description: event.target.value }) }
    handleChange5 = event => { this.setState({ ref_designator: event.target.value }) }

    handleSubmit = event => {
        event.preventDefault();

        const fat_part_no = this.state.fat_part_no;
        const parts_no = this.state.parts_no;
        const unt_sg = this.state.unt_sg;
        const description = this.state.description;
        const ref_designator = this.state.ref_designator;

        axios.post(`http://localhost:3000/dqc841`, { fat_part_no, parts_no, unt_sg, description, ref_designator })
            .then(res => {
                console.log(res);
                if (res.data.affectedRows === 1) {
                    alert("Novo dqc841 cadastrado com sucesso!")
                    
                } else {
                    alert("Não foi possível salvar um novo dqc841")
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
                                <BreadcrumbItem><Link to="/dqc841/index">DQC841</Link></BreadcrumbItem>
                                <BreadcrumbItem active>cadastrar</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    
                    <Form onSubmit={this.handleSubmit}>
                        <Row form className="mt-5">
                            <Col sm={4}>
                                <Label>FAT_PART_NO</Label>
                                <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange1}>
                                    <option>Selecione um fat_part_no</option>
                                    {this.state.modelo.map(modelos =>
                                        <option value={modelos.id_dqc84}>{modelos.FAT_PART_NO}</option>
                                    )}
                                </Input>
                            </Col>
                            <Col sm={4}>
                                <Label>PARTS NO</Label>
                                <Input type="text" name="parts_no" autocomplete="off" className="text-uppercase" onChange={this.handleChange2} />
                            </Col>
                            <Col sm={4}>
                                <Label>UNT_SG</Label>
                                <Input type="text" name="unt_sg" autocomplete="off" className="text-uppercase" onChange={this.handleChange3} />
                            </Col>
                        </Row>
                        <Row form className="mt-5">
                            <Col sm={4}>
                                <Label>DESCRIPTION</Label>
                                <Input type="text" name="description" autocomplete="off" className="text-uppercase" onChange={this.handleChange4} />
                            </Col>
                            <Col sm={4}>
                                <Label>REF_DESIGNATOR</Label>
                                <Input type="text" name="ref_designator" autocomplete="off" className="text-uppercase" onChange={this.handleChange5} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2}>
                                <Button type="submit" className="btn btn-success mt-3">Salvar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>

        )
    }
}


export default CadastrarColaborador;