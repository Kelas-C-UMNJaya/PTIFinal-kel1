import { ButtonGroup } from '@/components/ButtonGroup';
import { Button } from '@/components/Button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStatus } from '@/lib/customHook';

export const DebugPage = () => {
  const [belajar, toggleBelajar, setBelajarRate] = useStatus({ name: 'belajar', val: 100, rate: { growth: 1, shrink: 1 }, isActive: true });

  return (
    <div className="container mx-auto h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-3xl font-bold">Welkam to debug session with itshiroto</h1>
      <div>
        <p>belajar: {belajar.val}</p>
      </div>
      <ButtonGroup>
        <Button>Makan</Button>
        <Button>Tidur</Button>
        <Button>Main</Button>
        <Button onClick={toggleBelajar}>Belajar</Button>
      </ButtonGroup>
      <Link to="/">
        <Button>Back</Button>
      </Link>
    </div>
  )
}