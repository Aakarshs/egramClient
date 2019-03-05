import React, { Component } from "react";
import { updateItem } from "../apiFunctions/httpApi";
import { styles } from "../styles/feedTableStyles";

import '../styles/animations.css';

class FeedTable extends Component {
    render() {
        //Like and dislike button Images.
        var likeIcon = require("../assets/like.png");
        var dislikeIcon = require("../assets/dislike.png");
        return (
            <div>
                <div style={styles.feedOuterContainer}>
                    <div style={styles.feedInnerContainer}>POSTS</div>

                    {/*Feed Table*/}
                    <tbody>
                        {this.props.data.slice(0).reverse().map((item, index) => (
                            <tr key={index}>
                                <div style={styles.table}>
                                    <img style={styles.feedImage} src={item.image} />
                                    <div style={styles.descriptionOuterContainer}>
                                        <div style={styles.descriptionInnerContainer}>

                                            {/*Avatar Name*/}
                                            <div
                                                style={styles.feedName}>
                                                {item.name[0]}
                                            </div>
                                            {/*--------------------------*/}

                                            <div style={styles.feedSeperator}>

                                                {/*Name and Date*/}
                                                <div>
                                                    <div style={styles.nameDateContainer}>
                                                        <td style={styles.name}>{item.name}</td>
                                                        <td style={styles.date}>{item.date}</td>
                                                    </div>
                                                </div>
                                                {/*--------------------------*/}

                                                <div>

                                                    {/*Likes and Dislikes*/}
                                                    <div style={styles.likeDislikeContainer}>

                                                        {/*Like Button*/}
                                                        {/*Call the endpoint on button click to send data to the backend.*/}
                                                        <button onClick={() => { updateItem(item._id, item.likes + 1, item.dislikes) }} 
                                                        onMouseOut={this.props.mouseOutHandler} className={"likeButton"}>
                                                            <div style={styles.dislikeImageContainer}>
                                                                <img style={styles.dislikeImage} src={likeIcon} />
                                                                <div style={styles.numLikesDislikes}>
                                                                    {item.likes}
                                                                </div>
                                                            </div>
                                                        </button>
                                                        {/*--------------------------*/}

                                                        {/*Dislike Button*/}
                                                        {/*Call the endpoint on button click to send data to the backend.*/}
                                                        <button onClick={() => { updateItem(item._id, item.likes, item.dislikes + 1) }} 
                                                        className={"dislikeButton"}>
                                                            <div style={styles.likeImageContainer}>
                                                                <img style={styles.likeImage} src={dislikeIcon} />
                                                                <div style={styles.numLikesDislikes}>
                                                                    {item.dislikes}
                                                                </div>
                                                            </div>
                                                        </button>
                                                        {/*--------------------------*/}

                                                    </div>
                                                    {/*--------------------------*/}

                                                </div>
                                            </div>
                                        </div>

                                        {/*Post text*/}
                                        <div style={styles.textContainer}>
                                            <td style={styles.text}>{item.text}</td>
                                        </div>
                                        {/*--------------------------*/}

                                    </div>
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </div>
            </div>
        );
    }
}



export default FeedTable;
