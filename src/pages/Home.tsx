import { Button, ButtonGroup } from "@/components";
import umnBg from "@/assets/background/umn-pagi.png";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${umnBg})`,
      }}
    >
      <div className="h-1/4 object-cover">
        <img src={`${logo}`} className="h-full" />
      </div>
      <ButtonGroup>
        <Link to="/avatar">
          <Button>Start</Button>
        </Link>
        <Link to="/game">
          <Button>Resume</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};
