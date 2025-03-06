import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrailDetails({ trail }) {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/trails/${trail._id}/comments`);
        setComments(response.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [trail._id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/api/trails/${trail._id}/comments`, {
        username,
        text
      });
      setComments([...comments, response.data]);
      setUsername('');
      setText('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <div>
      <h2>{trail.name}</h2>
      <p>{trail.description}</p>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.username}</strong>: {comment.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          required
        />
        <br />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your comment"
          required
        ></textarea>
        <br />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default TrailDetails;