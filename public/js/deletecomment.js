const deleteComment = async (event) => {
    event.preventDefault();

    const commentId = document.querySelector('#comment-id').getAttribute('value');

    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    }
};

document
    .querySelector('#delete-comment')
    .addEventListener('click', deleteComment);
