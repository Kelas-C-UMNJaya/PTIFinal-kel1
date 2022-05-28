type Props = {
  children: React.ReactNode;
}

export const ProgressGroup = ({children}: Props) => {
  return (
  <div className="progress-group grid grid-cols-2 p-3 rounded-xl bg-gray-800 gap-3">
    {children}
  </div>
  )
}