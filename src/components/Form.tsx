import { useState } from "react";

export function Form() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        {count}
      </button>
    </div>
  );
}
