"use client";

import { useRouter } from 'next/navigation';
import React, { useState, FormEvent } from 'react';
import CryptoJS from 'crypto-js';
import { useMyContext } from '@/context/mycontext';

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { login } = useMyContext();

  const hashUserName = CryptoJS.SHA256(username).toString();
  const hashPassword = CryptoJS.SHA256(password).toString();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Login we Password - y giriziň!');
      return;
    }
    if (
      hashUserName === "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918" &&
      hashPassword === "c8f0975b9e97bba547ed5fad339c31681d7d6ecece6e207d6cad69b0b8a6b046"
    ) {
      login();
      router.push('/adminPage');
    } else {
      setError('Ýalňyşlyk');
      return;
    }
    setError(''); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4">Giriş</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Login</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Giriş
        </button>
      </form>
    </div>
  );
};

export default Login;