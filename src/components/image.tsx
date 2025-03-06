import React from 'react';
import NextJsImage, { ImageProps } from 'next/image';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

interface CustomImageProps extends Omit<ImageProps, 'src' | 'width' | 'height'> {
    src?: string | { src: string };
    wrapperClassName?: string;
    width?: number;  // Ensure these properties are explicitly defined
    height?: number; // Ensure these properties are explicitly defined
}

export const Image: React.FC<CustomImageProps> = ({ 
    alt = 'image', 
    src, 
    priority = false, 
    wrapperClassName = '', 
    width = 3840, // Default width if not provided
    height = 2160, // Default height if not provided
    ...props 
}) => {
    return (
        <div className={`${wrapperClassName} relative`}>
            {src ? (
                <NextJsImage 
                    alt={alt} 
                    priority={priority} 
                    width={width}  // Ensure it's passed as a number
                    height={height} // Ensure it's passed as a number
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
