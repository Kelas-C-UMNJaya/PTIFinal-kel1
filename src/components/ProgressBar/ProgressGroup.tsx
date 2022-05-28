type Props = {
  className?: string;
  children: React.ReactNode;
}

export const ProgressGroup = ({className, children}: Props) => {
  return (
  <div className={`progress-group ${className} grid grid-cols-2 p-3 rounded-xl bg-gray-800 gap-3`}>
    {children}
  </div>
  )
}