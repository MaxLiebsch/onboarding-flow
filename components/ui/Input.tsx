import { Input as HerouiInput, InputProps } from "@heroui/react";

const Input = ({ ...props }: InputProps) => {
  return <HerouiInput radius="none" {...props} />;
};

export default Input;
