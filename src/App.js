import React, { useState } from 'react';


function App() {
  const [career, setCareer] = useState('');
  const [plan, setPlan] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/plan?career=${encodeURIComponent(career)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      setPlan(data);
      setError(null);
    } catch (err) {
      setError('Error fetching roadmap. Please try again.');
      setPlan('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Career Plan Finder</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          placeholder="Enter career (e.g., DevOps)"
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button onClick={handleSearch} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {plan && (
        <div style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
          <h2>Career Plan</h2>
          <p>{plan}</p>
        </div>
      )}
    </div>
  );
}





export default App;
