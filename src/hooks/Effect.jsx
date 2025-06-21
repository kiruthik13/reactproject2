// src/hooks/Effect.jsx
import { useState, useEffect } from 'react';

const Effect = () => {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [posts,setPosts]=useState([]);

  // Update document title and log mount
  useEffect(() => {
    console.log('Component mounted');
    document.title = `Clicked ${count} times`;

    return () => {
      console.log('Component unmounted or before next effect');
    };
  }, [count]);

  // Fetch user data on first render
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  }, []); 
  useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res)=>res.json())
        .then((data)=>setPosts(data))
    },[])
    console.log(posts);// Only runs once on mount

  return (
    <div style={{ padding: '1rem' }}>
      <h2>useEffect Example</h2>

      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Click Me
      </button>

      <h3>User List</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
      <ul>
                {posts.map((post)=>(
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
    </div>
  );
};

export default Effect;
