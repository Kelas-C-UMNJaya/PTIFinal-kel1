import { ButtonGroup } from '@/components/ButtonGroup';
import { Button } from '@/components/Button';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useUser, Player } from '@/lib/UserContext';
import { PlayerStatus } from '@/lib/useStatus';

export const DebugPage = () => {
  const { user, updateStatus, toggleStatus } = useUser();
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
      <div>
        <p>Belajar {belajar.status.isActive ? "(true)" : "(false)"}: {belajar.status.val}</p>
        <p>Makan {makan.status.isActive ? "(true)" : "(false)"}: {makan.status.val}</p>
        <p>Main {main.status.isActive ? "(true)" : "(false)"}: {main.status.val}</p>
        <p>Tidur {tidur.status.isActive ? "(true)" : "(false)"}: {tidur.status.val}</p>
      </div>

      <ButtonGroup>
        <Button active={belajar.status.isActive} onClick={() => toggleStatus("belajar")}>Belajar</Button>
        <Button active={makan.status.isActive} onClick={() => toggleStatus("makan")}>Makan</Button>
        <Button active={main.status.isActive} onClick={() => toggleStatus("main")}>Main</Button>
        <Button active={tidur.status.isActive} onClick={() => toggleStatus("tidur")}>Tidur</Button>
      </ButtonGroup>
      <Link to="/">
        <Button>Back</Button>
      </Link>
    </div>
  )
}