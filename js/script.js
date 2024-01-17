// Modern JavaScript for Interactive Website Features

class WebsiteInteractivity {
    constructor() {
        this.initEventListeners();
        this.initIntersectionObserver();
    }

    initEventListeners() {
        // Smooth Scroll for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.smoothScroll.bind(this));
        });

        // Form Submission Handler
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Portfolio Filtering
        document.querySelectorAll('.portfolio-filter-btn').forEach(button => {
            button.addEventListener('click', this.filterPortfolioItems.bind(this));
        });
    }

    smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        // Add logic to handle form data, e.g., using Fetch API to send data
        console.log('Form Submitted');
        this.displayAlert('Thank you for your message!', 'success');
    }

    filterPortfolioItems(event) {
        const category = event.currentTarget.dataset.category;
        const allPortfolioItems = document.querySelectorAll('.portfolio-item');
        allPortfolioItems.forEach(item => {
            item.style.display = item.dataset.category === category || category === 'all' ? 'block' : 'none';
        });
    }

    displayAlert(message, type) {
        // Logic to display alert/notification on the page
        console.log(`Alert: ${message} - Type: ${type}`);
    }

    initIntersectionObserver() {
        // Fade-in animation using Intersection Observer
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.fade-in-section').forEach(section => {
            observer.observe(section);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new WebsiteInteractivity());
