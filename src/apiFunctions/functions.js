import { getList, addToList, updateItem } from "./httpApi";

//Function that sends data to the backend.
export const addToDatabase = function () {
  //checking if number of characters are within the limit.
  if (this.state.name.length > 15 || this.state.text.length > 150) {
    alert("User name should be less than 15 characters long. \nThe post/text should be less than 150 characters long.")
  }
  else {
    //if user name or password field is empty, send an alert.
    if (this.state.name === "" || typeof (this.state.text) === "undefined") {
      alert("Please fill in the username and password")
    }
    else {
      //on correct input send data to the backend.
      addToList(
        this.state.name,
        this.state.text,
        this.state.showModalImage,
        this.getCurrentDateTime(),
      )
      //Show alert on success.
      alert('Your post has been posted!!');

      //Setting all states to default values.
      this.setState({
        id: "",
        text: "",
        name: "",
        editDisabled: false,
        likes: 0,
        dislikes: 0,
        image: '',
        showModal: false,
        modalImage: '',
      });
    }
  }
}

 
  export const updateElementState = function(element,type){
    console.log(type);
    if (type == "name"){
      this.setState({ name: element.target.value, });
    }
    else if (type == "imageUrl"){
      this.setState({ modalImage: element.target.value, });
    }
    else if (type == "text"){
      this.setState({ text: element.target.value, });
    }
  };
 

//Function that gets the current date and time.
export const getCurrentDateTime = function () {
  var today = new Date(),

  //objects that contain month, day and minutes.
  day = today.getDate(),
  month = today.getMonth(),
  hour = today.getHours(),
  minutes = today.getMinutes();
  
  var monthNameArray = ["January", "February", "March",
   "April", "May", "June", "July", "August", "September",
    "October", "November", "December",]

  var dateTime = day + " " + monthNameArray[month] + " " + hour + ":" + minutes;
  return dateTime
}


//Function that makes an API call to get data from the backend.
export const getAll = function () {
  getList().then(data => {
    //push the posts into the state.
    this.setState(
      {
        items: data.posts,
      },
    );
  });
}

export const checkImageExtention = function (imageUrl) {
  var validExtentions = ["jpg", "png", "gif", "jpeg"]

  if (imageUrl !== "") {
    //split the string to get the extention.
    var splitString = imageUrl.toString().split(".");
    var getExtention = splitString[splitString.length - 1]

    //If the extention is not present in the valid extention array.
    if (validExtentions.includes(getExtention) !== true) {
      alert("Invalid Image");
    }
    else {
      this.setState({ showModal: false, showModalImage: imageUrl });
    }
    //Remove image from stored state.
    //this.setState({showModalImage:""})
  }

}


