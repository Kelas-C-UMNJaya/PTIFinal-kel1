type Props = {
  children: React.ReactNode,
}

export const ButtonGroup: React.FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <div className="md:w-96 p-4 bg-gray-800 rounded-lg flex flex-col flex-shrink gap-3" {...props}>
      {children}
    </div>
  )
}