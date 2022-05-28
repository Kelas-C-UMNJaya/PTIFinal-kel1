type Props = {
  children: React.ReactNode,
  className?: string,
}

export const ButtonGroup: React.FunctionComponent<Props> = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 bg-gray-800 rounded-lg flex flex-col flex-shrink gap-3 ${className}`} {...props}>
      {children}
    </div>
  )
}