import {
  DualRangeSlider,
  type DualRangeSliderProps,
} from '../../../../components/ui/dual-range-slider';

export const Trimmer = ({ className, ...props }: DualRangeSliderProps) => {
  return <DualRangeSlider className={`trimmer ${className}`} {...props} />;
};
