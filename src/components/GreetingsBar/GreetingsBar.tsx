// TODO bikin supaya div utamanya supaya sizenya ngikutin size anakannya
// TODO bikin icon news di sebelah kanan div parentnya

type GreetingsProps = {
  currentTime?: string, // TODO ganti nanti ke time
  userName: string,
  userMajor: string,
}

export const GreetingsBar: React.FunctionComponent<GreetingsProps> = ({ userName, userMajor }) => {
  return (
    <div className="w-full flex flex-col px-4 py-2 bg-gray-700 text-white rounded-lg">
      <div>
        <h3 className="text-3xl font-bold">Hello,</h3>
        <p>{userName}</p>
        <p className="italic">{userMajor}</p>
      </div>
    </div>
  )
}