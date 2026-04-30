// 1. Efek Navbar Muncul Bayangan Saat Di-scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// 2. Nav Icons - Pastikan icon bisa diklik
const navIcons = document.querySelectorAll('.nav-icons a');
navIcons.forEach(icon => {
    icon.style.pointerEvents = 'auto';
    icon.style.cursor = 'pointer';
    
    // Debug: cek apakah icon bisa diklik
    icon.addEventListener('click', function(e) {
        console.log('Icon clicked:', this.textContent);
    });
});

// 3. Interaksi Tambah ke Keranjang (Cart)
let cartCount = 0;
// Mengambil elemen tombol Cart di navbar (elemen a ketiga di dalam nav-icons)
const cartDisplay = document.querySelectorAll('.nav-icons a')[2]; 
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('click', () => {
        cartCount++;
        if(cartDisplay) {
            cartDisplay.textContent = `Cart (${cartCount})`;
        }
        
        // Opsional: Pesan pop-up kecil
        alert('Item telah ditambahkan ke keranjang eleganmu.');
    });
});

// 4. Animasi Muncul Perlahan (Fade-in) saat halaman digulir
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15, // Animasi dimulai saat 15% elemen terlihat di layar
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // Hentikan observasi setelah elemen muncul
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// 5. UPDATE: Fitur Mega Menu (Mendukung Klik untuk Mobile & Hover untuk Desktop)
const megaMenuTriggers = document.querySelectorAll('.has-mega-menu');
const navOverlay = document.querySelector('.nav-overlay');

megaMenuTriggers.forEach(trigger => {
    const currentMegaMenu = trigger.querySelector('.mega-menu');
    const menuLink = trigger.querySelector('a'); // Ambil link utama (misal: SHOP)

    if(currentMegaMenu) {
        // Interaksi Desktop (Hover)
        trigger.addEventListener('mouseenter', () => {
            if(window.innerWidth > 900) {
                currentMegaMenu.classList.add('show');
                navOverlay.classList.add('show');
            }
        });

        trigger.addEventListener('mouseleave', () => {
            if(window.innerWidth > 900) {
                currentMegaMenu.classList.remove('show');
                navOverlay.classList.remove('show');
            }
        });

        // Interaksi Mobile (Klik)
        if(menuLink) {
            menuLink.addEventListener('click', (e) => {
                if(window.innerWidth <= 900) {
                    e.preventDefault(); // Mencegah link pindah halaman langsung di klik pertama
                    
                    // Tutup menu lain yang sedang terbuka
                    document.querySelectorAll('.mega-menu.show').forEach(menu => {
                        if (menu !== currentMegaMenu) {
                            menu.classList.remove('show');
                        }
                    });

                    currentMegaMenu.classList.toggle('show');
                    
                    if (currentMegaMenu.classList.contains('show')) {
                        navOverlay.classList.add('show');
                    } else {
                        navOverlay.classList.remove('show');
                    }
                }
            });
        }
    }
});

// Tambahan: Tutup Mega Menu saat bagian overlay gelap diklik di HP
if(navOverlay) {
    navOverlay.addEventListener('click', () => {
        document.querySelectorAll('.mega-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
        navOverlay.classList.remove('show');
    });
}
// 6. Fitur Buka/Tutup Sidebar Filter di halaman All Products
const filterHeaders = document.querySelectorAll('.filter-header');

filterHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const filterOptions = header.nextElementSibling;
        const toggleIcon = header.querySelector('.toggle-icon');
        
        if(filterOptions) {
            filterOptions.classList.toggle('collapsed');
            
            if (filterOptions.classList.contains('collapsed')) {
                toggleIcon.textContent = '+';
            } else {
                toggleIcon.textContent = '-';
            }
        }
    });
});

// --- FITUR SPLIT SCREEN HOVER EXPAND (Collection Page) ---
const leftPanel = document.querySelector('.dark-panel');
const rightPanel = document.querySelector('.light-panel');

if(leftPanel && rightPanel) {
    // Jika panel kiri di-hover
    leftPanel.addEventListener('mouseenter', () => {
        leftPanel.style.flex = '1.3'; // Panel kiri membesar
        rightPanel.style.flex = '0.7'; // Panel kanan mengecil
    });
    
    leftPanel.addEventListener('mouseleave', () => {
        leftPanel.style.flex = '1'; // Kembali ke ukuran 50:50
        rightPanel.style.flex = '1';
    });

    // Jika panel kanan di-hover
    rightPanel.addEventListener('mouseenter', () => {
        rightPanel.style.flex = '1.3'; // Panel kanan membesar
        leftPanel.style.flex = '0.7'; // Panel kiri mengecil
    });
    
    rightPanel.addEventListener('mouseleave', () => {
        rightPanel.style.flex = '1'; // Kembali ke ukuran 50:50
        leftPanel.style.flex = '1';
    });
}

// --- INTERAKSI HALAMAN FLAGSHIP (SCENT TEST) ---

// 1. Interaksi Tombol Bahasa
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedLanguage = this.textContent;
        // Memberikan efek klik visual sebentar
        this.style.backgroundColor = 'white';
        this.style.color = '#111';
        
        setTimeout(() => {
            alert(`Preparing Signature Scent Test in ${selectedLanguage}...`);
            // Mengembalikan warna tombol setelah diklik
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            this.style.color = 'white';
        }, 300);
    });
});

// 2. Interaksi Klik pada Kartu Vibe
const vibeCards = document.querySelectorAll('.vibe-card');

vibeCards.forEach(card => {
    card.addEventListener('click', function() {
        const moodTitle = this.querySelector('h3').innerText.replace('\n', ' ');
        alert(`You selected the "${moodTitle}" mood. We will match a scent for this aura.`);
    });
});

// --- INTERAKSI FOOTER SUBSCRIBE ---
const subscribeForm = document.getElementById('subscribe-form');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        // Mencegah halaman me-refresh secara default
        e.preventDefault(); 
        
        // Mengambil isi email yang diketik pengunjung
        const emailInput = this.querySelector('input[type="email"]').value;
        
        if (emailInput) {
            // Memunculkan pesan sukses
            alert(`Thank you! ${emailInput} has been subscribed to TheNote's exclusive newsletter.`);
            
            // Mengosongkan kolom input setelah berhasil
            this.reset();
        }
    });
}
// --- FITUR PENCARIAN (SEARCH OVERLAY & FILTER) ---

// Mengambil elemen tombol "Search" di Navbar (Elemen <a> pertama di dalam nav-icons)
const searchBtn = document.querySelectorAll('.nav-icons a')[0]; 
const searchOverlay = document.getElementById('search-overlay');
const closeSearch = document.getElementById('close-search');
const searchInput = document.getElementById('search-input');
const searchSubmit = document.getElementById('search-submit');

if (searchBtn && searchOverlay) {
    // Membuka Kotak Pencarian saat klik "Search"
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        searchOverlay.classList.add('active');
        searchInput.focus(); // Kursor langsung aktif di kotak ketik
    });

    // Menutup Kotak Pencarian saat klik tanda 'X'
    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    // FUNGSI UTAMA: Mengeksekusi Pencarian
    const executeSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query) {
            // Mengecek apakah pengunjung sedang berada di halaman All Products / Chapter
            const isProductPage = window.location.pathname.includes('all-products.html') || window.location.pathname.includes('chapter');
            
            if (isProductPage) {
                // Jika sedang di halaman produk, langsung lakukan Filter
                const products = document.querySelectorAll('.product-card');
                let found = false;
                
                products.forEach(card => {
                    // Cek nama produk (jika ada class .item-name atau .product-name)
                    const titleEl = card.querySelector('.item-name') || card.querySelector('.product-name');
                    const productName = titleEl ? titleEl.textContent.toLowerCase() : '';
                    
                    // Sembunyikan elemen promo banner
                    if (card.classList.contains('promo-banner')) {
                        card.style.display = 'none';
                        return;
                    }

                    if (productName.includes(query)) {
                        card.style.display = 'block'; // Tampilkan jika cocok
                        found = true;
                    } else {
                        card.style.display = 'none'; // Sembunyikan jika tidak cocok
                    }
                });
                
                searchOverlay.classList.remove('active'); // Tutup layar search
                
                if(!found) {
                    alert(`Varian parfum "${query}" belum tersedia di TheNote.`);
                }
            } else {
                // Jika sedang di halaman Beranda/Lainnya, arahkan pindah ke all-products.html dan bawa teks pencariannya di URL
                window.location.href = `all-products.html?search=${query}`;
            }
        }
    };

    // Tombol Cari Diklik
    searchSubmit.addEventListener('click', executeSearch);

    // Tombol Enter di Keyboard Ditekan
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    });
}

// --- MENANGKAP PENCARIAN DARI URL (Jika pengunjung dialihkan dari halaman Beranda) ---
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(card => {
            const titleEl = card.querySelector('.item-name') || card.querySelector('.product-name');
            const productName = titleEl ? titleEl.textContent.toLowerCase() : '';
            
            if (card.classList.contains('promo-banner')) {
                card.style.display = 'none';
                return;
            }

            if (productName.includes(searchQuery.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Gulir layar ke bagian produk setelah dimuat
        const shopContent = document.querySelector('.shop-content') || document.querySelector('.products-grid');
        if(shopContent) {
            shopContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
