import React, { useEffect, useState } from "react";

function MatchesList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/matches")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading matches...</p>;

  return (
    <div>
      <h2>World Cup Matches</h2>
      {matches.length === 0 && <p>No matches found.</p>}

      <ul>
        {matches.map((m) => (
          <li key={m._id}>
            <strong>{m.home}</strong> vs <strong>{m.away}</strong> — {m.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchesList;