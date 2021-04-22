const deleteBlog = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('#post-id').getAttribute('value');
    const response = await fetch(`/api/blogposts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
};

document
    .querySelector('#delete-button')
    .addEventListener('click', deleteBlog);
