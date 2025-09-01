'use client';

import { cn } from '@/lib/utils'; // optional utility
import { useState } from 'react';
import SignInComponent from './components/SignInComponent';
import ToggleComponent from './components/ToggleComponent';
import ToggleMobileComponent from './components/ToggleMobileComponent';
import SignUpComponent from './components/SignUpComponent';

function useAnimationTrigger(delay = 0) {
  const [trigger, setTrigger] = useState(true);

  const rerun = () => {
    setTrigger(false);
    requestAnimationFrame(() => {
      if (delay) {
        setTimeout(() => setTrigger(true), delay);
      } else {
        setTrigger(true);
      }
    });
  };

  return [trigger, rerun] as const;
}
export default function LoginPage() {
  const [active, setActive] = useState(false);
  const [animateToggle, triggerAnimation] = useAnimationTrigger();

  // เมื่อสลับ active ให้ animation เล่นอีกรอบ
  const handleToggle = () => {
    triggerAnimation();
    setActive(prev => !prev);
  };

  return (
    <div className='flex m-auto justify-center items-center min-h-screen relative'>
      <div
        className={cn(
          "login-container shadow-custom",
          active && "active"
        )}
      >
        {/* Sign Up Form */}
        <SignUpComponent active={active} handleToggle={handleToggle} />

        {/* Sign In Form */}
        <SignInComponent active={active} handleToggle={handleToggle} />

        {/* Toggle Container */}
        <ToggleComponent active={active} setActive={setActive} />
        {/* Toggle Container Mobile */}
        <ToggleMobileComponent animateToggle={animateToggle ? 'animate-toggle-mobile' : ''} />
      </div>
    </div>
  );
}
