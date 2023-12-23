let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('.navbar');

    if (st > lastScrollTop) {
        // untuk saat scroll ke bawah
        document.body.classList.remove('up');
        document.body.classList.add('down', 'transparent');
        navbar.style.backgroundColor = 'rgba(255, 104, 0, 0.68)';
    } else {
        // untuk saat scroll ke atas
        document.body.classList.remove('down');
        document.body.classList.add('up');

        // untuk memulihkan efek transparan
        if (st === 0) {
            document.body.classList.remove('transparent');
            navbar.style.backgroundColor = 'rgba(255, 104, 0, 1)';
        }
    }

    lastScrollTop = st;
});

        // Simulating server response with dummy data
        let savedData = localStorage.getItem('savedData');
let posts = savedData ? JSON.parse(savedData) : [
        { title: 'Sabtu, 12 Desember 2023', image: 'https://i.pinimg.com/564x/63/4a/97/634a974870fa2bc57f4b2323ddadee01.jpg', description: 'kue ulang tahun lucu, enak, menarik' },
        { title: 'Sabtu, 12 Desember 2023', image: 'https://i.pinimg.com/564x/f8/d3/6b/f8d36bc7db96415eb67cb8a62e815cee.jpg', description: 'kue ulang tahun lucu, enak, menarik' },
        { title: 'Sabtu, 12 Desember 2023', image: 'https://i.pinimg.com/564x/63/4a/97/634a974870fa2bc57f4b2323ddadee01.jpg', description: 'kue ulang tahun lucu, enak, menarik' },
        { title: 'Sabtu, 12 Desember 2023', image: 'https://i.pinimg.com/564x/f8/d3/6b/f8d36bc7db96415eb67cb8a62e815cee.jpg', description: 'kue ulang tahun lucu, enak, menarik' },
        { title: 'Sabtu, 12 Desember 2023', image: 'https://i.pinimg.com/564x/63/4a/97/634a974870fa2bc57f4b2323ddadee01.jpg', description: 'kue ulang tahun lucu, enak, menarik' },
        { title: 'Sabtu, 12 Desember 2023', image: 'https://i.pinimg.com/564x/f8/d3/6b/f8d36bc7db96415eb67cb8a62e815cee.jpg', description: 'kue ulang tahun lucu, enak, menarik' },
        { title: 'Sabtu, 12 Desember 2023', image: 'https://i.pinimg.com/564x/63/4a/97/634a974870fa2bc57f4b2323ddadee01.jpg', description: 'kue ulang tahun lucu, enak, menarik' },
        { title: 'Sabtu, 12 Desember 2023', image: 'https://i.pinimg.com/564x/f8/d3/6b/f8d36bc7db96415eb67cb8a62e815cee.jpg', description: 'kue ulang tahun lucu, enak, menarik' },
        ];

        function sortPosts() {
    const sortType = document.getElementById("sort-select").value;
    if (sortType === "latest") {
        posts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    } else {
        posts.sort((a, b) => new Date(a.published_at) - new Date(b.published_at));
    }
    renderPosts();
}


function showPerPage() {
    itemsPerPage = parseInt(document.getElementById("show-select").value);
    renderPosts();
}

let currentPage = 1;
let itemsPerPage = 10;
let data = posts;


function renderPosts() {
    localStorage.setItem('savedData', JSON.stringify(posts));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const postsToDisplay = data.slice(startIndex, endIndex);

    const postList = document.getElementById("post-list");
    postList.innerHTML = "";

    postsToDisplay.forEach(post => {
        const card = document.createElement("div");
        card.className = "card";

        const image = document.createElement('img');
        image.className = 'card-image lazy';
        image.setAttribute('data-src', post.image);
        image.setAttribute('src', post.image); 
        image.alt = post.title;

        const title = document.createElement('h2');
        title.className = 'card-title';
        title.textContent = post.title;

        const description = document.createElement('p');
        description.className = 'card-description';
        description.textContent = post.description;

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);

        postList.appendChild(card);
    });


    var lazyLoadInstance = new LazyLoad({
        elements_selector: '.lazy',
    });

    updatePagination();
}

    

function updatePagination() {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(data.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.addEventListener("click", function () {
            currentPage = i;
            renderPosts();
        });

        if (i === currentPage) {
            pageLink.classList.add("active");
        }

        pagination.appendChild(pageLink);
    }
}


window.addEventListener("load", function () {
    renderPosts();
});

const pagination = document.querySelector(".pagination");
pagination.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
        event.preventDefault();
        currentPage = parseInt(event.target.textContent);
        renderPosts();
    }
});

renderPosts();

function highlightActiveMenu() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (currentPage === linkPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

highlightActiveMenu();

function toggleAddForm() {
    const addForm = document.getElementById("addForm");
    addForm.style.display = addForm.style.display === "none" ? "block" : "none";
}

function showAddForm() {
    const addForm = document.getElementById("addForm");
    addForm.style.display = "block";
}

function hideAddForm() {
    const addForm = document.getElementById("addForm");
    addForm.style.display = "none";
}

function addNewPost(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    const newPost = {
        title: title,
        image: image,
        description: description,
    };

    posts.unshift(newPost);
    renderPosts();
    hideAddForm();
}

function highlightActiveMenu() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const linkId = link.getAttribute('id');

        if (currentPage === linkPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        if (currentPage.includes(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

highlightActiveMenu();
