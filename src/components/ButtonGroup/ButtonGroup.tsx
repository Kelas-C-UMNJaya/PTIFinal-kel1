type Props = {
  children: React.ReactNode,
}

export const ButtonGroup: React.FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <div className="p-4 bg-gray-300 rounded-lg flex flex-col flex-shrink gap-3" {...props}>
      {children}
    </div>
  )
}