import { Icon } from "@iconify/react";

type GreetingsProps = {
  currentTime?: string; // TODO ganti nanti ke time
  userName: string;
  userMajor: string;
  onClick?: () => void;
  userImg?: string;
};

type ButtonProps = {
  onClick?: () => void;
};

const NewsButton = ({ onClick }: ButtonProps) => (
  <div
    onClick={onClick}
    className="w-16 p-2 rounded-lg bg-slate-50 cursor-pointer transition hover:text-slate-500 text-gray-700"
  >
    <Icon icon="fluent:news-24-filled" className="w-full h-full" />
  </div>
);

export const GreetingsBar: React.FunctionComponent<GreetingsProps> = ({
  userName,
  userMajor,
  onClick,
  userImg,
}) => {
  return (
    <div className="flex flex-row px-4 py-2 bg-gray-800 text-white rounded-lg items-center justify-between">
      <div className="flex-col">
        <h3 className="text-xl lg:text-3xl font-bold">Good Morning</h3>
        <p>{userName}</p>
        <p className="italic">{userMajor}</p>
      </div>
      <div className="flex gap-3">
        {/* <NewsButton onClick={onClick} /> */}
        <div className="w-16 object-contain bg-white p-2 rounded-lg">
          <img src={userImg} className="" />
        </div>
      </div>
    </div>
  );
};
