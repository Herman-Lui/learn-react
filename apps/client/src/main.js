import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import Home from './pages/Home';
import Todos from './pages/Todos';
import Performance from './pages/Performance';
import Forms from './pages/Forms';
import InterviewGuide from './pages/InterviewGuide';
import { useTheme } from './themeStore';
import DarkModeToggle from './DarkModeToggle';
const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: '/',
        element: (_jsxs("div", { className: "p-4 max-w-4xl mx-auto", children: [_jsxs("nav", { className: "flex gap-4 mb-4 items-center", children: [_jsx(Link, { to: "/", children: "Home" }), _jsx(Link, { to: "/todos", children: "Todos" }), _jsx(Link, { to: "/performance", children: "Performance" }), _jsx(Link, { to: "/forms", children: "Forms" }), _jsx(Link, { to: "/guide", children: "Interview Guide" }), _jsx(DarkModeToggle, {})] }), _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(Outlet, {}) })] })),
        children: [
            { index: true, element: _jsx(Home, {}) },
            { path: '/todos', element: _jsx(Todos, {}) },
            { path: '/performance', element: _jsx(Performance, {}) },
            { path: '/forms', element: _jsx(Forms, {}) },
            { path: '/guide', element: _jsx(InterviewGuide, {}) }
        ]
    }
]);
function App() {
    const { dark } = useTheme();
    return (_jsx("div", { className: dark ? 'dark min-h-screen bg-gray-900 text-gray-100' : 'min-h-screen bg-slate-50 text-slate-900', children: _jsx(StrictMode, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(RouterProvider, { router: router, fallbackElement: _jsx("div", { children: "Loading..." }) }) }) }) }));
}
createRoot(document.getElementById('root')).render(_jsx(App, {}));
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(RouterProvider, { router: router }) }) }));
