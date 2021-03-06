import './App.css';
import {
    BrowserRouter as Router,
    Route, Switch,
} from 'react-router-dom';
import PlayerList from './components/PlayerList';
import Player from './components/Player';
import PlayerCreate from './components/PlayerCreate';
import PlayerUpdate from './components/PlayerUpdate';
import Ranking from './components/Ranking';
import RankingCreate from './components/RankingCreate';
import RankingUpdate from './components/RankingUpdate';
import homeImage from './assets/img/home.png';

function App() {
    return (
        <Router>
            <Route>
                <nav className="navbar">
                    <a className="navbar-brand" href="/">
                        <img src={homeImage} alt="home" width={100}/>
                    </a>
                </nav>
            </Route>
            <div className="container">
                <Switch>
                    <Route exact path='/player/view/:id' component={Player}>
                    </Route>
                    <Route exact path='/player/create' component={PlayerCreate}>
                    </Route>
                    <Route exact path='/player/update/:id' component={PlayerUpdate}>
                    </Route>
                    <Route exact path='/ranking/view/:id' component={Ranking}>
                    </Route>
                    <Route exact path='/ranking/create/:playerId' component={RankingCreate}>
                    </Route>
                    <Route exact path='/ranking/update/:id' component={RankingUpdate}>
                    </Route>
                    <Route component={PlayerList}>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
