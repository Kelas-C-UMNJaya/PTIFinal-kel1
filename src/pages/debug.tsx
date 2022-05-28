import { Button, ButtonGroup, ProgressBar, ProgressGroup } from '@/components';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useUser, Player } from '@/lib/UserContext';
import { PlayerStatus } from '@/lib/useStatus';

export const DebugPage = () => {
  const { user, updateStatus, toggleStatus, changeData } = useUser();
  const { belajar, makan, tidur, main } = user.status;
  useEffect(() => {
    const interval = setInterval(() => {
      updateStatus();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container mx-auto h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-3xl font-bold">Welkam to debug session with itshiroto</h1>
      <h3 className="text-xl">Hello, {user.name}</h3>
      <ProgressGroup className="w-[32em]">
        <ProgressBar value={belajar.status.val} icon="dashicons:book" />
        <ProgressBar value={makan.status.val} icon="fa-solid:bed" />
        <ProgressBar value={tidur.status.val} icon="ion:fast-food" />
        <ProgressBar value={main.status.val} icon="fa:gamepad" />
      </ProgressGroup>
      
      

      <ButtonGroup>
        <Button active={belajar.status.isActive} onClick={() => toggleStatus("belajar")}>Belajar</Button>
        <Button active={makan.status.isActive} onClick={() => toggleStatus("makan")}>Makan</Button>
        <Button active={main.status.isActive} onClick={() => toggleStatus("main")}>Main</Button>
        <Button active={tidur.status.isActive} onClick={() => toggleStatus("tidur")}>Tidur</Button>
        <Button onClick={() => changeData("Jefer", "Informatika")}>Change Data</Button>
      </ButtonGroup>
      <Link to="/">
        <Button>Back</Button>
      </Link>
    </div>
  )
}