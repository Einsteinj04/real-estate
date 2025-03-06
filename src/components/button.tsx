'use client';
import { Button } from '@/components/mui';
import styles from './components.module.css';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    background?: string;
    color?: string;
    children?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ background, color, className, children, ...buttonProps }) => {
    return (
        <Button
            {...buttonProps}
            style={{ '--background-color': background, '--text-color': color } as React.CSSProperties}
            className={`${styles.button} font-[300] normal-case ${className || ''}`}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
