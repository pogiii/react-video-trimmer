/* eslint-disable react-refresh/only-export-components */
import { Card } from '../../../../components/ui/card';
import { formatTimeToMMSS } from '../../../../utils/time';
import './style.css';
import { useMemo, memo } from 'react';

const Root = ({ children }: { children: React.ReactNode }) => {
  return <Card className='timeline-root flex flex-col gap-1'>{children}</Card>;
};

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='timeline-body flex justify-center items-center'>
      {children}
    </div>
  );
};

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='timeline-header flex justify-between items-center text-sm'>
      {children}
    </div>
  );
};

interface TimeProps {
  currentTime: number;
  duration: number;
}

const Time = memo(({ currentTime, duration }: TimeProps) => {
  const parsedCurrentTime = useMemo(() => formatTimeToMMSS(currentTime), [currentTime]);
  const parsedDuration = useMemo(() => formatTimeToMMSS(duration), [duration]);

  return (
    <div className='timeline-duration-currentTime flex justify-end items-center'>
      {parsedCurrentTime}/{parsedDuration}
    </div>
  );
});

Time.displayName = 'Time';

const Title = memo(({ title }: { title: string }) => (
  <div className='timeline-title flex justify-start items-center'>{title}</div>
));

Title.displayName = 'Title';

export const Timeline = {
  Root,
  Body,
  Header,
  Time,
  Title,
};
