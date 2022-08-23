import React, { RefObject } from "react";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { imgPreview, useDebounceEffect } from "../../utils";

interface Props {
  img: string;
  imgRef: RefObject<HTMLImageElement>;
  setCompletedCrop: React.Dispatch<React.SetStateAction<PixelCrop | undefined>>;
  completedCrop?: PixelCrop;
  setCroppedImage: React.Dispatch<React.SetStateAction<string>>;
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

const Cropper = ({
  img,
  imgRef,
  setCompletedCrop,
  completedCrop,
  setCroppedImage,
}: Props) => {
  const [crop, setCrop] = React.useState<Crop>();

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, width / height));
  }

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
