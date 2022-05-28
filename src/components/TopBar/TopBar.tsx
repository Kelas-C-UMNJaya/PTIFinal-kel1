import { Icon } from '@iconify/react';

type Props = {
  clock: string, // TODO ganti ke clock
  date: string, // TODO ganti ke tipe data yang sesuai
  onClick: () => void,
}

type ButtonProps = {
  onClick?: () => void,
}

const PauseButton = (
  {onClick} : ButtonProps
) => (
<div onClick={onClick} className="flex justify-center rounded-lg cursor-pointer text-2xl transition hover:text-slate-400 text-slate-300">
    <Icon icon="carbon:pause-filled" />
  </div>
)

export const TopBar = ({ clock, date, onClick, ...props }: Props) => {
  return (
    <div className="bg-gray-800 text-white rounded-b-lg flex justify-between px-4 py-2 h-9" {...props}>
      <div className="flex items-center gap-3">
        <p className="text-xl font-bold">{clock}</p>
        <p className="text-sm">{date}</p>
      </div>
      <div className="bg-white"></div>
      <PauseButton onClick={onClick} />
    </div>
  )
}