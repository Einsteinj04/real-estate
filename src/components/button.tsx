'use client'
import { Button } from '@/components/mui';
import styles from './components.module.css';

interface CustomButtonProps {
  background?: string;
  color?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any; // Allow other props (e.g., onClick, disabled, etc.)
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { background, color, className, ...buttonProps } = props;

  return (
    <Button
      {...buttonProps}
      style={{ '--background-color': background, '--text-color': color } as React.CSSProperties}
      className={`${styles.button} font-[500] font-metro-sans normal-case ${className || ''}`}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;


















// 'use client'
// import {Button} from '@/components/mui'
// import styles from './components.module.css'

// const CustomButton = (props: { [x: string]: any; children?: any; background?: any; color?: any }) => {
//     const {background, color,...buttonProps} = props
//     return (
//     <Button 
//     {...buttonProps}
//     style={{'--background-color': props?.background, '--text-color': props?.color }}
// 	className={`${styles.button} font-[300] normal-case ${props?.className}`}>
//     {props?.children}</Button>
//         )
// } 

// export default CustomButton