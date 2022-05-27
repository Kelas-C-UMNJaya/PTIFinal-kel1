import { Icon } from '@iconify/react';

type Props = {
  clock: string, // TODO ganti ke clock
  date: string, // TODO ganti ke tipe data yang sesuai
}

type ButtonProps = {
  onClick?: () => void,
}

const PauseButton = (
  {onClick} : ButtonProps
) => (
  <div onClick={onClick} className="flex rounded-lg cursor-pointer transition hover:text-slate-400 text-slate-300">
    <Icon icon="carbon:pause-filled" width="40" height="40" />
  </div>
)

export const TopBar = ({ clock, date }: Props) => {
  return (
    <div className=" bg-gray-800 text-white flex justify-between px-4 py-2 rounded-lg">
      <div className="flex items-center gap-3">
        <p className="text-3xl font-bold">{clock}</p>
        <p>{date}</p>
      </div>
      <div className="bg-white"></div>
      <PauseButton onClick={() => console.log("tid")} />
    </div>
  )
}