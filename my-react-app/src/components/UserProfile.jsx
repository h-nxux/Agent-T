import { useState, useEffect } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    setUser(data.results[0]);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>

      {user && (
        <>
          <img
            src={user.picture.large}
            alt="user"
          />
          <p>
            {user.name.first} {user.name.last}
          </p>
          <p>
            {user.email}
          </p>
        </>
      )}

      <button
        onClick={getUser}
        disabled={loading}
      >
        {loading ? '로딩...' : '새로고침'}
      </button>
    </div>
  );
}
