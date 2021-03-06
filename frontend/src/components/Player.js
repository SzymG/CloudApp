import React from 'react';
import '../styles/player-style.css';
import {fetchData} from "../helpers/RequestHelper";
import leftImage from '../assets/img/left_hand.png';
import rightImage from '../assets/img/right_hand.png';
import ReactApexChart from "react-apexcharts";

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            playerData: null,
            playerRankings: null,
            playerRankingsChart: null
        };

        this.handlePlayerEdit = this.handlePlayerEdit.bind(this);
        this.handlePointSelected = this.handlePointSelected.bind(this);
        this.handlePlayerRankAdd = this.handlePlayerRankAdd.bind(this);
    }

    componentDidMount() {
        fetchData('GET', `player/${this.state.id}`)
            .then((res) => {
                const xAxis = [];
                const yAxis = [];
                const rankIds = [];

                (res.player_ranks).forEach((rank) => {
                    xAxis.push(this.formatDate(new Date(rank.date_creation)));
                    yAxis.push(rank.rank);
                    rankIds.push(rank.id);
                })
                
                let playerRankings = null;

                if(xAxis.length && yAxis.length) {
                    playerRankings = {
                        options: 
                        {
                            chart: {
                                type: 'line',
                                events: {
                                    dataPointSelection: this.handlePointSelected
                                },
                            },
                            grid: {
                                row: {
                                    colors: ['#f3f3f3', 'transparent'],
                                    opacity: 0.5    
                                },
                            },
                            xaxis: {
                                categories: xAxis,
                            },
                            tooltip: {
                                intersect: true,
                                shared: false
                            },
                            markers: {
                              size: 7,
                            }
                          },
                        series: [
                            {
                                name: "Ranking",
                                data: yAxis
                            }
                        ],
                    }
                }

                this.setState((prevState) => {
                    return {
                        ...prevState,
                        playerData: res.player_data,
                        playerRankingIds: rankIds,
                        playerRankingsChart: playerRankings,
                    }
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    handlePointSelected(e, chart, opts) {
        e.stopPropagation();

        const rankingId = this.state.playerRankingIds[opts.dataPointIndex];
        const { history } = this.props;
        history.push(`/ranking/view/${rankingId}`);
    }

    handlePlayerEdit() {
        const { history } = this.props;
        history.push(`/player/update/${this.state.id}`);
    }

    handlePlayerRankAdd() {
        const { history } = this.props;
        history.push(`/ranking/create/${this.state.id}`);
    }

    render() {
        let rankings;
        let handImage;

        if(this.state.playerRankingsChart) {
            rankings = <div style={{ height: 400 }}>
                            <ReactApexChart
                                options={this.state.playerRankingsChart.options}
                                series={this.state.playerRankingsChart.series}
                            />
                        </div>;
        }
        else {
            rankings = <div className="no-rankings">Brak danych</div>;
        }

        if(this.state.playerData && this.state.playerData.is_right_handed) {
            handImage = rightImage;
        }
        else {
            handImage = leftImage;
        }

        return <div className="player-view-container">
            <div className="name">
                {this.state.playerData && <h1>{this.state.playerData.first_name} {this.state.playerData.last_name}</h1>}
                <div className="buttons">
                    <button onClick={this.handlePlayerRankAdd}>Dodaj ranking</button>
                    <button onClick={this.handlePlayerEdit}>Edytuj</button>
                </div>
            </div>
            <div className="info">
                <h2>Informacje</h2>
                <div className="info-data">
                    <div className="info-element">
                        <div className="label">Data urodzenia:</div>
                        <div className="data">{this.state.playerData ? 
                            this.formatDate(new Date(this.state.playerData.birth_date)) : ''}</div>
                    </div>
                    <div className="info-element">
                        <div className="label">Symbol kraju:</div>
                        <div className="data">{this.state.playerData ? this.state.playerData.country_symbol : ''}</div>
                    </div>
                    <div className="info-element">
                        <div className="label">Którą ręką gra:</div>
                        <div className="data"><img src={handImage} alt="hand-image" width={100}/></div>
                    </div>
                    <div className="info-element">
                        <div className="label">W czołowej 10:</div>
                        <div className="data">{this.state.playerData ? this.state.playerData.top_ten_count : ''}</div>
                    </div>
                </div>
                </div>
            <div className="rankings">
                <h2>Rankingi</h2>
                {rankings}
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

export default Player;
