"use client";

import { useState } from "react";

// users prop is passed from the server component (page.js) to this client component (Counter.js), 
// demonstrating interactivity in the client component while still utilizing data fetched on the server side.
export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>There are {users.length} users.</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}
