import bodyImg from "@/assets/avatar/body.png";

export const AvatarBody = ({
  head,
  className,
}: {
  head: string;
  className?: string;
}) => {
  return (
    <div
      className={`relative flex flex-col justify-end items-center h-0 min-h-full overflow-hidden ${className}`}
    >
      <div className="flex flex-col w-32 lg:w-[200px]">
        <img src={head} className="" />
        <img src={bodyImg} />
      </div>
    </div>
  );
};
