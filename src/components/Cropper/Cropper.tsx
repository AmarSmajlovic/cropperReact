import React from "react";
import Modal from "react-modal";
import ReactCrop, {
  Crop,
  centerCrop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
// import "react-image-crop/src/ReactCrop.scss";
import "react-image-crop/dist/ReactCrop.css";
import { imgPreview } from "./imgPreview";
import { useDebounceEffect } from "./useDebounceEffect";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: "400px",
    width: "400px",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface CropperProps {
  isOpen: boolean;
  setIsOpen: any;
  img: string;
  setCropped: any;
  setImgSrc: any;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: 300,
        height: 300,
      },
      4 / 4,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function Cropper(props: CropperProps) {
  const { isOpen, setIsOpen, img, setCropped, setImgSrc } = props;
  const [crop, setCrop] = React.useState<any>();
  const [croppedImage, setCroppedImage] = React.useState("");
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = React.useState<PixelCrop>();
  function closeModal() {
    setIsOpen((v: boolean) => (v = !v));
  }
  const submit = () => {
    setCropped(true);
    setImgSrc(croppedImage);
    setIsOpen((v: boolean) => (v = !v));
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 4 / 4));
  }

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current) {
        const url = await imgPreview(imgRef.current, completedCrop);
        console.log(url);
        setCroppedImage(url);
      }
    },
    0,
    [completedCrop]
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <button onClick={closeModal}>close</button>
      <ReactCrop
        minHeight={200}
        maxHeight={400}
        minWidth={200}
        maxWidth={400}
        ruleOfThirds
        crop={crop}
        onComplete={(c) => setCompletedCrop(c)}
        onChange={(_, c) => {
          setCrop({
            x: c.x,
            y: c.y,
            width: c.width,
            height: c.width,
            unit: "%",
          });
          console.log(c.height);
        }}
      >
        <img
          style={{ width: "300px", height: "300px" }}
          src={img}
          alt="Cropp"
          ref={imgRef}
          onLoad={onImageLoad}
        />
      </ReactCrop>
      <button onClick={submit}>submit</button>
    </Modal>
  );
}
