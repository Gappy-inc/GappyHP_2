import Image from 'next/image';
import logo from '@/public/gappy-logo-official.png';
import { salesUrl } from './content';
export function Icon({ name, size = 24 }: {
    name: string;
    size?: number;
}) {
    const paths: Record<string, React.ReactNode> = {
        search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
        shield: <><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6Z"/><path d="m8 12 3 3 5-6"/></>,
        arrow: <><path d="M4 12h16m-6-6 6 6-6 6"/></>,
        check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
        mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
        refresh: <><path d="M20 8a9 9 0 0 0-15-3L3 8m0-5v5h5M4 16a9 9 0 0 0 15 3l2-3m0 5v-5h-5"/></>,
    };
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.check}</svg>;
}
export function Logo() { return <a href="/ja/" className="lp-logo" aria-label="Gappy 日本語ホーム"><Image src={logo} alt="Gappy" width={120} height={55} priority/></a>; }
export function CTA({ secondary = false, location = 'hero' }: {
    secondary?: boolean;
    location?: string;
}) {
    return <a className={`lp-button ${secondary ? 'lp-button-secondary' : ''}`} href={secondary ? '#proof' : salesUrl} data-lp-cta={secondary ? 'demo' : 'sales'} data-lp-location={location}>{secondary ? '仕組みを見てみる' : 'Gappyに相談する'}<Icon name="arrow" size={18}/></a>;
}
export function Actions({ location = 'hero' }: {
    location?: string;
}) { return <div className="lp-actions"><CTA location={location}/><CTA secondary location={location}/></div>; }
export function Label({ children }: {
    children: React.ReactNode;
}) { return <p className="lp-label">{children}</p>; }
