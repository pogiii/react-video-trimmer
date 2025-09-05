import { Button, type ButtonProps } from '../../../../components/ui/button';
import './style.css';

interface ControlButtonProps extends ButtonProps {
  icon: React.ReactNode;
}

export const ControlButton = ({ icon, ...props }: ControlButtonProps) => {
  return (
    <Button
      className='control-button flex items-center justify-center'
      {...props}
    >
      {icon}
    </Button>
  );
};
