import React from 'react';
import '../styles/player-style.css';
import {fetchData} from "../helpers/RequestHelper";


class Player extends React.Component {

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
        return <div>DZIAŁA POJEDYNCZY PLAYER!!!</div>;
    }

}

export default Player;
