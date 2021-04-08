import React from 'react';
import '../styles/player-list-style.css';
import {fetchData} from "../helpers/RequestHelper";
import { DataGrid } from '@material-ui/data-grid';


class PlayerList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            rows: [],
            pageNumber: 1
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.searchPlayers = this.searchPlayers.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount() {
        fetchData('GET', `player`)
            .then((res) => {
                const rows = [];
                res.forEach(item => {
                    rows.push({
                        id: item.id,
                        first_name: item.first_name,
                        last_name: item.last_name,
                        is_right_handed: item.is_right_handed ? 'Tak' : 'Nie',
                        birth_date: this.formatDate(new Date(item.birth_date)),
                        country_symbol: item.country_symbol
                    });
                });
                
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        rows: rows,
                    }
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    handleNameChange(event) {
        this.setState((prevState) => {
            return {
                ...prevState,
                name: event.target.value
            }
        });
    }

    handleCreate() {
        const { history } = this.props;
        history.push(`/player/create`);
    }

    handleSearch() {
        this.searchPlayers(1);
    }

    handleNextPage() {
        this.searchPlayers(this.state.pageNumber + 1);
    }

    handlePrevPage() {
        this.searchPlayers(this.state.pageNumber - 1);
    }

    handleCellClick(e) {
        const { history } = this.props;
        history.push(`/player/view/${e.row.id}`);
    }

    searchPlayers(pageNumber) {
        this.setState((prevState) => {
            return {
                ...prevState,
                pageNumber: pageNumber
            }
        });

        fetchData('GET', `player?term=${this.state.name}&pageNumber=${pageNumber}`)
            .then((res) => {
                const rows = [];
                res.forEach(item => {
                    rows.push({
                        id: item.id,
                        first_name: item.first_name,
                        last_name: item.last_name,
                        is_right_handed: item.is_right_handed ? 'Tak' : 'Nie',
                        birth_date: this.formatDate(new Date(item.birth_date)),
                        country_symbol: item.country_symbol
                    });
                });
                
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        rows: rows,
                    }
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    render() {
        const columns = [
            { field: 'id', headerName: 'ID', width: 150, sortable: false },
            { field: 'first_name', headerName: 'Imię', width: 180, sortable: false },
            { field: 'last_name', headerName: 'Nazwisko', width: 180, sortable: false },
            { field: 'is_right_handed', headerName: 'Praworęczny', width: 180, sortable: false },
            { field: 'birth_date', headerName: 'Data urodzenia', width: 230, sortable: false },
            { field: 'country_symbol', headerName: 'Symbol kraju', width: 180, sortable: false },
          ];

        return (<div className="player-list-container">
                    <div className="filter">
                        <label htmlFor="name">Wyszukaj zawodnika</label>
                        <div className="inputs">
                            <div className="player-create">
                                <button onClick={this.handleCreate}>Dodaj zawodnika</button>
                            </div>
                            <div>
                                <input type="text" id="name" name="name" onChange={this.handleNameChange} autoFocus/>
                                <button onClick={this.handleSearch}>Szukaj</button>
                            </div>

                            <div className="pagination">
                                {this.state.pageNumber > 1 && <div className="prev" onClick={this.handlePrevPage}>&larr;</div>}
                                <div>{this.state.pageNumber}</div>
                                {this.state.rows.length === 10 && <div className="next" onClick={this.handleNextPage}>&rarr;</div>}
                            </div>
                        </div>
                    </div>
                    <div style={{ height: 500 }}>
                        <DataGrid rows={this.state.rows} columns={columns}
                            disableColumnMenu={true}
                            onCellClick={this.handleCellClick}
                            hideFooter={true}
                            sortable={false}
                            pageSize={10}
                            rowHeight={39} />
                    </div>
                </div>);
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

export default PlayerList;
