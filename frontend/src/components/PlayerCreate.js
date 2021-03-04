import React from 'react';
import '../styles/ranking-create-style.css';
import { fetchData } from "../helpers/RequestHelper";

class PlayerCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            isRightHanded: true,
            birthDate: '',
            countrySymbol: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetchData('PUT', 'player', this.state)
            .then((res) => {
                console.log('res', res)
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Imię:
                    <input required
                        name="firstName" type="text"
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Nazwisko:
                    <input required
                        name="lastName" type="text"
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Czy jest praworęczny:
                    <input required
                        name="isRightHanded" type="checkbox"
                        checked={this.state.isRightHanded}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Data urodzenia:
                    <input required
                        name="birthDate" type="date"
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Symbol kraju:
                    <input required
                        name="countrySymbol" type="text" minLength="3" maxLength="3"
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <input type="submit" value="Wyślij" />
            </form>
        );
    }
}

export default PlayerCreate;
