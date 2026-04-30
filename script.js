document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DYNAMIC MOBILE MENU (HAMBURGER & ACCORDION) ---
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');
    
    // A. Bikin Tombol Hamburger secara otomatis
    const hamburgerBtn = document.createElement('div');
    hamburgerBtn.classList.add('hamburger');
    hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';
    navbar.insertBefore(hamburgerBtn, logo); // Letakkan sebelum Logo

    // B. Bikin menu 'Log in / Create account' di bagian bawah list menu
    const mobileAccountDiv = document.createElement('div');
    mobileAccountDiv.classList.add('mobile-account');
    mobileAccountDiv.innerHTML = `
        <a href="#">Log in</a>
        <a href="#">Create account</a>
    `;
    navLinks.appendChild(mobileAccountDiv);

    // C. Setup Menu Accordion (Mega Menu)
    const megaMenuTriggers = document.querySelectorAll('.has-mega-menu');
    const navOverlay = document.querySelector('.nav-overlay');

    megaMenuTriggers.forEach(trigger => {
        const link = trigger.querySelector('a');
        const megaMenu = trigger.querySelector('.mega-menu');

        // Tambahkan ikon panah (Chevron 'v')
        const chevron = document.createElement('span');
        chevron.classList.add('chevron-icon');
        chevron.innerHTML = '&#709;'; 
        link.appendChild(chevron);

        // Interaksi Klik Khusus Layar HP (Mobile)
        link.addEventListener('click', (e) => {
            if(window.innerWidth <= 900) {
                e.preventDefault(); 

                // Tutup menu lain yang sedang terbuka (opsional)
                megaMenuTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== trigger) {
                        otherTrigger.querySelector('.mega-menu').classList.remove('show-mobile');
                        otherTrigger.querySelector('.chevron-icon').style.transform = 'rotate(0deg)';
                    }
                });

                // Buka/tutup menu yang sedang diklik
                megaMenu.classList.toggle('show-mobile');
                
                // Putar panah
                if(megaMenu.classList.contains('show-mobile')) {
                    chevron.style.transform = 'rotate(180deg)';
                } else {
                    chevron.style.transform = 'rotate(0deg)';
                }
            }
        });

        // Interaksi Hover Khusus Layar Laptop (Desktop)
        trigger.addEventListener('mouseenter', () => {
            if(window.innerWidth > 900 && megaMenu) {
                megaMenu.classList.add('show');
                if(navOverlay) navOverlay.classList.add('show');
            }
        });

        trigger.addEventListener('mouseleave', () => {
            if(window.innerWidth > 900 && megaMenu) {
                megaMenu.classList.remove('show');
                if(navOverlay) navOverlay.classList.remove('show');
            }
        });
    });

    // D. Fungsi Buka/Tutup Layar Menu Penuh
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
        
        // Kunci layar belakang agar tidak bisa di-scroll saat menu terbuka
        if(navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });


    // --- 2. FITUR LAINNYA (TETAP DIPERTAHANKAN) ---

    // Navbar Scrolled Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

   // Cart Pop-up (Responsive untuk Teks Desktop & Icon Mobile)
    let cartCount = 0;
    const productCards = document.querySelectorAll('.product-card, .add-to-bag-btn');

    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Mencegah link pindah halaman jika nge-klik tombol
            if(e.target.closest('.add-to-bag-btn')) {
                e.preventDefault();
            }
            
            cartCount++;
            
            // 1. Update teks untuk Desktop
            const cartText = document.querySelector('.cart-btn .nav-text');
            if(cartText) cartText.textContent = `Cart (${cartCount})`;
            
            // 2. Update badge angka untuk Mobile
            const cartBadge = document.querySelector('.cart-badge');
            if(cartBadge) cartBadge.textContent = cartCount;
            
            alert('Item telah ditambahkan ke keranjang eleganmu.');
        });
    });

    // Fade-in Animation
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));

    // Shop Sidebar Filter Toggle
    const filterHeaders = document.querySelectorAll('.filter-header');
    filterHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const filterOptions = header.nextElementSibling;
            const toggleIcon = header.querySelector('.toggle-icon');
            if(filterOptions) {
                filterOptions.classList.toggle('collapsed');
                toggleIcon.textContent = filterOptions.classList.contains('collapsed') ? '+' : '-';
            }
        });
    });

    // Split Screen Hover Effect
    const leftPanel = document.querySelector('.dark-panel');
    const rightPanel = document.querySelector('.light-panel');
    if(leftPanel && rightPanel) {
        leftPanel.addEventListener('mouseenter', () => { leftPanel.style.flex = '1.3'; rightPanel.style.flex = '0.7'; });
        leftPanel.addEventListener('mouseleave', () => { leftPanel.style.flex = '1'; rightPanel.style.flex = '1'; });
        rightPanel.addEventListener('mouseenter', () => { rightPanel.style.flex = '1.3'; leftPanel.style.flex = '0.7'; });
        rightPanel.addEventListener('mouseleave', () => { rightPanel.style.flex = '1'; leftPanel.style.flex = '1'; });
    }

    // Flagship Scent Test Interactivity
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function() {
            const selectedLanguage = this.textContent;
            this.style.backgroundColor = 'white';
            this.style.color = '#111';
            setTimeout(() => {
                alert(`Preparing Signature Scent Test in ${selectedLanguage}...`);
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                this.style.color = 'white';
            }, 300);
        });
    });

    document.querySelectorAll('.vibe-card').forEach(card => {
        card.addEventListener('click', function() {
            const moodTitle = this.querySelector('h3').innerText.replace('\n', ' ');
            alert(`You selected the "${moodTitle}" mood. We will match a scent for this aura.`);
        });
    });

    // Footer Subscribe
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const emailInput = this.querySelector('input[type="email"]').value;
            if (emailInput) {
                alert(`Thank you! ${emailInput} has been subscribed to TheNote's exclusive newsletter.`);
                this.reset();
            }
        });
    }

    // Search Overlay
    const searchBtn = document.querySelectorAll('.nav-icons a')[0]; 
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');

    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            searchOverlay.classList.add('active');
            setTimeout(() => searchInput.focus(), 100); 
        });

        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });

        const executeSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            if (query) {
                const isProductPage = window.location.pathname.includes('all-products.html') || window.location.pathname.includes('chapter');
                if (isProductPage) {
                    const products = document.querySelectorAll('.product-card');
                    let found = false;
                    products.forEach(card => {
                        const titleEl = card.querySelector('.item-name') || card.querySelector('.product-name');
                        const productName = titleEl ? titleEl.textContent.toLowerCase() : '';
                        if (card.classList.contains('promo-banner')) {
                            card.style.display = 'none';
                            return;
                        }
                        if (productName.includes(query)) {
                            card.style.display = 'block'; found = true;
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    searchOverlay.classList.remove('active'); 
                    if(!found) alert(`Varian parfum "${query}" belum tersedia di TheNote.`);
                } else {
                    window.location.href = `all-products.html?search=${query}`;
                }
            }
        };

        searchSubmit.addEventListener('click', executeSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') executeSearch();
        });
    }

    // Tangkap Search dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(card => {
            const titleEl = card.querySelector('.item-name') || card.querySelector('.product-name');
            const productName = titleEl ? titleEl.textContent.toLowerCase() : '';
            if (card.classList.contains('promo-banner')) { card.style.display = 'none'; return; }
            if (productName.includes(searchQuery.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        const shopContent = document.querySelector('.shop-content') || document.querySelector('.products-grid');
        if(shopContent) shopContent.scrollIntoView({ behavior: 'smooth' });
    }
});
