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

function App() {
    return (
        <Router>
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
                    <Route>
                        <PlayerList/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
