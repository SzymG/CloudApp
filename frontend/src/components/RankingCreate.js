import React from 'react';
import '../styles/player-create-style.css';
import { fetchData } from "../helpers/RequestHelper";

class RankingCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rankingData: {
                playerId: this.props.match.params.playerId,
                dateCreation: '',
                rank: '',
                points: 0
            },
            playerName: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
        
    componentDidMount() {
        fetchData('GET', `player/${this.state.rankingData.playerId}`)
            .then((res) => {
                console.log('player', res);
                this.setState(
                    {
                        playerName: `${res.player_data.first_name} ${res.player_data.last_name}`,
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
        this.setState((prevState) => ({
            rankingData: {
                ...prevState.rankingData,
                [name]: value
            }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        fetchData('PUT', `ranking/${this.state.rankingData.playerId}`, this.state.rankingData)
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
                    Zawodnik: {this.state.playerName}
                </label>
                <br />
                <label>
                    Data rankingu:
                    <input required
                        name="dateCreation" type="date"
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Ranking:
                    <input required
                        name="rank" type="number"
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Punkty:
                    <input required
                        name="points" type="number"
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <input type="submit" value="Wyślij" />
            </form>
        );
    }
}

export default RankingCreate;
