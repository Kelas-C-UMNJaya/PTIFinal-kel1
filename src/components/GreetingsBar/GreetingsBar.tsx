import { Icon } from '@iconify/react';
// TODO bikin supaya div utamanya supaya sizenya ngikutin size anakannya

type GreetingsProps = {
  currentTime?: string, // TODO ganti nanti ke time
  userName: string,
  userMajor: string,
}

type ButtonProps = {
  onClick?: () => void,
}

const NewsButton = (
  {onClick} : ButtonProps
) => (
  <div onClick={onClick} className="flex ml-auto mt-2 mb-4 rounded-lg bg-slate-50 cursor-pointer transition hover:text-slate-500 text-gray-700">
    <Icon icon="fluent:news-24-filled" width="60" height="60" />
  </div>
)

export const GreetingsBar: React.FunctionComponent<GreetingsProps> = ({ userName, userMajor }) => {
  return (
    <div className="lg:w-96 flex flex-row px-4 py-2 bg-gray-700 text-white rounded-lg">
      <div className="flex-col">
        <h3 className="lg:text-3xl font-bold">Good Morning</h3>
        <p>{userName}</p>
        <p className="italic">{userMajor}</p>
      </div>
      <NewsButton onClick={() => console.log("tid")} />
    </div>
  )
}