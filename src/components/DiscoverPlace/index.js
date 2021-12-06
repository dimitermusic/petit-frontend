import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import Moment from "react-moment";
import "moment-timezone";
import "./style.css"
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import API from "../../utils/api";
import avatar from "../../images/avatar.jpg"

function DiscoverPlace() {
    const { ref_id } = useParams();
    const discoverResults = useSelector(state => state.discoverResults)
    const tkn = localStorage.getItem("token");
    const type = localStorage.getItem('type')
    const [review, setReview] = useState({
        location: ""
    });
    const [placeIdState, setPlaceIdState] = useState()
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

    const handleInputChange = (e) => setCommentTextState(e.target.value);

    useEffect(() => {
        const myResult = discoverResults.filter(result => result.ref_id === ref_id && result.isJob === type);
        console.log(myResult[0]);
        API.getOnePlace({
            name: myResult[0].name,
            isJob: myResult[0].isJob,
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
    }, [discoverResults])

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

    const postComment = (e) => {
        e.preventDefault()
        if (commentTextState === "") {
            alert("It's a shame our pets can't talk to us...good thing you can! Use words in your comment. 🐶")
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

    let voteOptions
    console.log(review.isJob)

    if (review.isJob === "establishment") {
        voteOptions = <div className="uk-flex disc-vote-row">
            <div className="uk-margin-large-right feature">Has Pet Menu:</div>
            <div className="uk-margin-small-right">Yes</div>
            <MdThumbUp className="disc-icon" onClick={voteMenuUp} />
            <div className="uk-margin-large-right">{voteState.menuUp}</div>
            <div className="uk-margin-small-right">No</div>
            <MdThumbDown className="disc-icon" onClick={voteMenuDown} />
            <div>{voteState.menuDown}</div>
        </div>
    } else {
        voteOptions = <div><div className="uk-flex disc-vote-row">
            <div className="uk-margin-large-right feature">Has Pet Stipend:</div>
            <div className="uk-margin-small-right">Yes</div>
            <MdThumbUp className="disc-icon" onClick={voteStipendUp} />
            <div className="uk-margin-large-right">{voteState.stipendUp}</div>
            <div className="uk-margin-small-right">No</div>
            <MdThumbDown className="disc-icon" onClick={voteStipendDown} />
            <div>{voteState.stipendDown}</div>
        </div>

            <div className="uk-flex disc-vote-row">
                <div className="uk-margin-large-right feature">Has Pet Time Off:</div>
                <div className="uk-margin-small-right">Yes</div>
                <MdThumbUp className="disc-icon" onClick={voteTimeOffUp} />
                <div className="uk-margin-large-right">{voteState.timeOffUp}</div>
                <div className="uk-margin-small-right">No</div>
                <MdThumbDown className="disc-icon" onClick={voteTimeOffDown} />
                <div>{voteState.timeOffDown}</div>
            </div>
        </div>
    }

    return (
        <div className="uk-margin-large-left uk-margin-large-right ">
            <div className="uk-flex disc-title">
                <div className="uk-margin-small-right">{review.name}</div>
                <div className="uk-margin-small-right">at</div>
                <div className="uk-margin-small-right">{newLocation}</div>
                <span className="uk-badge disc-badge">as {review.isJob}</span>
            </div>

            <hr />
            {/* <div className="uk-flex">
                <p className="uk-margin-large-right">Pet Friendly:</p>
                <div>Yes</div>
            </div> */}

            <div className="uk-flex disc-vote-row">
                <div className="uk-margin-large-right feature">Ok to Bring In:</div>
                <div className="uk-margin-small-right">Yes</div>
                <MdThumbUp className="disc-icon" onClick={voteBringUp} />
                <div className="uk-margin-large-right">{voteState.bringUp}</div>
                <div className="uk-margin-small-right">No</div>
                <MdThumbDown className="disc-icon" onClick={voteBringDown} />
                <div>{voteState.bringDown}</div>
            </div>

            {voteOptions}

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
                    onSubmit={postComment}
                >Comment</button>
            </form>
            <hr />
            <div className="comments">
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
                                            <h4 class="uk-comment-title uk-margin-remove">@{comment.User.username}</h4>
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
        </div>
    )
}

export default DiscoverPlace;