
import React from 'react';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  return (
    <div className="flex-1 flex flex-col p-8 pt-4">
      <div className="mb-12 flex items-center justify-center">
        <div className="flex items-center">
          <svg className="mr-3" height="48" viewBox="0 0 100 100" width="48">
            <circle cx="50" cy="50" fill="currentColor" className="text-slate-900 dark:text-white" r="50"></circle>
            <circle cx="50" cy="28" fill="#FF5C00" r="11"></circle>
            <circle cx="28" cy="44" fill="white" r="11"></circle>
            <circle cx="72" cy="44" fill="white" r="11"></circle>
            <circle cx="36" cy="70" fill="white" r="11"></circle>
            <circle cx="64" cy="70" fill="white" r="11"></circle>
          </svg>
          <span className="text-primary text-5xl font-black italic tracking-tighter">LAPP</span>
        </div>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2 dark:text-white">Welcome back.</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Sign in to start capturing orders.</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <div className="space-y-1.5">
          <label className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Email or Username</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <span className="material-symbols-rounded">alternate_email</span>
            </div>
            <input 
              required
              defaultValue="peter.smith@lapp.com"
              className="w-full h-16 pl-12 pr-4 bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none text-base dark:text-white" 
              placeholder="peter.smith@company.com" 
              type="text"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
              <span className="material-symbols-rounded">lock</span>
            </div>
            <input 
              required
              defaultValue="password123"
              className="w-full h-16 pl-12 pr-12 bg-white dark:bg-slate-800 border-0 ring-1 ring-slate-200 dark:ring-slate-700 rounded-2xl focus:ring-2 focus:ring-primary transition-all outline-none text-base dark:text-white" 
              placeholder="••••••••" 
              type="password"
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400">
              <span className="material-symbols-rounded">visibility</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button type="button" className="text-primary text-sm font-semibold">Forgot password?</button>
        </div>

        <button className="w-full h-16 bg-primary text-white font-bold text-lg rounded-2xl shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 mt-8">
          <span>Log In</span>
          <span className="material-symbols-rounded">arrow_forward</span>
        </button>
      </form>

      <div className="mt-auto pt-8">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-medium">Quick Access</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 h-14 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="material-symbols-rounded text-slate-400">faceid</span>
            <span className="font-semibold text-sm dark:text-slate-300">FaceID</span>
          </button>
          <button className="flex items-center justify-center space-x-2 h-14 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="material-symbols-rounded text-slate-400">fingerprint</span>
            <span className="font-semibold text-sm dark:text-slate-300">TouchID</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
