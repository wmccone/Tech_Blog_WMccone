const postBlog = async () => {
    const response = await fetch('/api/blogposts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create blog.');
    }
  };
  
  document.querySelector('#postblog').addEventListener('click', postBlog);
  