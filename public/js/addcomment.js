const postComment = async (event) => {
    event.preventDefault();
    const postId = document.querySelector('#post-id').getAttribute('value');
    const content = document.querySelector('#content').value.trim();
  
    if (content) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, postId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        alert('Failed to create comment.');
      }
    }
  };
  
  document
  .querySelector('.comment-form')
  .addEventListener('submit', postComment);
  