import { React, useState } from "react";
// UI
import "./App.css";

function App() {
  const [image, setImage] = useState("");

  const handleFileInput = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const postImage = async () => {
    try {
      //set api url
      const url = "http://localhost:5001/image";

      const formData = new FormData();
      formData.append("image", image);

      // Post request
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      // Wait for response
      const result = await response.json();
      console.log("result: ", result);
    } catch (error) {
      alert("service error");
      console.log(error);
    }
  };

  const [imageNames, setImageNames] = useState([]);
  const getImageNames = async () => {
    try {
      const url = "http://localhost:5001/images/all";
      const response = await fetch(url, {
        method: "GET",
      });
      const result = await response.json();
      console.log("result", result);
      setImageNames(result);
    } catch (err) {
      console.log(err);
    }
  };

  const [currentImg, setCurrentImg] = useState("");

  const getImg = async (nombre) => {
    try {
      const URL = `http://localhost:5001/image/${nombre}`;
      // const response = await
      fetch(URL, {
        method: "GET",
      })
        // .then((data) => data.json())
        .then((data) => {
          console.log("data.url: ", data.url);
          const d = data.url;
          setCurrentImg(d);
          console.log("CurrentImg: ", currentImg);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const [toggleImgList, setToggleImgList] = useState(false);
  const [toggleimg, settoggleimg] = useState(false);

  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleFileInput} />
        <button onClick={postImage}>SUBMIT</button>
      </div>
      <div>
        <button onClick={getImageNames}>Get Image Names</button>
        <button onClick={() => setToggleImgList(!toggleImgList)}>
          Image List
        </button>
      </div>
      <div>
        <div>Load an Image from database</div>
        {toggleImgList &&
          imageNames.map((name) => {
            // console.log(name.filename);
            return (
              <button onClick={() => getImg(name.filename)}>
                {name.filename}
              </button>
            );
          })}
      </div>
      <div>
        <button onClick={() => settoggleimg(!toggleimg)}>Show Image</button>
      </div>
      {toggleimg && <img src={currentImg} alt="database"></img>}
    </div>
  );
}

export default App;
