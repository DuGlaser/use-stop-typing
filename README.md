# useStopTyping
React hook for running callback when input stops.

## Installation
```
npm install use-stop-typing
```


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
