import { OverlayModal } from "../OverlayModal"
import { Icon } from "@iconify/react";

export const PauseMenu = () => {
  return(
      <OverlayModal disableFloat={true} title="Pause Menu" onClose={() => console.log("aul suka titid")}>
        <div className="flex md:flex-row flex-col items-center justify-evenly py-3 gap-3 w-full">
          <div className="flex flex-col items-center justify-cente hover:bg-slate-600 transition cursor-pointer p-2 w-1/3">
            <a className="" href="#">
              <Icon icon="el:play" className="text-4xl" />
            </a>
            <p className="text-xl">
              Resume
            </p>
          </div>
          <div className="flex flex-col items-center justify-center hover:bg-slate-600 transition cursor-pointer p-2 w-1/3">
            <a className="" href="#">
              <Icon icon="entypo:save" className="text-4xl" />
            </a>
            <p className="text-xl">
              Save
            </p>
          </div>
          <div className="flex flex-col items-center justify-center hover:bg-slate-600 transition cursor-pointer p-2 w-1/3">
            <a className="" href="#">
              <Icon icon="codicon:debug-restart" className="text-4xl" />
            </a>
            <p className="text-xl align-middle">
              Restart
            </p>
          </div>
        </div>
      </OverlayModal>
  )
}