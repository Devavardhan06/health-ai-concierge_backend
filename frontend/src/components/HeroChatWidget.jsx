import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const HeroChatWidget = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        try {
            const data = await apiService.sendTriageMessage(input);
            setResponse(data);
        } catch (error) {
            setResponse({
                risk_level: 'Unknown',
                message: "I'm having trouble connecting to the triage system. Please try again.",
                action: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setResponse(null);
        setInput('');
    };

    return (
        <div className="card glass hero-widget" style={{ padding: '24px', maxWidth: '420px', width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow-xl)', backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.85)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}>
                    <i className='bx bx-pulse' style={{ fontSize: '24px' }}></i>
                </div>
                <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0' }}>AI Triage</h3>
                    <p style={{ fontSize: '0.85rem', margin: 0, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', animation: 'pulse 2s infinite' }}></span> Live System
                    </p>
                </div>
            </div>

            {!response ? (
                <form onSubmit={handleSubmit}>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                        Describe your symptoms to get an instant risk assessment.
                    </p>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. I have a severe headache and sensitivity to light..."
                        rows="3"
                        style={{ width: '100%', marginBottom: '16px', fontSize: '1rem', resize: 'none' }}
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                        disabled={loading}
                    >
                        {loading ? 'Analyzing...' : 'Start Triage'} <i className='bx bx-right-arrow-alt'></i>
                    </button>
                    {!loading && (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                            <span className="badge" style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0284c7', padding: '4px 8px', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setInput("Fever and cough since yesterday")}>Fever & cough</span>
                            <span className="badge" style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0284c7', padding: '4px 8px', borderRadius: '12px', cursor: 'pointer' }} onClick={() => setInput("Chest pain and dizziness")}>Chest pain</span>
                        </div>
                    )}
                </form>
            ) : (
                <div className="animate-fade-in">
                    <div style={{ padding: '16px', background: response.risk_level === 'High' ? '#fef2f2' : response.risk_level === 'Medium' ? '#fffbeb' : '#f0fdf4', borderRadius: '16px', border: `1px solid ${response.risk_level === 'High' ? '#fee2e2' : response.risk_level === 'Medium' ? '#fef3c7' : '#dcfce7'}`, marginBottom: '16px' }}>
                        <div style={{ fontWeight: '700', color: response.risk_level === 'High' ? '#ef4444' : response.risk_level === 'Medium' ? '#d97706' : '#16a34a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className={`bx ${response.risk_level === 'High' ? 'bx-error-circle' : 'bx-check-circle'}`}></i>
                            Risk Level: {response.risk_level}
                        </div>
                        <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-main)' }}>{response.message}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={reset} className="btn btn-secondary" style={{ flex: 1 }}>Check Again</button>
                        {response.action !== 'emergency' && (
                            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate('/booking')}>Book Now</button>
                        )}
                    </div>
                    {response.action === 'emergency' && (
                        <button className="btn" style={{ width: '100%', marginTop: '12px', background: '#ef4444', color: 'white', border: 'none' }}>Call 911 Immediately</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default HeroChatWidget;
