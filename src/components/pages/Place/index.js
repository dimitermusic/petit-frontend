import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./style.css";
import API from "../../../utils/api";

function Place() {
    const { ref_id } = useParams();
    const searchForm = useSelector(state => state.searchForm);
    const googleResults = useSelector(state => state.googleResults);
    const tkn = localStorage.getItem("token");
    const [review, setReview] = useState({});
    const [placeIdState, setPlaceIdState] = useState()
    const [voteStipendUpState, setVoteStipendUpState] = useState(0);
    const [votePetMenuUpState, setVotePetMenuUpState] = useState(0);
    const [voteTimeOffUpState, setVoteTimeOffUpState] = useState(0);
    const [voteStipendDownState, setVoteStipendDownState] = useState(0);
    const [votePetMenuDownState, setVotePetMenuDownState] = useState(0);
    const [voteTimeOffDownState, setVoteTimeOffDownState] = useState(0);
    const [voteBringUpState, setVoteBringUpState] = useState(0);
    const [voteBringDownState, setVoteBringDownState] = useState(0);
    const [commentTextState, setCommentTextState] = useState();

    useEffect(() => {
        const myResult = googleResults.filter(result => result.reference === ref_id);

        API.getOnePlace({
            name: myResult[0].name,
            isJob: searchForm.type,
            location: myResult[0].formatted_address
        }, tkn, ref_id)
            .then(res => {
                setPlaceIdState(res.data.id)
                setReview(res.data);
                // StipendUp
                const voteStipendUpCount = res.data.Votes.filter(vote =>
                    vote.hasStipendUp === true)
                setVoteStipendUpState(voteStipendUpCount.length)
                // StipendDown
                const voteStipendDownCount = res.data.Votes.filter(vote => vote.hasStipendDown === true)
                setVoteStipendDownState(voteStipendDownCount.length)
                // PetMenuUp
                const votePetMenuUpCount = res.data.Votes.filter(vote => vote.hasMenuUp === true)
                setVotePetMenuUpState(votePetMenuUpCount.length)
                // PetMenuDown
                const votePetMenuDownCount = res.data.Votes.filter(vote => vote.hasMenuDown === true)
                setVotePetMenuDownState(votePetMenuDownCount.length)
                // TimeOffUp
                const voteTimeOffUpCount = res.data.Votes.filter(vote => vote.PetTimeOffUp === true)
                setVoteTimeOffUpState(voteTimeOffUpCount.length)
                // TimeOffDown
                const voteTimeOffDownCount = res.data.Votes.filter(vote => vote.PetTimeOffDown === true)
                setVoteTimeOffDownState(voteTimeOffDownCount.length)
                // CanBringUp
                const voteBringUpCount = res.data.Votes.filter(vote => vote.canBringUp === true)
                setVoteBringUpState(voteBringUpCount.length)
                // CanBringDown
                const voteBringDownCount = res.data.Votes.filter(vote => vote.canBringDown === true)
                setVoteBringDownState(voteBringDownCount.length)
                
                console.log(res.data.id);

                // API.getAllComments(tkn, res.data.id)
                //     .then(data => {
                //         console.log(data);
                //         setAllCommentsState(data);
                //     }).catch(err => {
                //         console.log(err);
                //     })
            })

    }, [])

    const voteStipendUp = () => {
        API.vote({
            hasStipendUp: true,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.hasStipendUp===true)
            setVoteStipendUpState(voteNumber.length)
            console.log("Vote Successful!")
        })
    }

    const voteStipendDown = () => {
        API.vote({
            hasStipendDown: true,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.hasStipendDown===true)
            setVoteStipendDownState(voteNumber.length)
            console.log("Vote Successful!")
        })
    }

    const voteBringUp = () => {
        API.vote({
            canBringUp: true,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.canBringUp===true)
            setVoteBringUpState(voteNumber.length)
            console.log("Vote Successful!")
        })
    }

    const voteBringDown = () => {
        API.vote({
            canBringDown: true,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.canBringDown===true)
            setVoteBringDownState(voteNumber.length)
            console.log("Vote Successful!")
        })
    }

    const voteMenuUp = () => {
        API.vote({
            hasMenuUp: true,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.hasMenuUp===true)
            setVotePetMenuUpState(voteNumber.length)
            console.log("Vote Successful!")
        })
    }

    const voteMenuDown = () => {
        API.vote({
            hasMenuDown: true,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.hasMenuDown===true)
            setVotePetMenuDownState(voteNumber.length)
            console.log("Vote Successful!")
        })
    }

    const voteTimeOffUp = () => {
        API.vote({
            petTimeOffUp: true,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.petTimeOffUp===true)
            setVoteTimeOffUpState(voteNumber.length)
            console.log("Vote Successful!")
        })
    }

    const voteTimeOffDown = () => {
        API.vote({
            petTimeOffDown: true,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.petTimeOffDown===true)
            setVoteTimeOffDownState(voteNumber.length)            
            console.log("Vote Successful!")
        })
    }

    const handleInputChange = (e) => setCommentTextState(e.target.value);

    // const postComment = () => {;
    //     API.postComment({
    //         placeId: placeIdState,
    //         comment: commentTextState,
    //     }, tkn).then(res => {
    //         console.log(res);
    //         console.log("Comment Successfully sent to db!")
    //         API.getAllComments(tkn, placeIdState)
    //             .then(data => {
    //                 console.log(data);
    //                 setAllCommentsState(data);
    //                 console.log(allCommentsState);
    //             }).catch(err => {
    //                 console.log(err);
    //             })
    //     })
    // }

    return (
        <div className="uk-margin-large-left uk-margin-large-right">
            <div className="uk-flex">
                <div className="uk-margin-small-right">{review.name}</div>
                <div className="uk-margin-small-right">at</div>
                <div className="uk-margin-small-right">{review.location}</div>
                <span className="uk-badge">{searchForm.type}</span>
            </div>

            <hr />
            {/* <div className="uk-flex">
                <p className="uk-margin-large-right">Pet Friendly:</p>
                <div>Yes</div>
            </div> */}

            <div className="uk-flex">
                <p className="uk-margin-large-right">Ok to Bring In:</p>
                <div className="uk-margin-small-right">Yes</div>
                <div style={{ "cursor": "pointer" }} onClick={voteBringUp}>👍</div>
                <div className="uk-margin-large-right">{voteBringUpState}</div>

                <div className="uk-margin-small-right">No</div>
                <div style={{ "cursor": "pointer" }} onClick={voteBringDown}>👎</div>
                <div>{voteBringDownState}</div>
            </div>

            <div className="uk-flex">
                <p className="uk-margin-large-right">Pet Menu:</p>
                <div className="uk-margin-small-right">Yes</div>
                <div style={{ "cursor": "pointer" }} onClick={voteMenuUp}>👍</div>
                <div className="uk-margin-large-right">{votePetMenuUpState}</div>

                <div className="uk-margin-small-right">No</div>
                <div style={{ "cursor": "pointer" }} onClick={voteMenuDown}>👎</div>
                <div>{votePetMenuDownState}</div>
            </div>

            <div className="uk-flex">
                <p className="uk-margin-large-right">Pet Stipend:</p>
                <div className="uk-margin-small-right">Yes</div>
                <div style={{ "cursor": "pointer" }} onClick={voteStipendUp}>👍</div>
                <div className="uk-margin-large-right">{voteStipendUpState}</div>

                <div className="uk-margin-small-right">No</div>
                <div style={{ "cursor": "pointer" }} onClick={voteStipendDown}>👎</div>
                <div>{voteStipendDownState}</div>
            </div>

            <div className="uk-flex">
                <p className="uk-margin-large-right">Pet Time Off:</p>
                <div className="uk-margin-small-right">Yes</div>
                <div style={{ "cursor": "pointer" }} onClick={voteTimeOffUp}>👍</div>
                <div className="uk-margin-large-right">{voteTimeOffUpState}</div>

                <div className="uk-margin-small-right">No</div>
                <div style={{ "cursor": "pointer" }} onClick={voteTimeOffDown}>👎</div>
                <div>{voteTimeOffDownState}</div>
            </div>
            <a className="uk-button uk-button-default" href="#">See on Google</a>
            <hr />
            <div>
                <p>Comments:</p>
            </div>
            <form>
                <textarea
                    className="uk-textarea"
                    onChange={handleInputChange}
                    value={commentTextState}
                >

                </textarea>
                <a
                    className="uk-button uk-button-default"
                    // onClick={postComment}
                >Comment</a>
            </form>
            <hr />
            <div>
                {/* <ul className="uk-list uk-list-large uk-list-divider">
                    {setTimeout(allCommentsState.map(comment => {
                        return (
                            <li>
                                <article class="uk-comment">
                                    <header class="uk-comment-header">
                                        <div class="uk-grid-medium uk-flex-middle" uk-grid>
                                            <div class="uk-width-auto">
                                                <img class="uk-comment-avatar" src={comment.data.User.profilePic} width="80" height="80" alt="" />
                                            </div>
                                            <div class="uk-width-expand">
                                                <h4 class="uk-comment-title uk-margin-remove">{comment.data.User.username}</h4>
                                                <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                                    <li>{comment.data.createdAt}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </header>
                                    <div class="uk-comment-body">
                                        <p>{comment.data.comment}</p>
                                    </div>
                                </article>
                            </li>
                        )
                    })), 5000}
                </ul> */}
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default Place;