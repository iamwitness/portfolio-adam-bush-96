// Win95 theme tokens (matches win95.css :root vars)
export const WIN95 = {
  bg: "#008080",
  chrome: "#C0C0C0",
  borderLight: "#DFDFDF",
  borderDark: "#808080",
  borderDarkest: "#404040",
  titlebar: "#000080",
  titlebarEnd: "#1084D0",
  titlebarInactive: "#808080",
  text: "#000000",
  textDisabled: "#808080",
  highlight: "#000080",
  highlightText: "#FFFFFF",
  windowBg: "#FFFFFF",
} as const;

export const TASKBAR_HEIGHT = 28;
export const ICON_GRID_CELL = 80;
export const CASCADE_OFFSET = 28;
export const BASE_WINDOW_POSITION = { x: 60, y: 40 };
export const DEFAULT_WINDOW_SIZE = { width: 720, height: 520 };
export const DEFAULT_MIN_SIZE = { width: 320, height: 240 };

export const BREAKPOINTS = {
  mobile: 768,
} as const;
