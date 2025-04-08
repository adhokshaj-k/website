document.addEventListener('DOMContentLoaded', function() {
    fetch('/blogs/blog_index.json')
        .then(response => response.json())
        .then(blogPosts => {
            const blogList = document.querySelector('.blog ul');
            blogList.innerHTML = ''; // Clear existing content
            
            blogPosts.forEach(post => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `post.html?file=${post.filename}`;
                link.textContent = post.title;
                
                const dateSpan = document.createElement('span');
                dateSpan.className = 'post-date';
                dateSpan.textContent = post.date;
                
                listItem.appendChild(link);
                listItem.appendChild(dateSpan);
                blogList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            const blogList = document.querySelector('.blog ul');
            blogList.innerHTML = '<li>Error loading blog posts. Please try again later.</li>';
        });
}); 