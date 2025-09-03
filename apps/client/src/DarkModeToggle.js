import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from './themeStore';
export default function DarkModeToggle() {
    const { dark, toggle } = useTheme();
    return (_jsx("button", { className: "ml-4 px-2 py-1 rounded border bg-gray-100 dark:bg-gray-800 dark:text-gray-100", onClick: toggle, "aria-label": "Toggle dark mode", children: dark ? '🌙 Dark' : '☀️ Light' }));
}
