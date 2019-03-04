//Module Imports
import React, { Component } from "react";
import TopPosters from "./Components/topPosters.js";
import TopPosts from "./Components/topPosts";
import FeedTable from "./Components/feedTable";

//Function Imports
import { addToDatabase, updateElementState, getCurrentDateTime, getAll, } from "./Api/functions";
import { checkImageExtention } from "./Api/functions";

//JSX Stylesheet Imports
import { styles } from "./Styles/appStyles";

//CSS Animations Imports
import './Styles/animations.css';

class List extends Component {
  constructor() {
    super();

    //Initializing the state.
    this.state = {
      id: "",
      text: "",
      name: "",
      editDisabled: false,
      likes: 0,
      dislikes: 0,
      items: [],
      image: "",
      showModal: false,
      modalImage: "",
    };

    
    //Locally binding receiving props.
    this.handler = this.handler.bind(this)

    //Locally binding imported functions to be used with local states.
    this.updateElementState = updateElementState.bind(this);
    this.addToDatabase = addToDatabase.bind(this);
    this.getCurrentDateTime = getCurrentDateTime.bind(this);
    this.getAll = getAll.bind(this);
    this.checkImageExtention = checkImageExtention.bind(this);

  }

  //Function that gets triggered when the component renders.
  componentDidMount() {
    this.getAll();
  }

  //Function that gets triggered when the component renders.
  componentWillUpdate() {
    this.getAll();
  }

  //function to refresh the state and update all elements on the page.
  handler() {
    this.getAll();
  }

  //Function that renders the DOM.
  render() {
    //Run before rendering:

    var myData = [...this.state.items];
    myData.sort((a, b) => b.likes - a.likes);

    //Button Images.
    var cancelButtImage = require("./Assets/cancel.png");
    var egramLogo = require("./Assets/egram_logo.png");
    var uploadImgButt = require("./Assets/upload_image.png");

    //Conditional Rendering for image delete button.
    if (this.state.modalImage !== "") {
      var cancelImage =
        <div style={styles.cancelImageFlexBox}>
          <div onClick={() => { this.setState({ modalImage: "" }) }} style={styles.cancelImageContainer}>
            <div style={styles.cancelImageButton}>
              <img style={styles.cancelImage} src={cancelButtImage} />
            </div>
          </div>
        </div>
    }
    else {
      var cancelImage = null;
    }

    //Conditional Rendering for upload image url modal popup.
    var modal = null;
    if (this.state.showModal !== false) {
      modal =
        <div style={styles.ModalBg}>
          <div>
            <input style={styles.imageUrlTextArea} type="text" placeholder={"Put image URL here"} onChange={(imageUrl) => { this.updateElementState(imageUrl,"imageUrl") }} />
          </div>
          <div>
            {/*Clicking on button executes the function to check the image exention.*/}
            <button className={"doneButton"} onClick={() => {  this.checkImageExtention(this.state.modalImage); }}> Done </button>
            
            {/*Clicking on cancel button resets the show modal state and modal image state.*/}
            <button className={"cancelButton"} onClick={() => { this.setState({ showModal: false, modalImage:"", })}}> Cancel </button>
          </div>
        </div>
    }
    else {
      var modal = null;
    }

    //Render and return the main body.
    return (
      <div>
        <div style={styles.pageContainer}>

          {/*Left Section (Contains logo and information) */}
          <div>
            <img style={styles.egramLogo} src={egramLogo} />
            <div style={styles.disclaimer}>
              Please do not use this web application to share personal information.
              This is an open source project and we are not liable for
              any thing that this web application is being used to share.
              </div>
          </div>
          {/*------------------------------*/}

          <div style={styles.feedContainer}>

            {/*Status Form*/}
            <div style={styles.statusFormContainer}>

              {/*Display image while submitting form.*/}
              <div>
                <img style={styles.modalImage} src={this.state.modalImage} />
                {cancelImage}
                {modal}
                <img src={this.state.image} />
              </div>
              {/*------------------------------*/}

              {/*Text, Name and Image container.*/}
              <div style={styles.statusFormOuterFlex}>
                <div style={styles.statusFormInnerFlex}>
                  <input style={styles.userNameContainer} type="text" value={this.state.name || ""} onChange={(name) => { this.updateElementState(name,"name") }} placeholder={"Enter your name (Should be 15 Characters)"} />
                  
                  {/*Clicking the post now button executes the function that sends the data to the database. */}
                  <div className={"postButton"} onClick={() => { this.addToDatabase() }}>
                    <div  style={styles.postNowMargin}> Post Now </div>
                  </div>
                </div>
                <div style={styles.textAreaContainer}>
                  <textarea type="text" value={this.state.text || ""} placeholder={"What do you want to share with your community?! \n(Should be 150 characters.)"} resize={null} rows={3} onChange={(text) => { this.updateElementState(text,"text") }} style={styles.descriptionTextArea} />
                  
                  {/*Clicking the image button sets the value of modal to true which displays the modal. */}
                  <button className={"buttonBg"} onClick={() => { this.setState({ showModal: true }) }}>
                    <img style={styles.buttonImage} src={uploadImgButt} />
                  </button>
                </div>
              </div>
              {/*------------------------------*/}

            </div>

            {/*Table for the posts*/}
            <FeedTable data={this.state.items} handler={this.handler} />
            {/*------------------------------*/}

          </div>

          {/*Right Section*/}
          <div style={styles.rightSectionFlex}>
            {/*Top Posts Column*/}
            <TopPosts data={myData} />
            {/*Top Posters Column*/}
            <TopPosters  item={"name"} data={myData} />
          </div>
          {/*------------------------------*/}

        </div>
      </div>
    );
  }
}

export default List;
