import { Icon } from '@iconify/react';

type Props = {
  value: number,
  icon: string,
}

// TODO
export const ProgressBar = ({value, icon, ...props}: Props) => {
  return (
    <div {...props} className="flex gap-4 items-center">
      <Icon icon={icon} className="w-8 h-5 text-white" />
      <div className="w-full rounded-full h-4 dark:bg-slate-50">
        <div className="transition-all bg-blue-600 h-4 rounded-full" style={{width: `${value}%`}} /> 
      </div>
    </div>
  );
}