import { useState, useEffect } from 'react';
import apiService from '../services/api';

const PatientDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const result = await apiService.getPatientDashboard();
                setData(result);
            } catch (error) {
                console.error("Failed to load dashboard", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return <div className="text-center p-8">Loading dashboard...</div>;
    if (!data) return <div className="text-center p-8">Failed to load data.</div>;

    const { profile, timeline, insights } = data;

    return (
        <div className="container" style={{ padding: '24px 0' }}>
            <h2 className="mb-8">Patient Portal</h2>

            <div className="grid-3" style={{ gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
                {/* Left Column: Profile */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Profile Card */}
                    <div className="card">
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <img src={profile.avatar_url} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary-light)' }} />
                            <h3 style={{ margin: '16px 0 8px' }}>{profile.name}</h3>
                            <p className="text-muted" style={{ margin: 0 }}>ID: #8493-2026</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                            <div className="text-center">
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Age</div>
                                <div style={{ fontWeight: '600' }}>{profile.age}</div>
                            </div>
                            <div className="text-center">
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Blood</div>
                                <div style={{ fontWeight: '600' }}>{profile.blood_type}</div>
                            </div>
                            <div className="text-center">
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Height</div>
                                <div style={{ fontWeight: '600' }}>{profile.height}</div>
                            </div>
                            <div className="text-center">
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Weight</div>
                                <div style={{ fontWeight: '600' }}>{profile.weight}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '24px', background: '#fef2f2', padding: '16px', borderRadius: '12px', fontSize: '0.9rem' }}>
                            <div style={{ color: '#ef4444', fontWeight: '600', marginBottom: '4px' }}><i className='bx bxs-ambulance'></i> Emergency Contact</div>
                            <div style={{ color: '#1f2937' }}>{profile.emergency_contact}</div>
                        </div>
                    </div>

                    {/* AI Insights Card */}
                    <div className="card bg-light">
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className='bx bxs-brain text-primary'></i> AI Health Insights
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                            {insights.map((insight, index) => (
                                <div key={index} style={{ background: 'white', padding: '16px', borderRadius: '12px', borderLeft: `4px solid ${insight.color}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <div style={{ fontWeight: '600' }}>{insight.title}</div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: insight.color }}>{insight.value}</div>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{insight.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Timeline */}
                <div>
                    <h3 className="mb-4">Health Timeline</h3>
                    <div className="card">
                        <div style={{ position: 'relative', paddingLeft: '24px' }}>
                            <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', background: 'var(--border-color)' }}></div>
                            {timeline.map((event) => (
                                <div key={event.id} style={{ position: 'relative', marginBottom: '32px', paddingLeft: '24px' }}>
                                    <div style={{ position: 'absolute', left: '-13px', top: '0', width: '24px', height: '24px', borderRadius: '50%', background: 'white', border: `2px solid ${event.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                        <i className={`bx ${event.icon}`} style={{ fontSize: '14px', color: event.color }}></i>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                        <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{event.title}</h4>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{event.date}</span>
                                    </div>
                                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>{event.description}</p>
                                </div>
                            ))}
                            <div style={{ position: 'relative', paddingLeft: '24px' }}>
                                <div style={{ position: 'absolute', left: '-13px', top: '0', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }}></div>
                                </div>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontStyle: 'italic' }}>Timeline start</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
