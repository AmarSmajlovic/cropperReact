import React, { useState, useRef } from 'react'

import ReactCrop, { makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import { canvasPreview } from './services/canvasPreview'
import { useDebounceEffect } from './services/useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import { imgPreview } from './services/imgPreview'

export default function App() {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<any>(null)
  const [crop, setCrop] = useState<any>({x:0,y:0,height:200,width:200,unit:'px',aspect:1/1})
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoaded = (image: HTMLImageElement) => {
    imgRef.current = image;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: 100,
        height: 100,
        y: 0,
        x: 0,
        aspect:1/1
      },
      400,
      400,
    )
     console.log(crop)
    setCrop(crop)
    return false
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
        )
      }
    },
    100,
    [completedCrop, 
    ],
  )

  return (
    <div className="App">
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      {Boolean(imgSrc) && (
        <>
        <ReactCrop
          crop={crop}
          ruleOfThirds={true}
          minHeight={250}
          minWidth={250}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={async (c: any) =>{ 
            setCompletedCrop(c)
            const url = await imgPreview(imgRef.current,crop);
            console.log(url);
          }}
          onImageLoaded={onImageLoaded}
          style={{ width: '400px', height: '400px' }}
          src={imgSrc}
        />
        <div>
        <canvas
          ref={previewCanvasRef}
          style={{
            border: '1px solid black',
            objectFit: 'fill',
            width: 400,
            height: 400,
          }}
        />
      </div>
        </>
      )}
    </div>
  )
}
