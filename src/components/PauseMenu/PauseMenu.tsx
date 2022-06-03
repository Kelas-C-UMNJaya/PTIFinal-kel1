import { OverlayModal } from "../OverlayModal"
import { Icon } from "@iconify/react";
import { ModalType } from "@/lib/@types"
import { useStorage } from "@/lib/useStorage"
import { useNavigate } from "react-router-dom";

export const PauseMenu = ({setOpen}: {setOpen: () => void;}) => {
  const storage = useStorage();
  const navigate = useNavigate();
  
  const handleSave = () => {
    storage.saveUser();
  }
  const handleRestart = () => {
    storage.saveUser()
    navigate("/avatar");
  }
  const handleExit = () => {
    navigate("/");
  }

  return(
      <OverlayModal disableFloat={true} manualHeight className="m-5" title="Pause Menu" onClose={() => setOpen()}>
        <div className="flex md:flex-row flex-col items-center justify-evenly py-3 gap-3 w-full">
          <div className="flex flex-col items-center justify-center hover:bg-slate-600 transition cursor-pointer p-2 w-1/3" onClick={handleSave}>
            <a className="" href="#">
              <Icon icon="entypo:save" className="text-4xl" />
            </a>
            <p className="text-xl">
              Save
            </p>
          </div>
          <div className="flex flex-col items-center justify-center hover:bg-slate-600 transition cursor-pointer p-2 w-1/3" onClick={handleRestart}>
            <a className="" href="#">
              <Icon icon="codicon:debug-restart" className="text-4xl" />
            </a>
            <p className="text-xl align-middle">
              Restart
            </p>
          </div>
          <div className="flex flex-col items-center justify-center hover:bg-slate-600 transition cursor-pointer p-2 w-1/3" onClick={handleExit}>
            <a className="" href="#">
              <Icon icon="ion:exit" className="text-4xl" />
            </a>
            <p className="text-xl align-middle">
              Exit
            </p>
          </div>
        </div>
      </OverlayModal>
  )
}