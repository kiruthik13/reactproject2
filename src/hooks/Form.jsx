import { useState, useEffect } from 'react';
import { userAPI } from '../services/api.js';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    skills: '',
    education: {
      degree: '',
      institution: '',
      graduationYear: ''
    }
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const fetchedUsers = await userAPI.getAll();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested education fields
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setSubmitted(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert skills string to array
      const userData = {
        ...formData,
        age: parseInt(formData.age),
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        education: {
          ...formData.education,
          graduationYear: parseInt(formData.education.graduationYear)
        }
      };

      const savedUser = await userAPI.create(userData);
      console.log('User saved successfully:', savedUser);
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        age: '',
        phone: '',
        skills: '',
        education: {
          degree: '',
          institution: '',
          graduationYear: ''
        }
      });

      // Refresh the users list
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      setError(error.message || 'Failed to save user data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="age"
          placeholder="Your Age"
          value={formData.age}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="skills"
          placeholder="Your Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          style={styles.input}
        />
        
        <h3 style={styles.sectionTitle}>Education Details</h3>
        <input
          type="text"
          name="education.degree"
          placeholder="Degree"
          value={formData.education.degree}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="education.institution"
          placeholder="Institution"
          value={formData.education.institution}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="education.graduationYear"
          placeholder="Graduation Year"
          value={formData.education.graduationYear}
          onChange={handleChange}
          style={styles.input}
        />
        
        <button 
          type="submit" 
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Submit Registration'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</p>}
      {submitted && <p style={{ color: 'green', marginTop: '1rem' }}>Thank you! Your registration has been submitted and saved to database.</p>}

      {/* Display registered users */}
      <div style={styles.usersSection}>
        <h3 style={styles.sectionTitle}>Registered Students ({users.length})</h3>
        {loadingUsers ? (
          <p>Loading registered students...</p>
        ) : users.length > 0 ? (
          <div style={styles.usersList}>
            {users.map((user, index) => (
              <div key={user._id || index} style={styles.userCard}>
                <h4>{user.name}</h4>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age}</p>
                {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                {user.skills && user.skills.length > 0 && (
                  <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
                )}
                {user.education && (
                  <div>
                    <p><strong>Education:</strong></p>
                    <ul style={styles.educationList}>
                      {user.education.degree && <li>Degree: {user.education.degree}</li>}
                      {user.education.institution && <li>Institution: {user.education.institution}</li>}
                      {user.education.graduationYear && <li>Graduation Year: {user.education.graduationYear}</li>}
                    </ul>
                  </div>
                )}
                <p><strong>Status:</strong> {user.placementStatus}</p>
                <p><strong>Registered:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No students registered yet.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  sectionTitle: {
    margin: '1rem 0 0.5rem 0',
    color: '#333',
    borderBottom: '2px solid #333',
    paddingBottom: '0.5rem'
  },
  usersSection: {
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '2px solid #ddd'
  },
  usersList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem'
  },
  userCard: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  educationList: {
    margin: '0.5rem 0',
    paddingLeft: '1.5rem'
  }
};

export default Form;
