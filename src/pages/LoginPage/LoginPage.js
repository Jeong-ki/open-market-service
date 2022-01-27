import React, { useState } from 'react';
import Logo from '../../images/Logo-hodu.png';

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <>
      
    </>
  );
}

export default LoginPage;
