// Sample array of project objects
const projects = [
    { id: 1, name: 'Web Development', description: 'A web developers job is to create websites. While their primary role is to ensure the website is visually appealing and easy to navigate', price: '$1000' },
    { id: 2, name: 'Mobile App Development', description: 'Mobile apps provide customer-appropriate content and personalized experience. Analyzing user behaviors, language.', price: '$1500' },
    { id: 3, name: 'Frontend Development', description: 'Creates websites and applications using web languages such as HTML, CSS, and JavaScript that allow users to access with the site or app', price: '$2000' },
    { id: 4, name: 'Design', description: 'These visual and graphic design principles work together to create appealing and functional designs that make sense to users', price: '$800' },
    { id: 5, name: 'Data Science', description: 'It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence', price: '$3000' }
];

// Function to display projects
function displayProjects(projectsArray) {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';

    projectsArray.forEach((project, currentIndex) => {
        const courseCard = document.createElement('div');
        courseCard.innerHTML = `<div>
                                    <div>
                                        <h3>${project.name}</h3>
                                        <h5>${project.description}</h5>
                                    </div>
                                    <div>
                                        <p>${project.price}</p>
                                        <button>Buy Now</Button>
                                    </div>
                                </div>
                                `
        courseCard.style.opacity = '0'; // Set initial opacity to 0

        // Add CSS class for animation
        courseCard.classList.add('slide-in');
        courseCard.style.animationDelay = `${currentIndex * 200}ms`; // Set animation delay for each item

        projectList.appendChild(courseCard);
        // Trigger reflow to apply initial styles before adding the animation class
        courseCard.offsetWidth;

        // Set opacity to 1 with a delay for the animation effect
        setTimeout(() => {
            courseCard.style.opacity = '1';
        }, 100 + currentIndex * 200); // Set opacity delay for each item
    });
}

// Function to filter projects based on search criteria
function filterProjects() {
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.toLowerCase();

    const filteredProjects = projects.filter((project) => {
        const projectName = project.name.toLowerCase();
        const projectCategory = project.description.toLowerCase();

        return (
            projectName.includes(searchValue) ||
            projectCategory.includes(searchValue)
        );
    });

    displayProjects(filteredProjects);
}

// Event listener for filter button click
const filterButton = document.getElementById('filterButton');
filterButton.addEventListener('click', filterProjects);

// Event listener for Enter key press in the input field
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        filterProjects();
    }
});

// Call displayProjects with all projects when the page loads
window.addEventListener('load', () => {
    displayProjects(projects);
});