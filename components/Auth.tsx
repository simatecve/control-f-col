
import React, { useState } from 'react';
import { LayoutDashboard, Lock, User, UserPlus, LogIn } from 'lucide-react';

interface AuthProps {
  onLogin: (username: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('finanzapro_users') || '{}');

    if (isRegistering) {
      if (users[username]) {
        setError('El usuario ya existe.');
        return;
      }
      users[username] = password;
      localStorage.setItem('finanzapro_users', JSON.stringify(users));
      onLogin(username);
    } else {
      if (users[username] && users[username] === password) {
        onLogin(username);
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-blue-600 p-3 rounded-2xl mb-4 shadow-lg shadow-blue-200">
            <LayoutDashboard size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">FinanzaPro</h1>
          <p className="text-slate-500 mt-2">Tu control financiero, bajo llave.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => { setIsRegistering(false); setError(''); }}
              className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${!isRegistering ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Ingresar
            </button>
            <button
              onClick={() => { setIsRegistering(true); setError(''); }}
              className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${isRegistering ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Usuario</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  placeholder="Ej. juan_perez"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 p-3 rounded-xl text-xs font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              {isRegistering ? <UserPlus size={18} /> : <LogIn size={18} />}
              {isRegistering ? 'Crear Cuenta' : 'Acceder al Panel'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-xs mt-8">
          Sus datos se almacenan localmente en este navegador por seguridad.
        </p>
      </div>
    </div>
  );
};

export default Auth;
