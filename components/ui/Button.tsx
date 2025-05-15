import { ButtonProps, Button as HerouiButton } from "@heroui/react";

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <HerouiButton
      {...props}
      className={`bg-primary-950 text-white hover:bg-primary-900 ${props.className}`}
      radius="none"
    >
      {children}
    </HerouiButton>
  );
};

export default Button;
