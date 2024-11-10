// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
});

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAky_HPejDy9TyhSvv6XEGjHN_vlPti8pw",
    authDomain: "cascavel-dd0b9.firebaseapp.com",
    projectId: "cascavel-dd0b9",
    storageBucket: "cascavel-dd0b9.firebasestorage.app",
    messagingSenderId: "698303624463",
    appId: "1:698303624463:web:fe4bc219037c890ee83a7a",
    measurementId: "G-8H5KJY6TNN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Language toggle
const langToggle = document.getElementById('langToggle');
let currentLang = 'pt';

langToggle.addEventListener('click', () => {
    if (currentLang === 'pt') {
        changeLanguage('en');
        langToggle.textContent = 'PT';
        currentLang = 'en';
    } else {
        changeLanguage('pt');
        langToggle.textContent = 'EN';
        currentLang = 'pt';
    }
});

function changeLanguage(lang) {
    // Implement language change logic here
    console.log(`Changed language to ${lang}`);
    // You would typically load a JSON file with translations and update the text content of elements
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const message = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };

        // Save message to Firebase
        firebase.database().ref('messages').push(message)
            .then(() => {
                showNotification('Mensagem enviada com sucesso!', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
                console.error('Error:', error);
            });
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Portfolio image modal
const portfolioImages = document.querySelectorAll('.portfolio-image');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');

if (portfolioImages.length > 0 && modal && modalImage && closeModal) {
    portfolioImages.forEach(img => {
        img.addEventListener('click', () => {
            modalImage.src = img.src;
            modal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

// Implement lazy loading for images
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Implement smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Implement a simple animation for counters
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate counters when they come into view
const counters = document.querySelectorAll('.counter');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateValue(counter, 0, target, 2000);
            observer.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});

// Initialize Swiper for testimonials
const testimonialsSwiper = new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Initialize Swiper for quotes
const quotesSwiper = new Swiper('.quotes-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Back to Top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
}

// Expandable portfolio section
const expandPortfolioButton = document.getElementById('expandPortfolio');
const portfolioGrid = document.querySelector('#portfolio .grid');

expandPortfolioButton.addEventListener('click', () => {
    portfolioGrid.classList.toggle('expanded');
    expandPortfolioButton.textContent = portfolioGrid.classList.contains('expanded') ? 'Ver Menos' : 'Ver Mais';
});

// Newsletter subscription
const newsletterForm = document.querySelector('footer form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Here you would typically send this to your server or a service like Mailchimp
    console.log(`Subscribed email: ${email}`);
    showNotification('Inscrição realizada com sucesso!', 'success');
    newsletterForm.reset();
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('#services .bg-white');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('hover:shadow-xl', 'transition-shadow', 'duration-300');
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('hover:shadow-xl', 'transition-shadow', 'duration-300');
    });
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

// Add scroll-based animations to sections
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

//************&&&&&&&
// Portfolio Section
const portfolioGrid = document.getElementById('portfolioGrid');
const expandPortfolioBtn = document.getElementById('expandPortfolio');
let portfolioItemsShown = 8;

const portfolioItems = [
    { src: 'art1.png', alt: 'Arte 1' },
    { src: 'art2.png', alt: 'Arte 2' },
    { src: 'art3.png', alt: 'Arte 3' },
    { src: 'art4.png', alt: 'Arte 4' },
    { src: 'art5.png', alt: 'Arte 5' },
    { src: 'art6.png', alt: 'Arte 6' },
    { src: 'art7.png', alt: 'Arte 7' },
    { src: 'art8.png', alt: 'Arte 8' },
    { src: 'art9.png', alt: 'Arte 9' },
    { src: 'art10.png', alt: 'Arte 10' },
    { src: 'art11.png', alt: 'Arte 11' },
    { src: 'art12.png', alt: 'Arte 12' },
    { src: 'art13.png', alt: 'Arte 13' },
    { src: 'art14.png', alt: 'Arte 14' },
];

function createPortfolioItem(item) {
    const div = document.createElement('div');
    div.className = 'relative group';
    div.innerHTML = `
        <img src="${item.src}" alt="${item.alt}" class="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button class="text-white text-xl"><i class="fas fa-heart"></i></button>
        </div>
    `;
    return div;
}

function loadPortfolioItems() {
    for (let i = 0; i < portfolioItemsShown && i < portfolioItems.length; i++) {
        portfolioGrid.appendChild(createPortfolioItem(portfolioItems[i]));
    }
    if (portfolioItemsShown >= portfolioItems.length) {
        expandPortfolioBtn.style.display = 'none';
    }
}

expandPortfolioBtn.addEventListener('click', () => {
    portfolioItemsShown += 4;
    portfolioGrid.innerHTML = '';
    loadPortfolioItems();
});

loadPortfolioItems();

// Design Quotes Section
const quotesSlider = document.querySelector('#design-quotes .swiper-wrapper');
const quotes = [
    { text: "Design não é apenas como algo parece, design é como algo funciona.", author: "Steve Jobs" },
    { text: "Bom design é óbvio. Ótimo design é transparente.", author: "Joe Sparano" },
    { text: "Design é inteligência tornada visível.", author: "Alina Wheeler" },
    // Add 46 more quotes here
];

quotes.forEach(quote => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p class="mb-4 text-lg italic">"${quote.text}"</p>
            <p class="font-semibold">- ${quote.author}</p>
        </div>
    `;
    quotesSlider.appendChild(slide);
});

// Testimonials Section
const testimonialsSlider = document.querySelector('#testimonials .swiper-wrapper');
const testimonials = [
    { text: "A Cascavel Designer superou todas as nossas expectativas. Seu trabalho transformou completamente nossa marca.", name: "João Silva", position: "CEO, Empresa XYZ" },
    { text: "Profissionalismo e criatividade em cada projeto. Recomendo fortemente!", name: "Maria Santos", position: "Diretora de Marketing, ABC Corp" },
    { text: "Resultados impressionantes e atendimento excepcional. Continuaremos trabalhando juntos!", name: "Pedro Oliveira", position: "Fundador, Startup 123" },
    // Add 97 more testimonials here
];

testimonials.forEach(testimonial => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p class="mb-4">"${testimonial.text}"</p>
            <div class="flex items-center">
                <img src="/placeholder.svg?height=48&width=48" alt="${testimonial.name}" class="w-12 h-12 rounded-full mr-4">
                <div>
                    <h4 class="font-semibold">${testimonial.name}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${testimonial.position}</p>
                </div>
            </div>
        </div>
    `;
    testimonialsSlider.appendChild(slide);
});

// Initialize Swiper
new Swiper('.quotes-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Stats Section
const ctx = document.getElementById('projectsChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Projetos Concluídos',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }
});

const satisfactionTable = document.getElementById('satisfactionTable');
const satisfactionData = [
    { month: 'Janeiro', satisfaction: '98%' },
    { month: 'Fevereiro', satisfaction: '97%' },
    { month: 'Março', satisfaction: '99%' },
    { month: 'Abril', satisfaction: '98%' },
    { month: 'Maio', satisfaction: '100%' },
    { month: 'Junho', satisfaction: '99%' },
];

satisfactionData.forEach(data => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="py-2 px-4">${data.month}</td>
        <td class="py-2 px-4">${data.satisfaction}</td>
    `;
    satisfactionTable.appendChild(row);
});
