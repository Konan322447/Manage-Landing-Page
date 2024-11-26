const testimonialList = document.querySelector('.testimonial-list');
const testimonials = Array.from(testimonialList.children);

let currentIndex = 0;

// Clone first and last testimonials for seamless looping
const firstClone = testimonials[0].cloneNode(true);
const lastClone = testimonials[testimonials.length - 1].cloneNode(true);

// Append clones to the list
testimonialList.appendChild(firstClone);
testimonialList.insertBefore(lastClone, testimonials[0]);

// Update testimonials array to include clones
const updatedTestimonials = Array.from(testimonialList.children);

// Set the initial position to show the real first testimonial
const moveToInitialPosition = () => {
    const visibleTestimonials = getVisibleTestimonials();
    const initialOffset = -(100 / visibleTestimonials); // Account for the first clone
    testimonialList.style.transform = `translateX(${initialOffset}%)`;
};

// Determine the number of testimonials to show at a time (responsive)
const getVisibleTestimonials = () => {
    return window.innerWidth <= 768 ? 1 : 3; // 1 for mobile, 3 for desktop
};

// Move to a specific slide
const moveToTestimonial = (index) => {
    const visibleTestimonials = getVisibleTestimonials();
    const offset = -(index * (100 / visibleTestimonials)); // Adjust offset dynamically
    testimonialList.style.transition = 'transform 0.5s ease-in-out';
    testimonialList.style.transform = `translateX(${offset}%)`;
};

// Auto-slide function
const autoSlide = () => {
    const visibleTestimonials = getVisibleTestimonials();
    const totalSlides = Math.ceil(testimonials.length / visibleTestimonials);

    currentIndex++;
    moveToTestimonial(currentIndex);

    // Handle seamless looping
    testimonialList.addEventListener('transitionend', () => {
        if (currentIndex >= totalSlides) {
            testimonialList.style.transition = 'none'; // Remove animation
            currentIndex = 0; // Reset to first real testimonial
            moveToTestimonial(currentIndex);
        }
        if (currentIndex < 0) {
            testimonialList.style.transition = 'none'; // Remove animation
            currentIndex = totalSlides - 1; // Reset to last real testimonial
            moveToTestimonial(currentIndex);
        }
    });
};

// Start auto-slide
setInterval(autoSlide, 5000); // Slide every 3 seconds

// Set up the initial position and handle responsiveness
window.addEventListener('load', moveToInitialPosition);
window.addEventListener('resize', moveToInitialPosition);


// Form Validation for footer form 


const form = document.getElementById('footerForm');
const emailInput = document.getElementById('footerInput');
const errorMessage = document.getElementById('error');

// const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// form.addEventListener('submit', (e)=>{
//     e.preventDefault();

//     if(input.value == ''  ){
//         errorMessage.style.display = 'block';
//         emailInput.style.border = '2px solid hsl(12, 88%, 59%)';
//     }else{
//         errorMessage.style.display = 'none';
//         emailInput.style.border = 'none';
//     }

// });

function isValid(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    if (isValid(emailInput.value)) {
        errorMessage.style.display = 'none';
        emailInput.style.border = 'none';
        alert('Your Form has been Submitted');
    } else {
        errorMessage.style.display = 'block';
        emailInput.style.border = '2px solid hsl(12, 88%, 59%)';
    }

    
});


// -----------------------------NavMenu-------------------------

const navToggle = document.getElementById('navOpen');
const nav = document.getElementById('nav');


navToggle.addEventListener('click', ()=>{

    const icon = navToggle.getAttribute('src');

    if(icon === 'images/icon-hamburger.svg'){
        navToggle.setAttribute('src', 'images/icon-close.svg')
        nav.classList.add('appear');
        document.body.style.overflow = 'hidden';
    }else{
        navToggle.setAttribute('src', 'images/icon-hamburger.svg');
        nav.classList.remove('appear');
        document.body.style.overflow = 'auto';
    }

    


})