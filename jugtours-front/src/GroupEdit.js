import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';


class GroupEdit extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    emptyItem = {
        name: '',
        address: '',
        city: '',
        stateOrProvince: '',
        country: '',
        postalCode: ''
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            item: this.emptyItem,
            csrfToken: cookies.get('XSRF-TOKEN')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            try {
                const group = await (
                    await fetch(
                        `/api/group/${this.props.match.params.id}`,
                        {credentials: 'include'})
                ).json();
                this.setState({item: group});
            } catch(error) {
                this.props.history.push('/');
            }
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item, csrfToken} = this.state;
        debugger;

        await fetch('/api/group' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'X-XSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/groups');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Group' : 'Add Group'}</h2>;
        return (
            <div>
                <AppNavbar />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                type="text" 
                                name="name" 
                                id="name" 
                                onChange={this.handleChange} 
                                value={item.name || ''}
                                autoComplete="name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input 
                                type="text"
                                name="address"
                                id="address"
                                onChange={this.handleChange}
                                value={item.address} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input
                                type="text" 
                                name="city" 
                                id="city" 
                                onChange={this.handleChange} 
                                value={item.city || ''}
                                autoComplete="address-level1" />
                        </FormGroup>
                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="stateOrProvince">
                                    State/Province
                                </Label>
                                <Input 
                                    type="text" 
                                    name="stateOrProvince" 
                                    id="stateOrProvince" 
                                    onChange={this.handleChange}
                                    value={item.stateOrProvince || ''}
                                    autoComplete="address-level1" />
                            </FormGroup>
                            <FormGroup className="col-md-3 mb-3">
                                <Label for="country">Postal Code</Label>
                                <Input 
                                    type="text"
                                    name="postalCode"
                                    id="postalCode"
                                    onChange={this.handleChange}
                                    value={item.postalCode || ''} />
                            </FormGroup> 
                        </div>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/groups">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withCookies(withRouter(GroupEdit));