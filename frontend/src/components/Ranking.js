import React from 'react';
import '../styles/ranking-style.css';
import {fetchData} from "../helpers/RequestHelper";


class Ranking extends React.Component {

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

        this.handleRankingEdit = this.handleRankingEdit.bind(this);
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

    handleRankingEdit() {
        const { history } = this.props;
        history.push(`/ranking/update/${this.state.rankingData.id}`);
    }

    render() {
        return <div className="ranking-view-container">
            <div className="name">
                <h2>Ranking zawodnika {this.state.playerName}</h2>
                <button onClick={this.handleRankingEdit}>Edytuj</button>
            </div>
            <div className="info-data">
                <div className="info-element">
                    <div className="label">Data rankingu:</div>
                    <div className="data">{this.state.rankingData ? this.state.rankingData.dateCreation : ''}</div>
                </div>
                <div className="info-element">
                    <div className="label">Ranking:</div>
                    <div className="data">{this.state.rankingData ? this.state.rankingData.rank : ''}</div>
                </div>
                <div className="info-element">
                    <div className="label">Punkty:</div>
                    <div className="data">{this.state.rankingData ? this.state.rankingData.points : ''}</div>
                </div>
            </div>
        </div>;
    }

    formatDate = (date) => {
        if(isNaN(date.getFullYear())) {
            return 'Brak danych';
        }
        
        return ((date.getDate().toString()).length > 1 ? (date.getDate()) : `0${(date.getDate())}`) + "-"
            + ((date.getMonth() + 1).toString().length > 1 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`) +
            "-" + date.getFullYear();
    }
}

export default Ranking;
