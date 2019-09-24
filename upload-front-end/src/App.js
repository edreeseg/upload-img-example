import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [img, setImg] = useState(null);
  const [hostedLink, setHostedLink] = useState(null);
  const formRef = useRef(null);
  useEffect(() => {
    console.log(img);
  }, [img]);
  const uploadImg = ev => {
    ev.preventDefault();
    if (!img) return;
    const formData = new FormData();
    formData.append("file", img);
    setImg(null);
    formRef.current.reset();
    axios({
      url: "http://localhost:5000/api/upload",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: formData
    })
      .then(res => setHostedLink(res.data.url))
      .catch(err => console.log(err));
  };
  return (
    <div className="App">
      <form onSubmit={uploadImg} ref={formRef}>
        <label htmlFor="upload">
          <img
            src="https://image.flaticon.com/icons/png/128/126/126477.png"
            alt="upload"
          />
          <input
            type="file"
            id="upload"
            onChange={ev => setImg(ev.target.files[0])}
            accept="image/*"
          />
        </label><br />
        <button type="submit">Upload</button>
      </form>
      <div className="name-display">
        {img ? <p>{img.name}</p> : <p>Choose an image</p>}
        {hostedLink ? <a href={hostedLink} target="_blank" rel="noopener noreferrer">Image uploaded here</a> : null}
      </div>

    </div>
  );
}

export default App;