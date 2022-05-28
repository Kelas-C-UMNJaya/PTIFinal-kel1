type Props = {
  children: React.ReactNode;
}

export const ProgressGroup = ({children}: Props) => {
  return (
  <div className="progress-group grid grid-cols-1 p-3 rounded-xl bg-gray-800 md:grid-cols-2 gap-3">
    {children}
  </div>
  )
}