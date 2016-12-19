import React  from 'react'
import ConfirmBattle from '../components/ConfirmBattle'
import githubHelpers from '../utils/githubHelpers'

var ConfirmBattleContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return  {
            isLoading: true,
            playersInfo: []
        }
    },
    componentDidMount: function () {
    var query = this.props.location.query;
    githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
      .then(function (players) {
        this.setState({
          isLoading: false,
          playersInfo: players
        })
      }.bind(this))
    },
    handleInitiateBattle: function () {
        this.context.router.push({
            pathname: '/results',
            state: {
                playersInfo: this.state.playersInfo
            }
        });
    },
    render: function() {
        return (
            <ConfirmBattle 
                isLoading={this.state.isLoading}
                onInitiateBattle={this.handleInitiateBattle}
                playersInfo={this.state.playersInfo} 
            />
        )
    }
});

export default ConfirmBattleContainer;