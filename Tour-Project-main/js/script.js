let navbar = document.querySelector('.header .navbar');
if (document.querySelector('#menu-btn')) {
    document.querySelector('#menu-btn').onclick = () =>{
        navbar.classList.add('active');
    }
}
if (document.querySelector('#nav-close')) {
    document.querySelector('#nav-close').onclick = () =>{
        navbar.classList.remove('active');
    }
}


//----------- Toggle Search Form Updated----------------//
const searchBtn = document.getElementById('search-btn');
const closeSearch = document.getElementById('close-search');
const searchForm = document.querySelector('.search-form');

if (searchBtn && closeSearch && searchForm) {
    searchBtn.addEventListener('click', () => {
        searchForm.classList.add('active');
    });

    closeSearch.addEventListener('click', () => {
        searchForm.classList.remove('active');
    });
}

window.onscroll=()=>{
    if (navbar) {
        navbar.classList.remove('active');
    }
    if (document.querySelector('.header')) {
        if(window.scrollY>0){
            document.querySelector('.header').classList.add('active');
        }else{
            document.querySelector('.header').classList.remove('active');
        }
    }
};
window.onload=()=>{
    if (document.querySelector('.header')) {
        if(window.scrollY>0){
            document.querySelector('.header').classList.add('active');
        }else{
            document.querySelector('.header').classList.remove('active');
        }
    }
};

// Function to load and parse CSV data
async function loadPackages(limit = null) {
    try {
        console.log('Fetching CSV...');
        const response = await fetch('Delhi_Tour_Packages.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        console.log('CSV text length:', csvText.length);
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        console.log('Parsed data:', parsed.data.length, 'packages');
        const packages = parsed.data;

        // Generate HTML for packages
        const boxContainer = document.querySelector('.packages .box-container');
        if (!boxContainer) {
            console.error('Box container not found');
            return;
        }
        boxContainer.innerHTML = ''; // Clear existing hardcoded packages

        const displayPackages = limit ? packages.slice(0, limit) : packages;
        console.log('Displaying', displayPackages.length, 'packages');

        displayPackages.forEach((pkg, index) => {
            console.log(`Package ${index}:`, pkg.Title, pkg['Actual Price']);
            const box = document.createElement('div');
            box.className = 'box';
            box.innerHTML = `
                <div class="image">
                    <img src="${pkg['Image Links']}" alt="${pkg.Title}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="content">
                    <h3>${pkg.Title}</h3>
                    <p>${pkg['Trip Overview']}</p>
                    <div class="price">Rs ${pkg['Actual Price']}</div>
                    <a href="#contact" class="btn">explore now</a>
                </div>
            `;
            boxContainer.appendChild(box);
        });
        console.log('Packages loaded successfully');
    } catch (error) {
        console.error('Error loading packages:', error);
    }
}

// Load packages on page load
window.addEventListener('load', () => {
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
    if (isIndexPage) {
        loadPackages(3); // Show only 3 packages on index.html
    } else {
        loadPackages(); // Show all packages on packages.html
    }
});



