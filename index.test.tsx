import React, { useRef } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useStopTyping } from './index';
import { act } from 'react-dom/test-utils';

const callback = jest.fn();
const defaultDelay = 2000;

const Test: React.VFC = () => {
  const ref = useRef<HTMLInputElement>(null);
  useStopTyping(ref, callback, defaultDelay);

  return <input type="text" data-testid="input" ref={ref} />;
};

const setup = () => {
  const utils = render(<Test />);
  const input = utils.getByTestId('input') as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

describe('useStopTyping', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    callback.mockClear();
  });

  test('input text and stop typing for 2000ms', () => {
    const { input } = setup();
    userEvent.type(input, 'text');
    act(() => {
      jest.advanceTimersByTime(defaultDelay - 1000);
    });
    expect(callback).toHaveBeenCalledTimes(0);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('input text and stop typing for 1000ms and input text...', () => {
    const { input } = setup();
    userEvent.type(input, 'text');
    act(() => {
      jest.advanceTimersByTime(defaultDelay - 1000);
    });
    expect(callback).toHaveBeenCalledTimes(0);

    userEvent.type(input, 'text');
    act(() => {
      jest.advanceTimersByTime(defaultDelay - 1000);
    });
    expect(callback).toHaveBeenCalledTimes(0);
  });

  test('input text and remove focus from input', () => {
    const { input } = setup();
    userEvent.type(input, 'text');
    expect(callback).toHaveBeenCalledTimes(0);

    fireEvent.blur(input);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('input arrow key', () => {
    const { input } = setup();
    userEvent.type(input, 'text');
    act(() => {
      jest.advanceTimersByTime(defaultDelay);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    userEvent.type(input, '{arrowleft}');
    act(() => {
      jest.advanceTimersByTime(defaultDelay);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('input "text" and push backspace and input "t"', () => {
    const { input } = setup();
    userEvent.type(input, 'text');
    act(() => {
      jest.advanceTimersByTime(defaultDelay);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    userEvent.type(input, '{backspace}');
    userEvent.type(input, 't');
    act(() => {
      jest.advanceTimersByTime(defaultDelay);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
