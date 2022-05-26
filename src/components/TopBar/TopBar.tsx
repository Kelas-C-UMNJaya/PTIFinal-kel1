type Props = {
  clock: string, // TODO ganti ke clock
  date: string, // TODO ganti ke tipe data yang sesuai
}

export const TopBar = ({ clock, date }: Props) => {
  return (
    <div className="bg-gray-800 text-white flex justify-between p-2">
      <div>
        <p>{clock}</p>
        <p>{date}</p>
      </div>
      <div className="bg-white"></div>
      {/* TODO tambah pause button disini */}

    </div>
  )
}