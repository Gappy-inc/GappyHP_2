export type OrbitTool = { id: string; name: string; shortName?: string; logo: string; ring?: 0 | 1; displayStatus?: 'illustrative' | 'verified' };
export type OrbitColors = Partial<Record<'track' | 'wire' | 'beam' | 'text' | 'hub' | 'hubEdge' | 'hubText' | 'halo', string>>;
export type OrbitState = { running: boolean; paused: boolean; reduced: boolean; reason: string };
export type OrbitOptions = { pauseOnHover?: boolean; locale?: 'en' | 'ja'; tools: readonly OrbitTool[]; theme?: 'dark' | 'light'; paused?: boolean; periods?: [number, number]; mobileCount?: number; colors?: OrbitColors; onStateChange?: (state: OrbitState) => void };
export type OrbitController = { setPaused(value: boolean): void; setTheme(theme: 'dark' | 'light'): void; setReducedMotionPreview(value: boolean): void; destroy(): void };
export function createGappyOrbit(container: HTMLElement, options: OrbitOptions): OrbitController;
export function bezier(start: {x: number; y: number}, control: {x: number; y: number}, end: {x: number; y: number}, progress: number): {x: number; y: number};
