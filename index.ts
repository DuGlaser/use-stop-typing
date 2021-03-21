import { MutableRefObject, useEffect, useState } from 'react';

export const useStopTyping = (
  ref: MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>,
  callback: () => void,
  setTimeoutMs: number
) => {
  const [refValue, setRefValue] = useState('');
  let typingTimer: NodeJS.Timeout;

  const handleUpdate = () => {
    if (ref.current && refValue !== ref.current.value) {
      callback();
      setRefValue(ref.current.value);
    }
  };

  const handleKeyUp = () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(handleUpdate, setTimeoutMs);
  };

  const handleKeyDown = () => {
    clearTimeout(typingTimer);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('keyup', handleKeyUp);
      ref.current.addEventListener('keydown', handleKeyDown);
      ref.current.addEventListener('blur', handleUpdate);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('keyup', handleKeyUp);
        ref.current.removeEventListener('keydown', handleKeyDown);
        ref.current.removeEventListener('blur', handleUpdate);
      }
    };
  }, [ref, refValue]);
};
