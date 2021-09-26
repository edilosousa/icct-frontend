import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Form, Input, Container, Row, Col, Label, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import Menu from '../../components/menu'

export default class EditColaborador extends React.Component {
    state = {
        modelo: [],
        id: '',
        fat_part_no: '',
        unt_usg: '',
        parts_no: '',
        description: '',
        ref_designator: ''
    }
    componentDidMount() {

        axios.get(`http://localhost:3000/dqc841/${this.props.match.params.id}`)
            .then(res => {

                console.log(res)
                const id = res.data.ID;
                const fat_part_no = res.data.FAT_PART_NO;
                const parts_no = res.data.PARTS_NO;
                const unt_usg = res.data.UNT_USG;
                const description = res.data.DESCRIPTION;
                const ref_designator = res.data.REF_DESIGNATOR;

                this.setState({ id, fat_part_no, parts_no, unt_usg, description, ref_designator });
            })
        axios.get(`http://localhost:3000/dqc84`)
            .then(res => {
                const modelo = res.data;
                this.setState({ modelo });
            })
    }

    handleChange1 = event => { this.setState({ fat_part_no: event.target.value }) }
    handleChange2 = event => { this.setState({ parts_no: event.target.value }) }
    handleChange3 = event => { this.setState({ unt_usg: event.target.value }) }
    handleChange4 = event => { this.setState({ description: event.target.value }) }
    handleChange5 = event => { this.setState({ ref_designator: event.target.value }) }


    handleSubmit = event => {
        event.preventDefault();

        const id = this.state.id;
        const fat_part_no = this.state.fat_part_no;
        const parts_no = this.state.parts_no;
        const unt_usg = this.state.unt_usg;
        const description = this.state.description;
        const ref_designator = this.state.ref_designator;

        axios.put(`http://localhost:3000/dqc841`, { id: id, fat_part_no: fat_part_no, parts_no: parts_no, unt_usg: unt_usg, description: description, ref_designator: ref_designator })
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
                                <BreadcrumbItem><Link to="/dqc841/index">DQC841</Link></BreadcrumbItem>
                                <BreadcrumbItem active>editar</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Row form className="mt-5">
                            <Col sm={1}>
                                <Label>ID</Label>
                                <Input type="text" name="id" disabled value={this.state.id} autocomplete="off" />
                            </Col>
                            <Col sm={3}>
                                <Label>FAT_PART_NO</Label>
                                <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange1}>
                                    <option>Selecione um fat_part_no</option>
                                    {this.state.modelo.map(modelos =>
                                        <option value={modelos.id_dqc84} selected={this.state.fat_part_no === modelos.id_dqc84}>{modelos.FAT_PART_NO}</option>
                                    )}
                                </Input>
                            </Col>
                            <Col sm={4}>
                                <Label>PARTS NO</Label>
                                <Input type="text" name="parts_no" autocomplete="off" value={this.state.parts_no} className="text-uppercase" onChange={this.handleChange2} />
                            </Col>
                            <Col sm={4}>
                                <Label>UNT_SG</Label>
                                <Input type="text" name="unt_sg" autocomplete="off" value={this.state.unt_usg} className="text-uppercase" onChange={this.handleChange3} />
                            </Col>
                        </Row>
                        <Row form className="mt-5">
                            <Col sm={4}>
                                <Label>DESCRIPTION</Label>
                                <Input type="text" name="description" autocomplete="off" value={this.state.description} className="text-uppercase" onChange={this.handleChange4} />
                            </Col>
                            <Col sm={4}>
                                <Label>REF_DESIGNATOR</Label>
                                <Input type="text" name="ref_designator" autocomplete="off" value={this.state.ref_designator} className="text-uppercase" onChange={this.handleChange5} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2}>
                                <Button type="submit" className="btn btn-warning mt-3">Alterar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </>
        )
    }
}



