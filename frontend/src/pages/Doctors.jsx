import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const Doctors = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const result = await apiService.getDoctors();
                if (result && Array.isArray(result)) {
                    setDoctors(result);
                } else {
                    console.warn("Backend returned unexpected data format for doctors");
                    setDoctors([]);
                }
            } catch (error) {
                console.error("Failed to load doctors", error);
                setError("Could not connect to the medical database.");
                // Demo fallback if backend fails
                setDoctors([
                    {
                        id: 'demo1',
                        name: "Dr. Demo Specialist (Local)",
                        specialty: "General Physician",
                        hospital: "Demo Health Center",
                        experience: "10 years",
                        rating: 4.5,
                        match_score: 95,
                        match_reason: "Viewing demo mode because backend is unavailable.",
                        availability: "Online Now",
                        image: "https://randomuser.me/api/portraits/men/1.jpg"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = filter === 'All' ? doctors : doctors.filter(d => d.specialty === filter);
    const specialties = ['All', ...new Set(doctors.map(d => d.specialty))];

    return (
        <div className="container" style={{ padding: '24px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ marginBottom: '8px' }}>Find a Specialist</h2>
                    <p className="text-muted" style={{ margin: 0 }}>AI-matched providers based on your health profile.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {specialties.map(spec => (
                        <button
                            key={spec}
                            className={`btn ${filter === spec ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setFilter(spec)}
                            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                        >
                            {spec}
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: '12px 20px', borderRadius: '12px', color: '#9a3412', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className='bx bxs-error-circle'></i> {error}
                </div>
            )}

            {loading ? (
                <div className="text-center p-8">Finding best matches...</div>
            ) : (
                <div className="grid-2" style={{ gap: '24px' }}>
                    {filteredDoctors.map(doctor => (
                        <div key={doctor.id} className="card hover:scale-105 transition" style={{ display: 'flex', gap: '24px', padding: '24px' }}>
                            <img src={doctor.image} alt={doctor.name} style={{ width: '120px', height: '120px', borderRadius: '16px', objectFit: 'cover' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{doctor.name}</h3>
                                        <div style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>{doctor.specialty}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{doctor.hospital} • {doctor.experience} exp</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fefce8', padding: '4px 8px', borderRadius: '8px', color: '#ca8a04', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                        <i className='bx bxs-star'></i> {doctor.rating}
                                    </div>
                                </div>

                                <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px', fontWeight: '600' }}>
                                        <span>AI Match Score</span>
                                        <span style={{ color: doctor.match_score > 90 ? '#16a34a' : '#2563eb' }}>{doctor.match_score}% Match</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${doctor.match_score}%`, height: '100%', background: doctor.match_score > 90 ? '#16a34a' : 'var(--primary)', borderRadius: '4px' }}></div>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px', fontStyle: 'italic' }}>
                                        <i className='bx bxs-info-circle'></i> {doctor.match_reason}
                                    </p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontSize: '0.85rem' }}>
                                        <i className='bx bx-time-five text-primary'></i> {doctor.availability}
                                    </div>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => navigate('/booking')}
                                        style={{ padding: '8px 20px' }}
                                    >
                                        Book Visit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Doctors;
