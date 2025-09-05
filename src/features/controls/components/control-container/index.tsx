import './style.css';

interface ControlContainerProps {
  children: React.ReactNode;
}

export const ControlContainer = ({ children }: ControlContainerProps) => {
  return <div className='control-container'>{children}</div>;
};
