React = require('react');
PropTypes = React.PropTypes;
var Link = require('react-router').Link
var UserDetails = require('../components/UserDetails');
var UserDetailsWrapper = require('../components/UserDetailsWrapper');
var MainContainer = require('../components/MainContainer');
var Loading = require('../components/Loading');
styles = require('../styles');

function StartOver () {
    return (
        <div className="col-sm-12" style={styles.space}>
            <Link to="playerOne">
                <button type="button" className="btn btn-lg btn-danger">Start Over</button>
            </Link>
        </div>
    )
}

function Results (props) {

    if (props.isLoading) {
        return (
            <MainContainer>
                <Loading />
            </MainContainer>
        )
    }

    if (props.scores[0] === props.scores[1]) {
        return (
            <MainContainer>
                <h1>It's a Tie</h1>
                <div className="jumbotron col-sm-12 text-center" style={styles.transparentBg}>
                    <StartOver />
                </div>
            </MainContainer>
        )
    }

    var winningIndex = props.scores[0] > props.scores[1] ? 0 : 1;
    var losingIndex = winningIndex === 0 ? 1 : 0;

    return (
        <MainContainer>
            <h1>Results</h1>
            <div className="col-sm-8 col-sm-offset-2">
                <UserDetailsWrapper header="Winner">
                    <UserDetails score={props.scores[winningIndex]} info={props.playersInfo[winningIndex]} />
                </UserDetailsWrapper>
                <UserDetailsWrapper header="Loser">
                    <UserDetails score={props.scores[losingIndex]} info={props.playersInfo[losingIndex]} />
                </UserDetailsWrapper>
            </div>
            <StartOver />
        </MainContainer>
    )
}

Results.propType = {
    isLoading: PropTypes.bool.isRequired,
    playersInfo: PropTypes.array.isRequired,
    scores: PropTypes.array.isRequired
}

module.exports = Results;