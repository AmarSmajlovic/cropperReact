import React from "react";
import { CropperModal } from "../components";

export type CropImageContextType = {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CropImageContext =
  React.createContext<CropImageContextType | null>(null);
const { Provider } = CropImageContext;

const CropImage = () => {
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [imgSrc, setImgSrc] = React.useState<string>("");
  const [cropped, setCropped] = React.useState<boolean>(false);

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
      <input type="file" accept="image/*" onChange={handleChange} />
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
      <Provider value={{ modalIsOpen, setIsOpen }}>
        <CropperModal
          setCropped={setCropped}
          setImgSrc={setImgSrc}
          img={imgSrc}
        />
      </Provider>
    </div>
  );
};

export default CropImage;
