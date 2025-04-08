import os
import markdown
from datetime import datetime
import json

def convert_markdown_to_html(markdown_file):
    """Convert a markdown file to HTML"""
    with open(markdown_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(md_content, extensions=['fenced_code', 'tables', 'codehilite'])
    
    # Get the title from the first line (assuming it's a h1)
    title = md_content.split('\n')[0].replace('#', '').strip()
    
    # Get the date from the file's modification time
    file_time = os.path.getmtime(markdown_file)
    date = datetime.fromtimestamp(file_time).strftime('%B %d, %Y')
    
    return {
        'title': title,
        'content': html_content,
        'date': date,
        'filename': os.path.basename(markdown_file)
    }

def generate_blog_index(blog_dir):
    """Generate a JSON file containing all blog posts metadata"""
    blog_posts = []
    
    # Get all markdown files in the blog directory
    for filename in os.listdir(blog_dir):
        if filename.endswith('.md'):
            markdown_file = os.path.join(blog_dir, filename)
            blog_post = convert_markdown_to_html(markdown_file)
            blog_posts.append(blog_post)
    
    # Sort blog posts by date (newest first)
    blog_posts.sort(key=lambda x: x['date'], reverse=True)
    
    # Save the blog index
    with open(os.path.join(blog_dir, 'blog_index.json'), 'w', encoding='utf-8') as f:
        json.dump(blog_posts, f, indent=2)
    
    return blog_posts

if __name__ == '__main__':
    blog_dir = os.path.dirname(os.path.abspath(__file__))
    generate_blog_index(blog_dir) 