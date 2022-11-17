import { Button, ButtonProps } from "./Button";
import { LoadingCircle } from "./icons/LoadingCircle";

interface Props extends ButtonProps {
  isLoading: boolean;
}

export const LoadingButton = ({ isLoading, ...props }: Props) => (
  <Button
    {...props}
    icon={isLoading ? <LoadingCircle /> : props.icon}
    disabled={isLoading || props.disabled}
  />
);
