import { PlayerProvider } from "../features/player/components/provider";

export default function Providers({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <PlayerProvider><>{children}</></PlayerProvider>;
}
