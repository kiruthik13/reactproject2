import { useState } from 'react';

const LikeDislike = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [name, setName] = useState('Kiruthik');

  const handleLike = () => setLikeCount(likeCount + 1);
  const handleDislike = () => setDislikeCount(dislikeCount + 1);
  const resetCounts = () => {
    setLikeCount(0);
    setDislikeCount(0);
  };
  const toggleName = () =>
    setName(name === 'Kiruthik' ? 'Shandeep' : 'Kiruthik');

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h2>Like and Dislike Counter</h2>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div>
          <p>Likes: {likeCount}</p>
          <button onClick={handleLike}>Like 👍</button>
        </div>

        <div>
          <p>Dislikes: {dislikeCount}</p>
          <button onClick={handleDislike}>Dislike 👎</button>
        </div>
      </div>

      <br />
      <button onClick={resetCounts}>Reset</button>

      <p>Name: {name}</p>
      <button onClick={toggleName}>Change Name</button>
    </div>
  );
};

export default LikeDislike;
