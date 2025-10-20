import React, { useState, useRef, FC, useEffect } from 'react'

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import './styles.scss'

import 'react-image-crop/dist/ReactCrop.css'
import { useTranslation } from 'react-i18next'

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

interface IImageCropperProps {
    file: File
    onCropped: (file?: File) => void,
    aspect?: number,
    max_size?: number
}

export const ImageCropper: FC<IImageCropperProps> = ({ file, onCropped, aspect = 6 / 4, max_size }) => {
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [hasMaxSizeError, setHasMaxSizeError] = useState(false)

    useEffect(() => {
        if (file) {
            setImgSrc(URL.createObjectURL(file) || '')
        }
    }, [file])

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    function onDownloadCropClick() {
        if (!previewCanvasRef.current) {
            throw new Error('Crop canvas does not exist')
        }

        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) {
                throw new Error('Failed to create blob')
            }
            if (max_size && (blob.size > max_size)) {
                setHasMaxSizeError(true);
            } else {
                setHasMaxSizeError(false);
                onCropped(new File([blob], file.name))
            }
            setCrop(undefined)
        })
    }
    const { t } = useTranslation()

    function closeModal() {
        onCropped()
        setCrop(undefined)
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
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )
    return (
        <div className="image-cropper position">

            <div className='cropper-content image-wrapper'>
                {!!imgSrc && (
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                    >
                        <img
                            className='crop-image'
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, maxHeight: '450px', maxWidth: '480px' }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                )}

                {!!completedCrop && (
                    <>
                        <div className='hidden'>
                            <canvas
                                ref={previewCanvasRef}
                                style={{
                                    border: '1px solid black',
                                    objectFit: 'contain',
                                    width: completedCrop.width,
                                    height: completedCrop.height,
                                }}
                            />
                        </div>
                    </>
                )}

                <div className="Crop-Controls">
                    {hasMaxSizeError && max_size &&
                        <span className='error-text'>Selected image is larger than {max_size / (1024 * 1024 * 8)} MB</span>}
                    <div className='crop-button'>
                        <button type='button' onClick={onDownloadCropClick}>{t('save')}</button>
                        <button type='button' onClick={closeModal}>{t("close")}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
