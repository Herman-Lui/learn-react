import { useTheme } from './themeStore';

export default function DarkModeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      className="ml-4 px-2 py-1 rounded border bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
      onClick={toggle}
      aria-label="Toggle dark mode"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}