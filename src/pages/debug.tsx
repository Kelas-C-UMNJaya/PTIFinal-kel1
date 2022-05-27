import { ButtonGroup } from '@/components/ButtonGroup';
import { Button } from '@/components/Button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext, PlayerContext } from '@/lib/context';
import { PlayerStatus } from '@/lib/customHook';

export const DebugPage = () => {
  const userData = useContext(UserContext) as PlayerContext;
  const { belajar, makan, tidur, main } = userData.status;
  return (
    <div className="container mx-auto h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-3xl font-bold">Welkam to debug session with itshiroto</h1>
      <h3 className="text-xl">Hello, {userData.name}</h3>
      <div>
        <p>Belajar: {belajar.status.val}</p>
        <p>Makan: {makan.status.val}</p>
        <p>Main: {main.status.val}</p>
        <p>Tidur: {tidur.status.val}</p>
      </div>

      <ButtonGroup>
        <Button active={makan.status.isActive} onClick={makan.toggle}>Makan</Button>
        <Button active={tidur.status.isActive} onClick={tidur.toggle}>Tidur</Button>
        <Button active={main.status.isActive} onClick={main.toggle}>Main</Button>
        <Button active={belajar.status.isActive} onClick={belajar.toggle}>Belajar</Button>
      </ButtonGroup>
      <Link to="/">
        <Button>Back</Button>
      </Link>
    </div>
  )
}