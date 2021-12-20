import { RefObject, useEffect, useRef } from 'react';

export const useStopTyping = (
  ref: RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
  callback: () => void,
  setTimeoutMs: number
) => {
  const refValue = useRef(ref.current?.value ?? '');
  let typingTimer: ReturnType<typeof setTimeout>;

  const handleUpdateValue = () => {
    refValue.current = ref.current?.value ?? '';
  };

  const handleUpdate = () => {
    if (ref.current && refValue.current !== ref.current.value) {
      callback();
      clearTimeout(typingTimer);
      handleUpdateValue();
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
      ref.current.addEventListener('focus', handleUpdateValue);
      ref.current.addEventListener('keyup', handleKeyUp);
      ref.current.addEventListener('keydown', handleKeyDown);
      ref.current.addEventListener('blur', handleUpdate);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('focus', handleUpdateValue);
        ref.current.removeEventListener('keyup', handleKeyUp);
        ref.current.removeEventListener('keydown', handleKeyDown);
        ref.current.removeEventListener('blur', handleUpdate);
      }
    };
  }, [ref, handleUpdate]);
};
