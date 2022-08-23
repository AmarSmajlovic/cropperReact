import React from "react";
import { PixelCrop } from "react-image-crop";
import {
  CropImageContext,
  CropImageContextType,
} from "../../../modules/CropImage";
import Cropper from "../../Cropper/Cropper";
import Modal from "../Modal";

interface CropperProps {
  img: string;
  setCropped: React.Dispatch<React.SetStateAction<boolean>>;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

export default function CropperModal({
  img,
  setCropped,
  setImgSrc,
}: CropperProps) {
  const { modalIsOpen: isOpen, setIsOpen } = React.useContext(
    CropImageContext
  ) as CropImageContextType;
  const [croppedImage, setCroppedImage] = React.useState<string>("");
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>();

  function closeModal() {
    setIsOpen((v: boolean) => (v = !v));
    setImgSrc("");
  }

  const submit = () => {
    setCropped(true);
    setImgSrc(croppedImage);
    setIsOpen((v: boolean) => (v = !v));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div>
        <Cropper
          img={img}
          imgRef={imgRef}
          setCompletedCrop={setCompletedCrop}
          completedCrop={completedCrop}
          setCroppedImage={setCroppedImage}
        />
        {/* Image to be shown on crop change */}
        <img src={croppedImage} />
        <button onClick={closeModal}>close</button>
        <button onClick={submit}>submit</button>
      </div>
    </Modal>
  );
}
