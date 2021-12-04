import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./style.css";
import API from "../../../utils/api";
import avatar from "../../../images/avatar.jpg"

function Place() {
    const { ref_id } = useParams();
    const searchForm = useSelector(state => state.searchForm);
    const googleResults = useSelector(state => state.googleResults);
    const tkn = localStorage.getItem("token");
    const [review, setReview] = useState({});
    const [placeIdState, setPlaceIdState] = useState();
    const [voteState, setVoteState] = useState({
        stipendUp:0,
        stipendDown:0,
        menuUp:0,
        menuDown:0,
        timeOffUp:0,
        timeOffDown:0,
        bringUp:0,
        bringDown:0
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
                const voteStipendUpCount = res.data.Votes.filter(vote =>vote.hasStipendUp === true)
                const voteStipendDownCount = res.data.Votes.filter(vote => vote.hasStipendDown === true)
                const votePetMenuUpCount = res.data.Votes.filter(vote => vote.hasMenuUp === true)
                const votePetMenuDownCount = res.data.Votes.filter(vote => vote.hasMenuDown === true)
                const voteTimeOffUpCount = res.data.Votes.filter(vote => vote.petTimeOffUp === true)
                const voteTimeOffDownCount = res.data.Votes.filter(vote => vote.petTimeOffDown === true)
                const voteBringUpCount = res.data.Votes.filter(vote => vote.canBringUp === true)
                const voteBringDownCount = res.data.Votes.filter(vote => vote.canBringDown === true)
                setVoteState({
                    ...voteState,
                    stipendUp:voteStipendUpCount.length,
                    stipendDown:voteStipendDownCount.length,
                    menuUp:votePetMenuUpCount.length,
                    menuDown:votePetMenuDownCount.length,
                    timeOffUp:voteTimeOffUpCount.length,
                    timeOffDown:voteTimeOffDownCount.length,
                    bringUp:voteBringUpCount.length,
                    bringDown:voteBringDownCount.length
                })
                API.getAllComments(tkn, res.data.id)
                    .then(data => {
                        console.log(data.data);
                        setAllCommentsState(data.data);
                    }).catch(err => {
                        console.log(err);
                    })
            })
    }, [])

    const voteStipendUp = () => {
        API.vote({
            hasStipendUp: true,
            hasStipendDown:false,
            placeId: placeIdState
        }, tkn)
        .then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.hasStipendUp===true)
            const newNumber = res.data.Votes.filter(vote=>vote.hasStipendDown===true)
            setVoteState({
                ...voteState,
                stipendUp:voteNumber.length,
                stipendDown:newNumber.length
            })
            console.log("Vote Successful!")
        })
    }

    const voteStipendDown = () => {
        API.vote({
            hasStipendDown: true,
            hasStipendUp:false,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.hasStipendDown===true)
            const newNumber = res.data.Votes.filter(vote=>vote.hasStipendUp===true)
            setVoteState({
                ...voteState,
                stipendDown:voteNumber.length,
                stipendUp:newNumber.length
            })            
            console.log("Vote Successful!")
        })
    }

    const voteBringUp = () => {
        API.vote({
            canBringUp: true,
            canBringDown:false,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.canBringUp===true);
            const another = res.data.Votes.filter(vote=>vote.canBringDown===true)
            setVoteState({
                ...voteState,
                bringDown:another.length,
                bringUp:voteNumber.length
            })
        })
    }

    const voteBringDown = () => {
        API.vote({
            canBringDown: true,
            canBringUp:false,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.canBringDown===true);
            const another = res.data.Votes.filter(vote=>vote.canBringUp===true);
            setVoteState({
                ...voteState,
                bringUp:another.length,
                bringDown:voteNumber.length
            })
            console.log("Vote Successful!")
        })
    }

    const voteMenuUp = () => {
        API.vote({
            hasMenuUp: true,
            hasMenuDown:false,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.hasMenuUp===true)
            const another = res.data.Votes.filter(vote=>vote.hasMenuDown===true);
            setVoteState({
                ...voteState,
                menuUp:voteNumber.length,
                menuDown:another.length
            })
            console.log("Vote Successful!")
        })
    }

    const voteMenuDown = () => {
        API.vote({
            hasMenuDown: true,
            hasMenuUp:false,
            placeId: placeIdState
        }, tkn).then(res => {
            const another = res.data.Votes.filter(vote=>vote.hasMenuUp===true);
            const voteNumber = res.data.Votes.filter(vote=>vote.hasMenuDown===true)
            setVoteState({
                ...voteState,
                menuUp:another.length,
                menuDown:voteNumber.length
            })
            console.log("Vote Successful!")
        })
    }

    const voteTimeOffUp = () => {
        API.vote({
            petTimeOffUp: true,
            petTimeOffDown:false,
            placeId: placeIdState
        }, tkn).then(res => {
            const voteNumber = res.data.Votes.filter(vote=>vote.petTimeOffUp===true)
            const another = res.data.Votes.filter(vote=>vote.petTimeOffDown===true);
            setVoteState({
                ...voteState,
                timeOffDown:another.length,
                timeOffUp:voteNumber.length
            })
            console.log("Vote Successful!")
        })
    }

    const voteTimeOffDown = () => {
        API.vote({
            petTimeOffDown: true,
            petTimeOffUp:false,
            placeId: placeIdState
        }, tkn).then(res => {
            const another = res.data.Votes.filter(vote=>vote.petTimeOffUp===true);
            const voteNumber = res.data.Votes.filter(vote=>vote.petTimeOffDown===true)
            setVoteState({
                ...voteState,
                timeOffUp:another.length,
                timeOffDown:voteNumber.length
            })           
            console.log("Vote Successful!")
        })
    }

    const handleInputChange = (e) => setCommentTextState(e.target.value);

    const postComment = (e) => {
        e.preventDefault()
        API.postComment({
            placeId: placeIdState,
            comment: commentTextState,
        }, tkn).then(res => {
            console.log(res);
            console.log("Comment Successfully sent to db!")
            API.getAllComments(tkn, placeIdState)
                .then(data => {
                    console.log(data.data);
                    setAllCommentsState(data.data);
                    console.log(allCommentsState);
                    alert("comment posted successfully!")
                }).catch(err => {
                    console.log(err);
                })
        })
    }

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
                <div className="uk-margin-large-right">{voteState.bringUp}</div>

                <div className="uk-margin-small-right">No</div>
                <div style={{ "cursor": "pointer" }} onClick={voteBringDown}>👎</div>
                <div>{voteState.bringDown}</div>
            </div>

            <div className="uk-flex">
                <p className="uk-margin-large-right">Pet Menu:</p>
                <div className="uk-margin-small-right">Yes</div>
                <div style={{ "cursor": "pointer" }} onClick={voteMenuUp}>👍</div>
                <div className="uk-margin-large-right">{voteState.menuUp}</div>

                <div className="uk-margin-small-right">No</div>
                <div style={{ "cursor": "pointer" }} onClick={voteMenuDown}>👎</div>
                <div>{voteState.menuDown}</div>
            </div>

            <div className="uk-flex">
                <p className="uk-margin-large-right">Pet Stipend:</p>
                <div className="uk-margin-small-right">Yes</div>
                <div style={{ "cursor": "pointer" }} onClick={voteStipendUp}>👍</div>
                <div className="uk-margin-large-right">{voteState.stipendUp}</div>

                <div className="uk-margin-small-right">No</div>
                <div style={{ "cursor": "pointer" }} onClick={voteStipendDown}>👎</div>
                <div>{voteState.stipendDown}</div>
            </div>

            <div className="uk-flex">
                <p className="uk-margin-large-right">Pet Time Off:</p>
                <div className="uk-margin-small-right">Yes</div>
                <div style={{ "cursor": "pointer" }} onClick={voteTimeOffUp}>👍</div>
                <div className="uk-margin-large-right">{voteState.timeOffUp}</div>

                <div className="uk-margin-small-right">No</div>
                <div style={{ "cursor": "pointer" }} onClick={voteTimeOffDown}>👎</div>
                <div>{voteState.timeOffDown}</div>
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
                <button
                    className="uk-button uk-button-default"
                    onClick={postComment}
                >Comment</button>
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
                                                <li>{comment.createdAt}</li>
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
        </div>
    )
}

export default Place;