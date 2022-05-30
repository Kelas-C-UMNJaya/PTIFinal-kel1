import { ComponentProps } from "@/lib/@types";
import { Button } from "@/components/Button";

interface ModalProps extends ComponentProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const OverlayModal = ({
  title,
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={`absolute flex flex-col gap-3 inset-0 lg:inset-x-auto lg:inset-y-0 lg:right-0 m-5 rounded-lg min-w-[320px] p-5 z-50 transition-opacity duration-300 ease-in-out bg-slate-800 text-white ${className}`}
    >
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Button className="min-w-0" onClick={onClose}>
          Close
        </Button>
      </div>
      {children}
    </div>
  );
};
