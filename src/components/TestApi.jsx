import React, { useEffect, useState } from 'react';

function TestApi() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/test')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMessage(data.message);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Test de Conexión API</h2>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TestApi;