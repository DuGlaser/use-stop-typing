# useStopTyping
React hook for running callback when input stops.

## Usage
```tsx
import { useRef } from 'react';
import { useStopTyping } from 'use-stop-typing';

export default () => {
  const ref = useRef<HTMLInputElement>(null);
  useStopTyping(ref, () => console.log('Update'), 2000);

  return (
    <input type="text" ref={ref} />
  )
}
```

## LICENSE
MIT
