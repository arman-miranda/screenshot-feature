import React, { Component } from "react"
import Cropper from "cropperjs"
import "cropperjs/dist/cropper.css"
import Image from "images/small.png"

class App extends Component {
  constructor() {
    super()
    this.state = {
      cropper: null,
      downloadLink: null,
      filename: "cropped"
    }
  }

  componentDidMount() {
    let image = document.getElementById("image")
    let cropper = new Cropper(image, {
      aspectRatio: 16/9,
      viewMode: 0,
      guides: false,
      center: false,
      preview: "#preview",
    })
    
    this.setState({cropper: cropper})
  }

  replaceImage(e) {
    if(e.target != null) {
      let image_blob_url = URL.createObjectURL(e.target.files[0])
      this.state.cropper.replace(image_blob_url)
    }
  }

  downloadCroppedImage(e){
    let downloadLink = this.state.cropper
                                 .getCroppedCanvas()
                                 .toDataURL("image/jpeg")

    this.setState({downloadLink: downloadLink})
  }

  handleChangeFilename(e){
    this.setState({filename: e.target.value})
  }

  render(){
    return(
      <div className="container">
        <label id="upload">
          <input className="sr-only" type="file" accept=".jpg, .jpeg, .png" 
                 onChange={this.replaceImage.bind(this)}/>
          <span className="icon">
            <i className="fas fa-upload"></i>
          </span>
        </label>

        <div id="canvas">
          <img id="image" src={Image}/>
        </div>

        <div>
          <div id="preview">
          </div>

          <label>
            Filename:
          </label><br/>
          <div id="filename-input">
            <input id="filenameTextBox" type="text" 
                   value={this.state.filename} onChange={this.handleChangeFilename.bind(this)}/>

            <a href={this.state.downloadLink} download={this.state.filename + ".jpg"} 
               className="" onClick={this.downloadCroppedImage.bind(this)}>
              <span className="icon">
                <i className="fas fa-download"></i>
              </span>
            </a>
          </div><br/>
        </div>
      </div>
    )
  }
}

export default App
