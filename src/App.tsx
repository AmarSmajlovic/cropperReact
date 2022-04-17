import React from "react";
import Cropper from "./components/Cropper/Cropper";

export default function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState("");
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
      <Cropper
        isOpen={modalIsOpen}
        setCropped={setCropped}
        setIsOpen={setIsOpen}
        setImgSrc={setImgSrc}
        img={imgSrc}
      />
    </div>
  );
}
