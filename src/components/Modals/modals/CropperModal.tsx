import React from "react";
import { PixelCrop } from "react-image-crop";
import { imgPreview, useDebounceEffect } from "../../../utils";
import Cropper from "../../Cropper/Cropper";
import Modal from "../Modal";

interface CropperProps {
  isOpen: boolean;
  setIsOpen: any;
  img: string;
  setCropped: any;
  setImgSrc: any;
}

export default function CropperModal(props: CropperProps) {
  const { setIsOpen, isOpen, img, setCropped, setImgSrc } = props;
  const [croppedImage, setCroppedImage] = React.useState("");
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

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current) {
        const url = await imgPreview(imgRef.current, completedCrop);
        setCroppedImage(url);
      }
    },
    0,
    [completedCrop]
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div>
        <Cropper
          img={img}
          imgRef={imgRef}
          setCompletedCrop={setCompletedCrop}
        />
        {/* Image to be shown on crop change */}
        {/* <img src={croppedImage} /> */}
        <button onClick={closeModal}>close</button>
        <button onClick={submit}>submit</button>
      </div>
    </Modal>
  );
}
