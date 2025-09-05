import "./style.css";

type PointerProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Pointer = ({ className, ...props }: PointerProps) => {
  return <input type="range" className={`timeline-pointer ${className}`} {...props} />
};