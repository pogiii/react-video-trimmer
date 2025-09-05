import { forwardRef } from 'react';
import './style.css';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return (
    <div ref={ref} {...props} className={`card ${props.className ?? ''}`} />
  );
});

Card.displayName = 'Card';

export { Card };
