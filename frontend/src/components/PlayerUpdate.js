import React from 'react';
import '../styles/player-update-style.css';
import { fetchData } from "../helpers/RequestHelper";

class PlayerUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            isRightHanded: true,
            birthDate: '',
            countrySymbol: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        fetchData('GET', `player/${this.state.id}`)
            .then((res) => {
                this.setState(
                    {
                        firstName: res.player_data.first_name,
                        lastName: res.player_data.last_name,
                        isRightHanded: !!res.player_data.is_right_handed,
                        birthDate: this.formatDate(new Date(res.player_data.birth_date)),
                        countrySymbol: res.player_data.country_symbol
                    }
                );
            })
            .catch((err) => {
                console.log('err', err);
            });
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
        fetchData('POST', `player/${this.state.id}`, this.state)
            .then((res) => {
                console.log('res', res)
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    handleDelete(event) {
        event.preventDefault();
        if (window.confirm("Czy na pewno chcesz usunąć?")) {
            fetchData('DELETE', `player/${this.state.id}`, {})
                .then((res) => {
                    console.log('res', res)
                })
                .catch((err) => {
                    console.log('err', err);
                });
        }
    }

    render() {
        return (
            <div className="update-container">   
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Imię:
                        <input required
                            name="firstName" type="text" value={this.state.firstName}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Nazwisko:
                        <input required
                            name="lastName" type="text" value={this.state.lastName}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Czy jest praworęczny:
                        <input required
                            name="isRightHanded" type="checkbox" value={this.state.isRightHanded}
                            checked={this.state.isRightHanded}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Data urodzenia:
                        <input required
                            name="birthDate" type="date" value={this.state.birthDate}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Symbol kraju:
                        <input required
                            name="countrySymbol" type="text" minLength="3" maxLength="3" value={this.state.countrySymbol}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <input type="submit" value="Wyślij" />
                </form>
                <button onClick={this.handleDelete}>Usuń</button>
            </div>
        );
    }

    formatDate = (date) => {
        return date.getFullYear() + "-" + ((date.getMonth() + 1).length > 1 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`) +
            "-" + ((date.getDate()).length > 1 ? (date.getDate()) : `0${(date.getDate())}`);
    }
}

export default PlayerUpdate;
