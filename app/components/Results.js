import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import UserDetails from '../components/UserDetails'
import UserDetailsWrapper from '../components/UserDetailsWrapper'
import MainContainer from '../components/MainContainer'
import Loading from '../components/Loading'
import * as styles from '../styles'

function StartOver () {
    return (
        <div className="col-sm-12" style={styles.space}>
            <Link to="playerOne">
                <button type="button" className="btn btn-lg btn-danger">Start Over</button>
            </Link>
        </div>
    )
}

function Results ({isLoading, scores, playersInfo}) {

    if (isLoading) {
        return (
            <MainContainer>
                <Loading />
            </MainContainer>
        )
    }

    if (scores[0] === scores[1]) {
        return (
            <MainContainer>
                <h1>It's a Tie</h1>
                <div className="jumbotron col-sm-12 text-center" style={styles.transparentBg}>
                    <StartOver />
                </div>
            </MainContainer>
        )
    }

    const winningIndex = scores[0] > scores[1] ? 0 : 1;
    const losingIndex = winningIndex === 0 ? 1 : 0;

    return (
        <MainContainer>
            <h1>Results</h1>
            <div className="col-sm-8 col-sm-offset-2">
                <UserDetailsWrapper header="Winner">
                    <UserDetails score={scores[winningIndex]} info={playersInfo[winningIndex]} />
                </UserDetailsWrapper>
                <UserDetailsWrapper header="Loser">
                    <UserDetails score={scores[losingIndex]} info={playersInfo[losingIndex]} />
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

export default Results;