const editBlog = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('#post-id').getAttribute('value');
    const subject = document.querySelector('#subject').value.trim();
    const contentBody = document.querySelector('#content-body').value.trim();

    console.log(postId)
    if (subject && contentBody) {
      const response = await fetch(`/api/blogposts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ subject, contentBody }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create blog.');
      }
    }
  };
  
  document
  .querySelector('.edit-form')
  .addEventListener('submit', editBlog);
  