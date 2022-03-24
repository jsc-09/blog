const PromptUI = require("inquirer/lib/ui/prompt");

const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('blog-title').value.trim();
    const description = document.querySelector('blog-content').value.trim();

    if (title && description) {
        const response = await fetch(`/api/blogs`, {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.create('blogs');
        } else {
            alert('Failed to create blog post')
        }
    }
};

const commentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('comment-content').value.trim();

    if (comment) {
        const response = await fetch(`/api/blogs`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.create('/blogs');
        } else {
            alert('Failed to add comment')
        }
    }
};

const updateHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#blog-description');

    if (title && description) {
        const response = await fetch(`/api/blogs`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.update('/blogs');
        } else {
            alert('Failed to update post.');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('blog-id')) {
        const id = event.target.getAttribute('blog-id');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/blogs');
        } else {
            alert('Failed to delete post');
        }
    }
};

document
    .querySelector('.new-blog-post')
    .addEventListener('submit', newFormHandler)

document
    .querySelector('.new-comment')
    .addEventListener('submit', commentHandler)

document
    .querySelector('.update-post')
    .addEventListener('submit', updateHandler)

document
    .querySelector('.delete-post')
    .addEventListener('click', delButtonHandler);