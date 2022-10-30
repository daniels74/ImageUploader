import React, { useEffect, useState } from "react";
const imageUrl = "https://i.imgur.com/fHyEMsl.jpg";

export default function App() {
  const [img, setImg] = useState();

  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    console.log("res: ", res);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <img src={img} alt="icons" />
    </>
  );
}
