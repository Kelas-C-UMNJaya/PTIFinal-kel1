import { ComponentProps } from "@/lib/@types";
import { Button } from "@/components/Button";

interface ModalProps extends ComponentProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  disableFloat?: boolean;
}

export const OverlayModal = ({
  title,
  isOpen,
  onClose,
  children,
  className,
  disableFloat,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={`flex flex-col gap-3 rounded-lg p-5 z-50 transition-opacity duration-300 ease-in-out bg-slate-800 text-white h-0 min-h-full
      ${!disableFloat ? "inset-0 absolute" : ""} ${className}`}
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
