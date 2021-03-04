import React from 'react';
import '../styles/ranking-update-style.css';
import { fetchData } from "../helpers/RequestHelper";

class RankingUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rankingData: {
                id: this.props.match.params.id,
                playerId: null,
                dateCreation: '',
                rank: '',
                points: 0
            },
            playerName: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        fetchData('GET', `ranking/${this.state.rankingData.id}`)
            .then((res) => {
                this.setState(
                    {
                        rankingData: {
                            id: this.props.match.params.id,
                            playerId: res.player_id,
                            dateCreation: this.formatDate(new Date(res.date_creation)),
                            rank: res.rank,
                            points: res.points
                        },
                        playerName: `${res.first_name} ${res.last_name}`,
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
        fetchData('POST', `ranking/${this.state.rankingData.id}`, this.state.rankingData)
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
            fetchData('DELETE', `ranking/${this.state.rankingData.id}`, {})
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
            <div className="ranking-update">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Zawodnik: {this.state.playerName}
                    </label>
                    <br/>
                    <label>
                        Data rankingu:
                        <input required
                            name="dateCreation" type="date" value={this.state.rankingData.dateCreation}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Ranking:
                        <input required
                            name="rank" type="number" value={this.state.rankingData.rank}
                            onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Punkty:
                        <input required
                            name="points" type="number" value={this.state.rankingData.points}
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

export default RankingUpdate;
