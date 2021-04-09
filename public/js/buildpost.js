const postBlog = async (event) => {
  event.preventDefault();
  const subject = document.querySelector('#subject').value.trim();
  const contentBody = document.querySelector('#content-body').value.trim();
  console.log(subject)
  console.log(contentBody)
  console.log("dsfasdf")
  if (subject && contentBody) {
    const response = await fetch('/api/blogposts', {
      method: 'POST',
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
.querySelector('.blog-form')
.addEventListener('submit', postBlog);
