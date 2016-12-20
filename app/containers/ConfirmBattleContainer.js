import React, {Component} from 'react'
import ConfirmBattle from '../components/ConfirmBattle'
import {getPlayersInfo} from '../utils/githubHelpers'

class ConfirmBattleContainer extends Component {
    constructor () {
        super();
        this.state = {
            isLoading: true,
            playersInfo: []
        }
    };
    async componentDidMount() {
        const {query} = this.props.location
        try {
            const players = await getPlayersInfo([query.playerOne, query.playerTwo])
            this.setState({
                isLoading: false,
                playersInfo: players
            })
        } catch (error) {
            console.warn('There is an error in ConfirmBattleContainer: ', error);
        }
    };
    handleInitiateBattle () {
        this.context.router.push({
            pathname: '/results',
            state: {
                playersInfo: this.state.playersInfo
            }
        });
    };
    render() {
        return (
            <ConfirmBattle 
                isLoading={this.state.isLoading}
                onInitiateBattle={() => this.handleInitiateBattle()}
                playersInfo={this.state.playersInfo} 
            />
        )
    };
}

ConfirmBattleContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ConfirmBattleContainer;