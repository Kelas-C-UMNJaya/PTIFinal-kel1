import { Button, ButtonGroup, ProgressBar, ProgressGroup } from "@/components";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/lib/UserContext";
import { useGameData } from "@/lib/GameContext";
import { Location } from "@/data/Location";
import { useState } from "react";

export const DebugPage = () => {
  const { user, updateStatus, toggleStatus, changeData } = useUser();
  const { time, updateTime } = useGameData();
  const { belajar, makan, tidur, main } = user.status;
  const [locationIdx, setLocationIdx] = useState(0);
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
      <p>{format(time, "HH:mm | E, dd MMMM yyyy")}</p>

      <ProgressGroup className="w-[32em]">
        <ProgressBar
          label={`${Math.round(belajar.state.val)}%`}
          value={belajar.state.val}
          icon="dashicons:book"
        />
        <ProgressBar
          label={`${Math.round(makan.state.val)}%`}
          value={makan.state.val}
          icon="ion:fast-food"
        />
        <ProgressBar
          label={`${Math.round(tidur.state.val)}%`}
          value={tidur.state.val}
          icon="fa-solid:bed"
        />
        <ProgressBar
          label={`${Math.round(main.state.val)}%`}
          value={main.state.val}
          icon="fa:gamepad"
        />
      </ProgressGroup>

      <div className="flex gap-5">
        <ButtonGroup>
          {Location[locationIdx].actions.map((loc, idx) => (
            <Button
              key={idx}
              active={user.status[loc.status.name].state.isActive}
              onClick={() => toggleStatus(loc.status.name)}
            >
              {loc.name}
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup>
          {Location[locationIdx].actions.map((loc, idx) => (
            <>
              <Button
                key={idx}
                onClick={() =>
                  user.status[loc.status.name].dispatch({ type: "resetRate" })
                }
              >
                Reset {loc.name}
              </Button>
              <Button
                key={idx + 10}
                onClick={() =>
                  user.status[loc.status.name].dispatch({
                    type: "setRate",
                    payload: { growth: 30, shrink: 40 },
                  })
                }
              >
                Change {loc.name} rate
              </Button>
            </>
          ))}
        </ButtonGroup>

        <ButtonGroup className="justify-center">
          <Button
            onClick={() =>
              user.name === "Agus"
                ? changeData({ name: "Bambang", major: "DKV" })
                : changeData({ name: "Agus", major: "Informatika" })
            }
          >
            Change User
          </Button>
          <Button
            onClick={() => {
              locationIdx == 0 ? setLocationIdx(1) : setLocationIdx(0);
              toggleStatus();
            }}
          >
            Change Location
          </Button>
        </ButtonGroup>
      </div>

      <div className="text-center">
        <img
          src={Location[locationIdx].bgImg}
          alt="location"
          className="object-cover h-48"
        />
        <p>Currently, you're in {Location[locationIdx].name}</p>
      </div>

      <Link to="/">
        <Button>Back</Button>
      </Link>
    </div>
  );
};
