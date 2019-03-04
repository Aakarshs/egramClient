import React, { Component } from "react";
import { styles } from "../Styles/topPostStyles";

class TopPosts extends Component {
    render() {
        return (
            <div>
                <tbody>
                    <div style={styles.postsOuterContainer}>
                        <div style={styles.postsInnerContainer}>
                            <div style={styles.posts}>Top Posts</div>
                            {this.props.data.slice(0, 4).map((item, index) => (
                                <tr style={styles.postsTable} key={index}>
                                    <div style={styles.postItemsOuter}>
                                        <div style={styles.postItemsInner}>
                                            {item.text.slice(0, 100)}
                                        </div>
                                    </div>
                                </tr>
                            ))}
                        </div>
                    </div>
                </tbody>
            </div>
        );
    }
}

export default TopPosts;
