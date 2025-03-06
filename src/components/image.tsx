import React from 'react';
import NextJsImage, { ImageProps } from 'next/image';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

interface CustomImageProps extends Omit<ImageProps, 'src'> {
    src?: string | { src: string };
    wrapperClassName?: string;
}

export const Image: React.FC<CustomImageProps> = ({ 
    alt = 'image', 
    src, 
    priority = false, 
    wrapperClassName = '', 
    ...props 
}) => {
    return (
        <div className={`${wrapperClassName} relative`}>
            {src ? (
                <NextJsImage 
                    alt={alt} 
                    priority={priority} 
                    width={3840} 
                    height={2160} 
                    src={typeof src === 'string' ? src : src.src} 
                    {...props} 
                    style={{ ...props.style }} 
                />
            ) : (
                <div {...props} className={`${props.className || ''} flex items-center justify-center bg-gray-800`}>
                    <InsertPhotoOutlinedIcon className="text-[50px] text-zinc-300" />
                </div>
            )}
            <div className="absolute inset-0 bg-transparent opacity-75"></div>
        </div>
    );
};

export const NativeImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
    return (
        <div className="relative">
            <img fetchPriority="high" {...props} style={{ ...props.style }} />
            <div className="absolute inset-0 bg-transparent opacity-75"></div>
        </div>
    );
};
