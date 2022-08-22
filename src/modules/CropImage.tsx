import React from "react";
import { CropperModal } from "../components";

const CropImage = () => {
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [imgSrc, setImgSrc] = React.useState<string>("");
  const [cropped, setCropped] = React.useState(false);
  const fileRef = React.useRef<any>("");

  const openModal = () => {
    setIsOpen((v) => (v = !v));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      openModal();
    }
  };

  const cancelImage = () => {
    setImgSrc("");
    setCropped(false);
  };

  return (
    <div className="App">
      <h1>Test</h1>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      {cropped && (
        <>
          <img
            style={{ width: "300px", height: "300px" }}
            src={imgSrc}
            alt="slika"
          />
          <button onClick={cancelImage}>cancel</button>
        </>
      )}
      <CropperModal
        isOpen={modalIsOpen}
        setCropped={setCropped}
        setIsOpen={setIsOpen}
        setImgSrc={setImgSrc}
        img={imgSrc}
      />
    </div>
  );
};

export default CropImage;
