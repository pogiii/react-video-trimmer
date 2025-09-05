import './style.css';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, ...props }: ButtonProps) => {
  return <button className={`button ${className ?? ''}`} {...props} />;
};

export { Button };
