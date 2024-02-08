"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import classes from "./image-picker.module.css";

const ImagePicker = ({ label, name }) => {
  const imgRef = useRef();
  const [pickedImage, setPickedImage] = useState(null);
  const handleOnClick = () => {
    imgRef.current.click();
  };

  const onChangeImage = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>

      <div className={classes.controls}>
        <input
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpg"
          className={classes.input}
          onChange={onChangeImage}
          ref={imgRef}
          required
        />
        <div className={classes.preview}>
          {!pickedImage && <p>No image selected.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="The image you picked" fill />
          )}
        </div>
        <button
          onClick={handleOnClick}
          type="button"
          className={classes.button}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
