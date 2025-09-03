import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import Labs from './pages/Labs';
import { useTheme } from './themeStore';
import DarkModeToggle from './DarkModeToggle';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div className="p-4 max-w-4xl mx-auto">
                <nav className="flex gap-4 mb-4 items-center">
                    <Link to="/labs">People List</Link>
                    <DarkModeToggle />
                </nav>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </div>
        ),
        children: [
            { index: true, element: <Labs /> },
            { path: '/labs', element: <Labs /> }
        ]
    }
]);

function App() {
    const { dark } = useTheme();
    return (
        <div className={dark ? 'dark min-h-screen bg-gray-900 text-gray-100' : 'min-h-screen bg-slate-50 text-slate-900'}>
            <StrictMode>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider
                        router={router}
                        fallbackElement={<div>Loading...</div>}
                    />
                </QueryClientProvider>
            </StrictMode>
        </div>
    );
}

createRoot(document.getElementById('root')!).render(<App />);
