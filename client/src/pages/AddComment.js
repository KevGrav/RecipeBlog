import React, { useState } from 'react'
//import "./addComment.css"
import { useData } from "../../src/UserContext"
import axios from 'axios'

const AddComment = ({ id, setComment, comment , item, handleViewUpdate, handleTrickReact}) => {

    const [addComment, setAddComment] = useState({})
    
    const { authedUser } = useData()

    const handleAddComment = (e) => {

        setAddComment({
            authorName: authedUser.username,
            authorId: authedUser._id,
            comment: e.target.value,
            created: Date.now(),
            OgFeed: id,
        })
    }

    const handleCommentSubmit = () => {

        // axios with state comment to a new route and model for comments
        axios({
            method: "post",
            url: `http://localhost:3002/api/post/addComment/${id}`,
            data: addComment,
            withCredentials: true
        })
            .then(res => {
                console.log("res", res)
            })

        setComment(!comment)
        handleViewUpdate()
        handleTrickReact(addComment)

    }

    return (
        <>
            {console.log("comment", addComment)}
            <div id="AddComment">

                <div id="textArea2">

                    <textarea
                        onChange={(e) => handleAddComment(e)}
                        id="addCommentTextArea" />

                </div>

                <div id="submit">
                    <button onClick={() => handleCommentSubmit()}>submit</button>
                </div>
            </div>
        </>
    )
}

export default AddComment