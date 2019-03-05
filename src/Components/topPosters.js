import React, { Component } from "react";
import { styles } from "../styles/topPosterStyles";

class TopPosters extends Component {
    render() {
        return (
            <div>
                <tbody>
                    <div style={styles.posterOuterContainer}>
                        <div style={styles.posterInnerContainer}>
                            <div style={styles.poster}>Top Posters(Most Liked)</div>
                            {/*Mapping the data that was sent as props from app.js.*/}
                            {this.props.data.slice(0, 4).map((item, index) => (
                                <tr style={styles.posterTable} key={index}>
                                    <div style={styles.avatarOuter}>
                                        <div style={styles.avatarInner}>
                                            {item.name[0]}
                                        </div>
                                        <div style={{ marginLeft: 10 }}>
                                            {item.name}
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

export default TopPosters;

