import { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import './State.css';

const State = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [skills, setSkills] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getAll();
      setUsers(data);
    } catch (error) {
      setMessage('Error fetching users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newUser = await userAPI.create({
        name,
        email,
        age: parseInt(age),
        skills: skills.filter(skill => skill.trim() !== '')
      });
      
      setUsers([...users, newUser]);
      setMessage('User added successfully!');
      // Reset form
      setName('');
      setEmail('');
      setAge('');
      setSkills([]);
    } catch (error) {
      setMessage('Error adding user: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const updateSkill = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const removeSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  return (
    <div className="state-container">
      <h2>useState Hook Demo - Placement Training System</h2>
      
      {/* Counter Example */}
      <div className="counter-section">
        <h3>Counter Example</h3>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      {/* Form Example */}
      <div className="form-section">
        <h3>Add New Student</h3>
        {message && <div className="message">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Skills:</label>
            {skills.map((skill, index) => (
              <div key={index} className="skill-input">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  placeholder="Enter skill"
                />
                <button type="button" onClick={() => removeSkill(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addSkill}>
              Add Skill
            </button>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="users-section">
        <h3>Registered Students</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <h4>{user.name}</h4>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age}</p>
                {user.skills && user.skills.length > 0 && (
                  <div>
                    <strong>Skills:</strong>
                    <ul>
                      {user.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p><strong>Status:</strong> {user.placementStatus || 'Not Placed'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default State;
