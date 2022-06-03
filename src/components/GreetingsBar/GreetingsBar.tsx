import { Icon } from "@iconify/react";

type GreetingsProps = {
  currentTime: Date; // TODO ganti nanti ke time
  userName: string;
  userMajor: string;
  onClick?: () => void;
  userImg?: string;
};

function hourToGreet(time: Date) {
  const hour = time.getHours();
  if (hour < 12) {
    return "Selamat Pagi";
  } else if (hour < 17) {
    return "Selamat Siang";
  } else {
    return "Selamat Malam";
  }
}

export const GreetingsBar: React.FunctionComponent<GreetingsProps> = ({
  currentTime,
  userName,
  userMajor,
  userImg,
}) => {
  return (
    <div className="flex flex-row px-4 py-2 bg-gray-800 text-white rounded-lg items-center justify-between">
      <div className="flex-col">
        <h3 className="text-xl lg:text-3xl font-bold">
          {hourToGreet(currentTime)}
        </h3>
        <p>{userName}</p>
        <p className="italic">{userMajor}</p>
      </div>
      <div className="flex gap-3">
        <div className="w-16 object-contain bg-white p-2 rounded-lg">
          <img src={userImg} className="" />
        </div>
      </div>
    </div>
  );
};
