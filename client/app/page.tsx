"use client";
import { useAppDispatch, useAppSelector } from "../lib/hook";
import {
  increment,
  decrement,
  asyncIncrement,
} from "../lib/features/counter/counterSlice";

export default function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
      </div>
      <div>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
      <div>
        <button onClick={() => dispatch(asyncIncrement(20))}>
          Async Increment
        </button>
      </div>
    </div>
  );
}
