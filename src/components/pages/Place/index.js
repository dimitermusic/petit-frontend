import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./style.css";
import API from "../../../utils/api";
import avatar from "../../../images/avatar.jpg"
import Moment from 'react-moment';
import 'moment-timezone';
import { MdThumbUp, MdThumbDown } from "react-icons/md";

function Place() {
    const { ref_id } = useParams();
    const searchForm = useSelector(state => state.searchForm);
    const googleResults = useSelector(state => state.googleResults);
    const tkn = localStorage.getItem("token");
    const [review, setReview] = useState({
        location: ""
    });
    const [placeIdState, setPlaceIdState] = useState();
    const [voteState, setVoteState] = useState({
        stipendUp: 0,
        stipendDown: 0,
        menuUp: 0,
        menuDown: 0,
        timeOffUp: 0,
        timeOffDown: 0,
        bringUp: 0,
        bringDown: 0
    })
    const [commentTextState, setCommentTextState] = useState();
    const [allCommentsState, setAllCommentsState] = useState([]);

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
                const voteStipendUpCount = res.data.Votes.filter(vote => vote.hasStipendUp === true)
                const voteStipendDownCount = res.data.Votes.filter(vote => vote.hasStipendDown === true)
                const votePetMenuUpCount = res.data.Votes.filter(vote => vote.hasMenuUp === true)
                const votePetMenuDownCount = res.data.Votes.filter(vote => vote.hasMenuDown === true)
                const voteTimeOffUpCount = res.data.Votes.filter(vote => vote.petTimeOffUp === true)
                const voteTimeOffDownCount = res.data.Votes.filter(vote => vote.petTimeOffDown === true)
                const voteBringUpCount = res.data.Votes.filter(vote => vote.canBringUp === true)
                const voteBringDownCount = res.data.Votes.filter(vote => vote.canBringDown === true)
                setVoteState({
                    ...voteState,
                    stipendUp: voteStipendUpCount.length,
                    stipendDown: voteStipendDownCount.length,
                    menuUp: votePetMenuUpCount.length,
                    menuDown: votePetMenuDownCount.length,
                    timeOffUp: voteTimeOffUpCount.length,
                    timeOffDown: voteTimeOffDownCount.length,
                    bringUp: voteBringUpCount.length,
                    bringDown: voteBringDownCount.length
                })
                API.getAllComments(tkn, res.data.id)
                    .then(data => {
                        console.log(data.data);
                        const reversedComments = data.data.reverse();
                        console.log(reversedComments);
                        setAllCommentsState(reversedComments);
                        console.log(allCommentsState);
                    }).catch(err => {
                        console.log(err);
                    })
            })
    }, [])

    const voteStipendUp = () => {
        API.vote({
            hasStipendUp: true,
            hasStipendDown: false,
            placeId: placeIdState
        }, tkn)
            .then(res => {
                const voteNumber = res.data.Votes.filter(vote => vote.hasStipendUp === true)
                const newNumber = res.data.Votes.filter(vote => vote.hasStipendDown === true)
                setVoteState({
                    ...voteState,
                    stipendUp: voteNumber.length,
                    stipendDown: newNumber.length
                })
                console.log("Vote Successful!")
            })
    }

    const voteStipendDown = () => {
        API.vote({
            hasStipendDown: true,
            hasStipendUp: false,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote => vote.hasStipendDown === true)
            const newNumber = res.data.Votes.filter(vote => vote.hasStipendUp === true)
            setVoteState({
                ...voteState,
                stipendDown: voteNumber.length,
                stipendUp: newNumber.length
            })
            console.log("Vote Successful!")
        })
    }

    const voteBringUp = () => {
        API.vote({
            canBringUp: true,
            canBringDown: false,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote => vote.canBringUp === true);
            const another = res.data.Votes.filter(vote => vote.canBringDown === true)
            setVoteState({
                ...voteState,
                bringDown: another.length,
                bringUp: voteNumber.length
            })
        })
    }

    const voteBringDown = () => {
        API.vote({
            canBringDown: true,
            canBringUp: false,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote => vote.canBringDown === true);
            const another = res.data.Votes.filter(vote => vote.canBringUp === true);
            setVoteState({
                ...voteState,
                bringUp: another.length,
                bringDown: voteNumber.length
            })
            console.log("Vote Successful!")
        })
    }

    const voteMenuUp = () => {
        API.vote({
            hasMenuUp: true,
            hasMenuDown: false,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote => vote.hasMenuUp === true)
            const another = res.data.Votes.filter(vote => vote.hasMenuDown === true);
            setVoteState({
                ...voteState,
                menuUp: voteNumber.length,
                menuDown: another.length
            })
            console.log("Vote Successful!")
        })
    }

    const voteMenuDown = () => {
        API.vote({
            hasMenuDown: true,
            hasMenuUp: false,
            placeId: placeIdState
        }, tkn).then(res => {
            const another = res.data.Votes.filter(vote => vote.hasMenuUp === true);
            const voteNumber = res.data.Votes.filter(vote => vote.hasMenuDown === true)
            setVoteState({
                ...voteState,
                menuUp: another.length,
                menuDown: voteNumber.length
            })
            console.log("Vote Successful!")
        })
    }

    const voteTimeOffUp = () => {
        API.vote({
            petTimeOffUp: true,
            petTimeOffDown: false,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote => vote.petTimeOffUp === true)
            const another = res.data.Votes.filter(vote => vote.petTimeOffDown === true);
            setVoteState({
                ...voteState,
                timeOffDown: another.length,
                timeOffUp: voteNumber.length
            })
            console.log("Vote Successful!")
        })
    }

    const voteTimeOffDown = () => {
        API.vote({
            petTimeOffDown: true,
            petTimeOffUp: false,
            placeId: placeIdState
        }, tkn).then(res => {
            const another = res.data.Votes.filter(vote => vote.petTimeOffUp === true);
            const voteNumber = res.data.Votes.filter(vote => vote.petTimeOffDown === true)
            setVoteState({
                ...voteState,
                timeOffUp: another.length,
                timeOffDown: voteNumber.length
            })
            console.log("Vote Successful!")
        })
    }

    const handleInputChange = (e) => setCommentTextState(e.target.value);

    const postComment = (e) => {
        e.preventDefault()

        if (commentTextState === "") {
            alert("It's a shame our pet's can't talk to us...good thing you can! Use words in your comment. 🐶")
        } else {
            API.postComment({
                placeId: placeIdState,
                comment: commentTextState,
            }, tkn).then(res => {
                console.log(res);
                console.log("Comment Successfully sent to db!")
                API.getAllComments(tkn, placeIdState)
                    .then(data => {
                        console.log(data.data);
                        const reversedComments = data.data.reverse();
                        console.log(reversedComments);
                        setAllCommentsState(reversedComments);
                        console.log(allCommentsState);
                        setCommentTextState("")
                    }).catch(err => {
                        console.log(err);
                    })
            })
        }
    }

    const newLocation = review.location.split(",").slice(0, -2).join(",")

    return (
        <div className="uk-margin-large-left uk-margin-large-right">
            <div className="uk-flex place-title">
                <div className="uk-margin-small-right">{review.name}</div>
                <div className="uk-margin-small-right">at</div>
                <div className="uk-margin-small-right">{newLocation}</div>
                <span className="uk-badge place-badge">as {searchForm.type}</span>
            </div>

            <hr />
            {/* <div className="uk-flex">
                <p className="uk-margin-large-right">Pet Friendly:</p>
                <div>Yes</div>
            </div> */}

            <div className="uk-flex vote-row">
                <div className="uk-margin-large-right feature">Ok to Bring In:</div>
                <div className="uk-margin-small-right">Yes</div>
                <MdThumbUp className="icon" onClick={voteBringUp} />
                <div className="uk-margin-large-right">{voteState.bringUp}</div>
                <div className="uk-margin-small-right">No</div>
                <MdThumbDown className="icon" onClick={voteBringDown} />
                <div>{voteState.bringDown}</div>
            </div>

            <div className="uk-flex vote-row">
                <div className="uk-margin-large-right feature">Has Pet Menu:</div>
                <div className="uk-margin-small-right">Yes</div>
                <MdThumbUp className="icon" onClick={voteMenuUp} />
                <div className="uk-margin-large-right">{voteState.menuUp}</div>
                <div className="uk-margin-small-right">No</div>
                <MdThumbDown className="icon" onClick={voteMenuDown} />
                <div>{voteState.menuDown}</div>
            </div>

            <div className="uk-flex vote-row">
                <div className="uk-margin-large-right feature">Has Pet Stipend:</div>
                <div className="uk-margin-small-right">Yes</div>
                <MdThumbUp className="icon" onClick={voteStipendUp} />
                <div className="uk-margin-large-right">{voteState.stipendUp}</div>
                <div className="uk-margin-small-right">No</div>
                <MdThumbDown className="icon" onClick={voteStipendDown} />
                <div>{voteState.stipendDown}</div>
            </div>

            <div className="uk-flex vote-row">
                <div className="uk-margin-large-right feature">Has Pet Time Off:</div>
                <div className="uk-margin-small-right">Yes</div>
                <MdThumbUp className="icon" onClick={voteTimeOffUp} />
                <div className="uk-margin-large-right">{voteState.timeOffUp}</div>
                <div className="uk-margin-small-right">No</div>
                <MdThumbDown className="icon" onClick={voteTimeOffDown} />
                <div>{voteState.timeOffDown}</div>
            </div>
            <br />
            <a target="_blank" className="uk-button uk-button-default" href={`https://www.google.com/search?q=${review.name}+${newLocation}`}>See on Google</a>
            <br />
            <br />
            <hr />
            <div>
                <p>Comments:</p>
            </div>
            <form>
                <input
                    className="uk-textarea"
                    onChange={handleInputChange}
                    value={commentTextState}
                >

                </input>
                <button
                    className="uk-button uk-button-default"
                    onClick={postComment}
                >Post Comment</button>
            </form>
            <hr />
            <div>
                <ul className="uk-list uk-list-large uk-list-divider">
                    {allCommentsState.map(comment => (
                        <li>
                            <article class="uk-comment">
                                <header class="uk-comment-header">
                                    <div class="uk-grid-medium uk-flex-middle" uk-grid>
                                        <div class="uk-width-auto">
                                            {comment.User.profilePic ?
                                                (<img class="uk-comment-avatar" src={comment.User.profilePic} width="80" height="80" alt="" />) :
                                                (<img class="uk-comment-avatar" src={avatar} width="80" height="80" alt="" />)}
                                        </div>
                                        <div class="uk-width-expand">
                                            <h4 class="uk-comment-title uk-margin-remove">{comment.User.username}</h4>
                                            <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                                <li>
                                                    <Moment format="h:mma | MM/DD/YYYY">
                                                        {comment.createdAt}
                                                    </Moment>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </header>
                                <div class="uk-comment-body">
                                    <p>{comment.comment}</p>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
            <br />
            <br />
            <br />
            <br />
        </div >
    )
}

export default Place;