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

    render() {
        return <div>
            <div>{this.state.playerName}</div>
            <div>{this.state.rankingData.id}</div>
            <div>{this.state.rankingData.playerId}</div>
            <div>{this.state.rankingData.dateCreation}</div>
            <div>{this.state.rankingData.rank}</div>
            <div>{this.state.rankingData.points}</div>
        </div>;
    }

    formatDate = (date) => {
        return date.getFullYear() + "-" + ((date.getMonth() + 1).length > 1 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`) +
            "-" + ((date.getDate()).length > 1 ? (date.getDate()) : `0${(date.getDate())}`);
    }
}

export default Ranking;
