import './style.css';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="app-layout">{children}</div>;
}