import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isAppRoute = ['/chat', '/booking', '/admin/dashboard', '/patient/dashboard', '/portal/dashboard'].some(path => location.pathname.startsWith(path));
    const isAuthRoute = ['/admin/login', '/login', '/register', '/patient/login', '/patient/register'].includes(location.pathname);
    const isGetStarted = location.pathname === '/';

    if (isGetStarted) return <div className="min-h-screen">{children}</div>;
    if (isAuthRoute) return <div className="min-h-screen bg-white">{children}</div>;
    if (isAppRoute) return <AppLayout>{children}</AppLayout>;
    return <PublicLayout>{children}</PublicLayout>;
};

const PublicLayout = ({ children }) => {
    const navigate = useNavigate();
    const [locationText, setLocationText] = useState('Detecting location...');

    useEffect(() => {
        if (typeof navigator !== 'undefined' && navigator.geolocation) {
            // Simulate a realistic delay and lookup
            setTimeout(() => {
                setLocationText('📍 Bengaluru, KA | Finding providers near you');
            }, 1500);
        } else {
            setLocationText('📍 Location unavailable');
        }
    }, []);

    return (
        <div className="page-wrapper">
            <div style={{ background: '#0f172a', color: 'white', fontSize: '0.85rem', padding: '8px 0', textAlign: 'center', position: 'fixed', width: '100%', top: 0, zIndex: 1001 }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
                    <span>{locationText}</span>
                    <button className="btn-ghost" style={{ padding: '2px 8px', color: '#94a3b8', fontSize: '0.75rem', height: 'auto', minHeight: 'auto' }}>Change</button>
                </div>
            </div>
            <nav className="navbar" style={{ top: '36px' }}>
                <div className="container navbar-content">
                    <Link to="/home" className="brand-logo">
                        <i className='bx bxs-capsule'></i>
                        MediAI
                    </Link>
                    <div className="nav-links">
                        <Link to="/home" className="nav-link">Home</Link>
                        <button onClick={() => scrollToSection('services')} className="nav-link btn-ghost" style={{ border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>Services</button>
                        <Link to="/admin/login" className="nav-link">Providers</Link>
                        <button onClick={() => navigate('/patient/login')} className="btn btn-primary btn-sm">Patient Portal</button>
                    </div>
                </div>
            </nav>

            <main>
                {children}
            </main>

            <footer className="section bg-light" style={{ padding: '80px 0 40px', borderTop: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                        <div>
                            <div className="brand-logo mb-4">
                                <i className='bx bxs-capsule'></i> MediAI
                            </div>
                            <p className="text-muted" style={{ maxWidth: '300px' }}>
                                Making healthcare accessible, intelligent, and human-centric for everyone using advanced AI technology.
                            </p>
                            <div style={{ display: 'flex', gap: '16px', fontSize: '24px', color: 'var(--text-muted)' }}>
                                <i className='bx bxl-twitter hover:text-primary cursor-pointer transition'></i>
                                <i className='bx bxl-linkedin hover:text-primary cursor-pointer transition'></i>
                                <i className='bx bxl-facebook hover:text-primary cursor-pointer transition'></i>
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-4" style={{ fontSize: '1rem' }}>Product</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Link to="#" className="text-muted hover:text-primary">Features</Link>
                                <Link to="#" className="text-muted hover:text-primary">Security</Link>
                                <Link to="#" className="text-muted hover:text-primary">Enterprise</Link>
                                <Link to="#" className="text-muted hover:text-primary">Pricing</Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-4" style={{ fontSize: '1rem' }}>Company</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Link to="#" className="text-muted hover:text-primary">About Us</Link>
                                <Link to="#" className="text-muted hover:text-primary">Careers</Link>
                                <Link to="#" className="text-muted hover:text-primary">Blog</Link>
                                <Link to="#" className="text-muted hover:text-primary">Contact</Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-4" style={{ fontSize: '1rem' }}>Support</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Link to="#" className="text-muted hover:text-primary">Help Center</Link>
                                <Link to="#" className="text-muted hover:text-primary">Terms of Service</Link>
                                <Link to="#" className="text-muted hover:text-primary">Privacy Policy</Link>
                                <Link to="#" className="text-muted hover:text-primary">Status</Link>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '64px', paddingTop: '32px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        © 2026 MediAI Health Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

const AppLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { path: '/portal/dashboard', icon: 'bx-grid-alt', label: 'Overview' },
        { path: '/doctors', icon: 'bx-search-alt', label: 'Find Doctor' },
        { path: '/chat', icon: 'bx-message-square-dots', label: 'Messages' },
        { path: '/booking', icon: 'bx-calendar-plus', label: 'My Bookings' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-body)' }}>
            <aside style={{ width: '280px', background: 'white', borderRight: '1px solid var(--border-color)', position: 'fixed', height: '100vh', zIndex: 50 }}>
                <div style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', padding: '0 32px', borderBottom: '1px solid var(--border-color)' }}>
                    <Link to="/" className="brand-logo" style={{ fontSize: '1.5rem' }}>
                        <i className='bx bxs-capsule'></i>
                        MediAI <span style={{ marginLeft: '8px', fontSize: '0.75rem', background: 'var(--primary-light)', padding: '2px 8px', borderRadius: '12px', color: 'var(--primary)', fontWeight: '600' }}>APP</span>
                    </Link>
                </div>

                <nav style={{ padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '14px 20px',
                                borderRadius: 'var(--radius-md)',
                                color: location.pathname === item.path ? 'var(--primary)' : 'var(--text-muted)',
                                background: location.pathname === item.path ? 'var(--primary-light)' : 'transparent',
                                fontWeight: location.pathname === item.path ? '600' : '500',
                                textDecoration: 'none',
                                transition: 'all 0.2s'
                            }}
                            className="hover:bg-gray-50"
                        >
                            <i className={`bx ${item.icon}`} style={{ fontSize: '22px' }}></i>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div style={{ position: 'absolute', bottom: '32px', left: '24px', right: '24px' }}>
                    <button onClick={() => navigate('/')} className="btn-ghost" style={{ width: '100%', padding: '12px', border: '1px solid #fee2e2', background: '#fef2f2', color: '#ef4444', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '600' }}>
                        <i className='bx bx-log-out'></i>
                        Sign Out
                    </button>
                </div>
            </aside>

            <main style={{ marginLeft: '280px', flex: 1, padding: '40px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
