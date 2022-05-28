import { useEffect } from "react";
import { TopBar, GreetingsBar, ProgressBar, ProgressGroup, Button, ButtonGroup} from "@/components";
const bgImg = "@/assets/background/test.jpg";

export const GamePage = () => {
  // useEffect(() => {
  //   console.dir(bgImg);
  // }, []);
  return (
    <div className={`h-screen relative flex flex-col bg-cover bg-[url(${bgImg})]`}>
      <nav className="sticky">
      <TopBar clock="19:30" date="15 Juni 2022"/>
      </nav>
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 grow">
        <div className="flex flex-col gap-4">
          <GreetingsBar userName="Aule" userMajor="Informatitid"/>
          <div id="ProgressBar" className="">
            <ProgressGroup>
              <ProgressBar value={50} icon="dashicons:book" />
              <ProgressBar value={50} icon="fa-solid:bed" />
              <ProgressBar value={50} icon="ion:fast-food"/>
              <ProgressBar value={50} icon="fa:gamepad" />
            </ProgressGroup>
          </div>
          <div id="Button" className="mt-auto">
            <ButtonGroup>
              <Button>Belajar</Button>
              <Button>HolyWings</Button>
              <Button>Kembali ke rumah</Button>
            </ButtonGroup>
          </div>
        </div>
        {/* <h1>Game Page Aul suka titid gede</h1> */}
      </main>
    </div>
  )
}