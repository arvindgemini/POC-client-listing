import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default class ClientList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            allClients: [],
            clients: [],
            selectedClient: {}
        };
    }

    handleClose = () => {
        this.setState({ show: false, selectedClient: {} });
    }

    handleShow = (item) => {
        console.log("Selected Item:", item);
        this.setState({
            show: true,
            selectedClient: item
        });
    }

    filterList = (event) => {
        var updatedList = this.state.allClients;
        const searchString = event.target.value.toLowerCase();
        updatedList = updatedList.filter(function (item) {
            if (item.name.toLowerCase().indexOf(searchString) !== -1 || item.title.toLowerCase().indexOf(searchString) !== -1 || item.company.toLowerCase().indexOf(searchString) !== -1 || item.email.toLowerCase().indexOf(searchString) !== -1)
                return item;
        });
        this.setState({ clients: updatedList });
    }

    componentDidMount() {
        axios.get(`./data/clients.json`)
            .then(res => {
                const clients = res.data;
                this.setState({ allClients: clients, clients });
            })
    }

    render() {
        return (
            <div align="center">
                <div className="filter-list">
                    <form>
                        <fieldset className="form-group">
                            <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList} />
                        </fieldset>
                    </form>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Picture</th>
                            <th scope="col">Name</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.clients.map(client =>
                            <tr key={client.id} onClick={() => this.handleShow(client)}>
                                <td className="align-middle"><img className='image' src={client.picture} /></td>
                                <td className="align-middle">{client.name}</td>
                                <td className="align-middle">{client.title}</td>
                                <td className="align-middle">{client.company}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
                <Modal show={this.state.show && this.state.selectedClient} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Client full info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="table">
                            <tbody>
                                <tr><td>Name</td><td>{this.state.selectedClient.name}</td></tr>
                                <tr><td>Company</td><td>{this.state.selectedClient.company}</td></tr>
                                <tr><td>Email</td><td>{this.state.selectedClient.email}</td></tr>
                                <tr><td>Phone</td><td>{this.state.selectedClient.phone}</td></tr>
                                <tr><td>Address</td><td>{this.state.selectedClient.address}</td></tr>
                            </tbody>
                        </table>

                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}