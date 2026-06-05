import { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Delete } from 'lucide-react';

const CORRECT_PIN = '5555';
const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;
const SESSION_KEY = 'hc_admin_unlocked';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

interface PinLockProps {
  onUnlock: () => void;
}

export default function PinLock({ onUnlock }: PinLockProps) {
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [lockedOut, setLockedOut] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [hint, setHint] = useState('');

  // Check existing session
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      const { timestamp } = JSON.parse(stored);
      if (Date.now() - timestamp < SESSION_DURATION_MS) {
        onUnlock();
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
  }, [onUnlock]);

  // Lockout timer
  useEffect(() => {
    if (!lockedOut) return;
    const interval = setInterval(() => {
      setLockoutRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setLockedOut(false);
          setAttempts(0);
          setPin('');
          setHint('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedOut]);

  const handleDigit = useCallback((digit: string) => {
    if (lockedOut || status === 'success') return;
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setHint('');

    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === CORRECT_PIN) {
          setStatus('success');
          sessionStorage.setItem(SESSION_KEY, JSON.stringify({ timestamp: Date.now() }));
          setTimeout(() => onUnlock(), 700);
        } else {
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);
          setStatus('error');
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setStatus('idle');
            setPin('');
          }, 600);

          const remaining = MAX_ATTEMPTS - newAttempts;
          if (newAttempts >= MAX_ATTEMPTS) {
            setLockedOut(true);
            setLockoutRemaining(LOCKOUT_SECONDS);
            setHint('');
          } else {
            setHint(`Incorrect PIN. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`);
          }
        }
      }, 80);
    }
  }, [pin, lockedOut, status, attempts, onUnlock]);

  const handleDelete = () => {
    if (lockedOut || status === 'success') return;
    setPin(p => p.slice(0, -1));
    setHint('');
  };

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleDigit(e.key);
      if (e.key === 'Backspace') handleDelete();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleDigit]);

  const digits = ['1','2','3','4','5','6','7','8','9','','0','del'];

  const dotColor = (i: number) => {
    if (status === 'success') return 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]';
    if (status === 'error') return 'bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]';
    return i < pin.length
      ? 'bg-[#73E6D8] shadow-[0_0_10px_rgba(115,230,216,0.6)]'
      : 'bg-white/10 border border-white/15';
  };

  return (
    <div className="min-h-screen bg-[#091F27] flex flex-col items-center justify-center relative overflow-hidden select-none font-sans antialiased">
      
      {/* Ambient grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: 'url(/bg-grain.webp)', backgroundRepeat: 'repeat', backgroundSize: 'auto' }} />

      {/* Radial glow behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#73E6D8]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-[#0D2B35]/80 blur-[80px] pointer-events-none" />

      {/* Scanning line overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,30,32,0)_98%,rgba(0,245,255,0.012)_98%)] bg-[size:100%_24px]" />

      {/* Main Card */}
      <div
        className={`relative z-20 w-full max-w-[360px] mx-4 transition-all duration-300 ${shake ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
        style={{ animation: shake ? 'shake 0.4s ease-in-out' : undefined }}
      >
        {/* Top branding */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <img src="/logo.webp" alt="Hooked & Cooked" className="w-10 h-10 object-contain" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0D2B35] border border-[#73E6D8]/30 flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-[#73E6D8]" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-white font-black text-lg tracking-tight leading-tight">Control Hub</h1>
            <p className="text-[#73E6D8]/60 text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">
              Admin Access Portal
            </p>
          </div>
        </div>

        {/* PIN Card */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-3xl backdrop-blur-xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] p-8 flex flex-col items-center gap-6">

          {/* Title */}
          <div className="text-center">
            <p className="text-white/50 text-xs font-semibold tracking-widest uppercase">
              {lockedOut ? '⛔ Access Temporarily Locked' : 'Enter Admin PIN'}
            </p>
          </div>

          {/* PIN Dots */}
          <div className={`flex gap-4 items-center justify-center transition-all duration-200`}>
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${dotColor(i)}`}
              />
            ))}
          </div>

          {/* Lockout Message */}
          {lockedOut && (
            <div className="w-full bg-rose-500/10 border border-rose-500/20 rounded-2xl px-4 py-3 text-center">
              <p className="text-rose-400 text-xs font-bold">Too many failed attempts</p>
              <p className="text-rose-300/70 text-[10px] mt-0.5 font-medium">
                Try again in <span className="font-black text-rose-300">{lockoutRemaining}s</span>
              </p>
            </div>
          )}

          {/* Hint */}
          {hint && !lockedOut && (
            <div className="w-full bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 text-center">
              <p className="text-amber-400 text-[10.5px] font-semibold">{hint}</p>
            </div>
          )}

          {/* Success flash */}
          {status === 'success' && (
            <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5 text-center">
              <p className="text-emerald-400 text-[10.5px] font-bold tracking-wide">✓ Access Granted — Loading…</p>
            </div>
          )}

          {/* Number Pad */}
          <div className={`grid grid-cols-3 gap-3 w-full transition-opacity duration-300 ${lockedOut ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
            {digits.map((d, idx) => {
              if (d === '') return <div key={idx} />;
              
              if (d === 'del') return (
                <button
                  key={idx}
                  type="button"
                  onClick={handleDelete}
                  className="h-14 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/10 hover:border-white/15 active:scale-95 transition-all duration-150 flex items-center justify-center cursor-pointer group"
                >
                  <Delete className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                </button>
              );

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleDigit(d)}
                  className="h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] hover:bg-[#73E6D8]/10 hover:border-[#73E6D8]/20 active:scale-95 active:bg-[#73E6D8]/20 transition-all duration-150 text-white font-black text-xl cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_16px_rgba(115,230,216,0.1)]"
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <p className="text-white/20 text-[9px] font-medium tracking-wider uppercase text-center">
            Secured · Hooked & Cooked Admin
          </p>
        </div>
      </div>

      {/* Shake keyframe */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
}
