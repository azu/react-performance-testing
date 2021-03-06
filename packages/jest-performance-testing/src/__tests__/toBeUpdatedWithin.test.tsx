import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { perf, wait } from '../../../react-performance-testing/src';
import '../index';

test('should throw error when component is not mounted', async () => {
  const { renderCount } = perf<{ Component: unknown }>(React);

  await wait(() =>
    expect(() =>
      expect(renderCount.current.Component).toBeUpdatedWithin(0),
    ).toThrow(/Specified component could not be found/),
  );
});

test('should be true when expected value is correct array', async () => {
  const Text = ({ count }: { count: number }): React.ReactElement => (
    <p>{count}</p>
  );
  const Counter = () => {
    const [count, setCount] = React.useState(0);
    return (
      <div>
        <Text count={count} />
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          count
        </button>
      </div>
    );
  };

  const { renderTime } = perf<{ Text: unknown; Counter: unknown }>(React);

  render(<Counter />);

  const countButton = screen.getByRole('button', { name: /count/ });

  fireEvent.click(countButton);

  fireEvent.click(countButton);

  await wait(() =>
    expect(renderTime.current.Counter).toBeUpdatedWithin([
      16, // first render
      16, // second render
    ]),
  );
});

test('should be true even if expected value is incorrect array when using `not` declaration', async () => {
  const Text = ({ count }: { count: number }): React.ReactElement => (
    <p>{count}</p>
  );
  const Counter = () => {
    const [count, setCount] = React.useState(0);
    return (
      <div>
        <Text count={count} />
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          count
        </button>
      </div>
    );
  };

  const { renderTime } = perf<{ Text: unknown; Counter: unknown }>(React);

  render(<Counter />);

  const countButton = screen.getByRole('button', { name: /count/ });

  fireEvent.click(countButton);

  fireEvent.click(countButton);

  await wait(() =>
    expect(renderTime.current.Counter).not.toBeUpdatedWithin([
      0, // first render
      16, // second render
    ]),
  );
});

test('should throw error when expected value is incorrect array', async () => {
  const Text = ({ count }: { count: number }): React.ReactElement => (
    <p>{count}</p>
  );
  const Counter = () => {
    const [count, setCount] = React.useState(0);
    return (
      <div>
        <Text count={count} />
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          count
        </button>
      </div>
    );
  };

  const { renderTime } = perf<{ Text: unknown; Counter: unknown }>(React);

  render(<Counter />);

  const countButton = screen.getByRole('button', { name: /count/ });

  fireEvent.click(countButton);

  fireEvent.click(countButton);

  await wait(() =>
    expect(() =>
      expect(renderTime.current.Counter).toBeUpdatedWithin([
        0, // incorrect
        16, // correct
      ]),
    ).toThrow(/\[0, 16\]/),
  );
});

test('should be true when expected value is correct number', async () => {
  const Text = ({ count }: { count: number }): React.ReactElement => (
    <p>{count}</p>
  );
  const Counter = () => {
    const [count, setCount] = React.useState(0);
    return (
      <div>
        <Text count={count} />
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          count
        </button>
      </div>
    );
  };

  const { renderTime } = perf<{ Text: unknown; Counter: unknown }>(React);

  render(<Counter />);

  const countButton = screen.getByRole('button', { name: /count/ });

  fireEvent.click(countButton);

  fireEvent.click(countButton);

  await wait(() => expect(renderTime.current.Counter).toBeUpdatedWithin(16));
});

test('should throw error when expected value is incorrect number', async () => {
  const Text = ({ count }: { count: number }): React.ReactElement => (
    <p>{count}</p>
  );
  const Counter = () => {
    const [count, setCount] = React.useState(0);
    return (
      <div>
        <Text count={count} />
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          count
        </button>
      </div>
    );
  };

  const { renderTime } = perf<{ Text: unknown; Counter: unknown }>(React);

  render(<Counter />);

  const countButton = screen.getByRole('button', { name: /count/ });

  fireEvent.click(countButton);

  fireEvent.click(countButton);

  await wait(() =>
    expect(() =>
      expect(renderTime.current.Counter).toBeUpdatedWithin(0),
    ).toThrow(/\[0, 0\]/),
  );
});

test('should throw error when updates property is passed', async () => {
  const Text = ({ count }: { count: number }): React.ReactElement => (
    <p>{count}</p>
  );
  const Counter = () => {
    const [count, setCount] = React.useState(0);
    return (
      <div>
        <Text count={count} />
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          count
        </button>
      </div>
    );
  };

  const { renderTime } = perf<{ Text: unknown; Counter: unknown }>(React);

  render(<Counter />);

  const countButton = screen.getByRole('button', { name: /count/ });

  fireEvent.click(countButton);

  await wait(() =>
    expect(() =>
      expect(renderTime.current.Counter?.updates).toBeUpdatedWithin(0),
    ).toThrow(/You need to pass Component property/),
  );
});

test('should throw error when expected value is incorrect number', async () => {
  expect(() => expect(undefined).toBeUpdatedWithin(16)).toThrow(
    /Specified component could not be found/,
  );
});
