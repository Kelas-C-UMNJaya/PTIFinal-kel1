import { Button, ButtonGroup, ProgressBar, ProgressGroup } from "@/components";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/lib/UserContext";
import { useGameData } from "@/lib/GameContext";

export const DebugPage = () => {
  const { user, updateStatus, toggleStatus, changeData } = useUser();
  const { time, updateTime } = useGameData();
  const { belajar, makan, tidur, main } = user.status;
  useEffect(() => {
    const interval = setInterval(() => {
      updateStatus();
      updateTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-zinc-900 text-gray-200 mx-auto h-screen flex items-center justify-center flex-col gap-5">
      <h3 className="text-3xl font-bold">
        Hello, {user.name} from {user.major}
      </h3>
      <p>{format(time, "HH:mm:ss | E, dd MMMM yyyy")}</p>

      <ProgressGroup className="w-[32em]">
        <ProgressBar value={belajar.status.val} icon="dashicons:book" />
        <ProgressBar value={makan.status.val} icon="ion:fast-food" />
        <ProgressBar value={tidur.status.val} icon="fa-solid:bed" />
        <ProgressBar value={main.status.val} icon="fa:gamepad" />
      </ProgressGroup>

      <div className="flex gap-5">
        <ButtonGroup>
          <Button
            active={belajar.status.isActive}
            onClick={() => toggleStatus("belajar")}
          >
            Belajar
          </Button>
          <Button
            active={makan.status.isActive}
            onClick={() => toggleStatus("makan")}
          >
            Makan
          </Button>
          <Button
            active={main.status.isActive}
            onClick={() => toggleStatus("main")}
          >
            Main
          </Button>
          <Button
            active={tidur.status.isActive}
            onClick={() => toggleStatus("tidur")}
          >
            Tidur
          </Button>
        </ButtonGroup>
        <ButtonGroup className="justify-center">
          <Button
            onClick={() =>
              user.name === "Agus"
                ? changeData("Bambang", "DKV")
                : changeData("Agus", "Informatika")
            }
          >
            Change Data
          </Button>
        </ButtonGroup>
      </div>

      <Link to="/">
        <Button>Back</Button>
      </Link>
    </div>
  );
};
