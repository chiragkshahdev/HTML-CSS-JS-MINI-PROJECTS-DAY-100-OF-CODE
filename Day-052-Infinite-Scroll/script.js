const container = document.getElementById('container');
const loader = document.getElementById('loader');

let page = 1;
const limit = 5;

async function getPosts() {
    loader.classList.add('show');
    // Dummy API for infinite posts
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    const data = await res.json();
    
    setTimeout(() => {
        loader.classList.remove('show');
        showPosts(data);
    }, 500);
}

function showPosts(posts) {
    posts.forEach(post => {
        const div = document.createElement('div');
        div.classList.add('post');
        div.innerHTML = `<h2>${post.id}. ${post.title}</h2><p>${post.body}</p>`;
        container.appendChild(div);
    });
}

function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        page++;
        getPosts();
    }
}

// Initial Load
getPosts();
window.addEventListener('scroll', handleScroll);