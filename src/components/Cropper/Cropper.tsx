import React, { RefObject } from "react";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface Props {
  img: string;
  imgRef: RefObject<HTMLImageElement>;
  setCompletedCrop: React.Dispatch<React.SetStateAction<PixelCrop | undefined>>;
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
        width: mediaWidth - 20,
        height: mediaHeight - 20,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const Cropper = ({ img, imgRef, setCompletedCrop }: Props) => {
  const [crop, setCrop] = React.useState<Crop>();

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, width / height));
  }

  return (
    <ReactCrop
      ruleOfThirds
      crop={crop}
      onComplete={(c) => setCompletedCrop(c)}
      onChange={(_, c) => {
        setCrop({
          x: c.x,
          y: c.y,
          width: c.width,
          height: c.height,
          unit: "%",
        });
      }}
    >
      <img
        style={{ maxHeight: "60vh" }}
        src={img}
        alt="Cropp"
        ref={imgRef}
        onLoad={onImageLoad}
      />
    </ReactCrop>
  );
};

export default Cropper;
