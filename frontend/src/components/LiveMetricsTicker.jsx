import { useState, useEffect } from 'react';
import apiService from '../services/api';

const LiveMetricsTicker = () => {
    const [metrics, setMetrics] = useState({
        predictions_today: 0,
        response_time_ms: 0,
        active_hospitals: 0,
        records_secured: 0
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await apiService.getSystemMetrics();
                setMetrics(data);
            } catch (error) {
                console.error("Failed to fetch live metrics");
            }
        };

        fetchMetrics();
        const interval = setInterval(fetchMetrics, 5000); // Update every 5s
        return () => clearInterval(interval);
    }, []);

    const MetricItem = ({ label, value, unit, icon, color }) => (
        <div className="text-center" style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: color, marginBottom: '4px', lineHeight: 1 }}>
                {value.toLocaleString()}
                {unit && <span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '4px' }}>{unit}</span>}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <i className={`bx ${icon}`}></i> {label}
            </div>
        </div>
    );

    return (
        <div className="container">
            <div className="glass" style={{ padding: '32px', borderRadius: '24px', display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ flex: '1 1 100%', textAlign: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                    <h5 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>Live System Status</h5>
                </div>
                <MetricItem
                    label="AI Predictions Today"
                    value={metrics.predictions_today}
                    icon="bx-brain"
                    color="var(--primary)"
                />
                <div style={{ width: '1px', height: '60px', background: 'var(--border-color)' }} className="hidden-mobile"></div>
                <MetricItem
                    label="Avg Response Time"
                    value={metrics.response_time_ms}
                    unit="ms"
                    icon="bx-timer"
                    color="#f59e0b"
                />
                <div style={{ width: '1px', height: '60px', background: 'var(--border-color)' }} className="hidden-mobile"></div>
                <MetricItem
                    label="Hospitals Connected"
                    value={metrics.active_hospitals}
                    icon="bx-buildings"
                    color="#10b981"
                />
                <div style={{ width: '1px', height: '60px', background: 'var(--border-color)' }} className="hidden-mobile"></div>
                <MetricItem
                    label="Records Secured"
                    value={metrics.records_secured}
                    icon="bx-lock-alt"
                    color="#6366f1"
                />
            </div>
        </div>
    );
};

export default LiveMetricsTicker;
