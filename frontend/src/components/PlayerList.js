import React from 'react';
import '../styles/player-list-style.css';
import {fetchData} from "../helpers/RequestHelper";


class PlayerList extends React.Component {

    constructor(props) {
        super(props);
    }

    buy() {
        // fetchData('GET', 'payment/index?cart=' + cartData).then((response) => {
        //     if(response.data) {
        //         window.open(response.data, "_blank")
        //     }
        // });
    }
    render() {
        return <div>DZIAŁA LISTA PLAYERÓW!!!</div>;
    }

}

export default PlayerList;
