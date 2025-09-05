/* eslint-disable react-refresh/only-export-components */
import { Card } from '../../../../components/ui/card';
import { formatTimeToMMSS } from '../../../../utils/time';
import './style.css';

const Root = ({ children }: { children: React.ReactNode }) => {
  return <Card className="timeline-root flex flex-col gap-1">{children}</Card>;
};


const Body = ({ children }: { children: React.ReactNode }) => {
  return <div className="timeline-body">{children}</div>;
};


const Header = ({ children }: { children: React.ReactNode }) => {
  return <div className="timeline-header flex justify-between items-center text-sm">
    {children}
  </div>;
};

interface TimeProps {
  currentTime: number;
  duration: number;
}

const Time = ({ currentTime, duration }: TimeProps) => {
  
  const parsedCurrentTime = formatTimeToMMSS(currentTime);
  const parsedDuration = formatTimeToMMSS(duration);

  return(<div className="timeline-duration-currentTime">
    {parsedCurrentTime}/{parsedDuration}
  </div>)
}

const Title = ({ title }: { title: string }) => (
  <div className="timeline-title">{title}</div>
)


export const Timeline = {
  Root,
  Body,
  Header,
  Time,
  Title,
};