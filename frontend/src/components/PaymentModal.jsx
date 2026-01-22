import { useState } from 'react';

const PaymentModal = ({ onClose, onSuccess, amount }) => {
    const [loading, setLoading] = useState(false);
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: '' });

    const handleChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate Stripe processing
        setTimeout(() => {
            setLoading(false);
            onSuccess();
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
        }}>
            <div className="card bg-white" style={{ width: '400px', padding: '32px', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                    <i className='bx bx-x'></i>
                </button>

                <h3 className="mb-4 text-center">Secure Payment</h3>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>${amount}</div>
                    <div className="text-muted">Total Amount</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label>Card Number</label>
                        <div style={{ position: 'relative' }}>
                            <i className='bx bx-credit-card' style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }}></i>
                            <input
                                type="text"
                                name="number"
                                placeholder="0000 0000 0000 0000"
                                className="form-input"
                                style={{ paddingLeft: '40px' }}
                                value={cardDetails.number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid-2 gap-4 mb-4">
                        <div>
                            <label>Expiry</label>
                            <input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                className="form-input"
                                value={cardDetails.expiry}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>CVC</label>
                            <input
                                type="text"
                                name="cvc"
                                placeholder="123"
                                className="form-input"
                                value={cardDetails.cvc}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label>Cardholder Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="form-input"
                            value={cardDetails.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', justifyContent: 'center' }}
                        disabled={loading}
                    >
                        {loading ? <i className='bx bx-loader-alt bx-spin'></i> : `Pay $${amount}`}
                    </button>

                    <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                        <i className='bx bxs-lock-alt'></i> Encrypted by Stripe (Mock)
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;
