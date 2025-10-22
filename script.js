// ===================================
// ABO AMMAR PERFUMES - PROFESSIONAL UX
// Modern, Fast, User-Friendly
// ===================================

// Global State
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 24;
let isLoading = false;

// DOM Elements
const searchInput = document.getElementById('search');
const companyFilter = document.getElementById('company-filter');
const productsGrid = document.getElementById('products-grid');
const productCount = document.getElementById('product-count');
const loading = document.getElementById('loading');
const noResults = document.getElementById('no-results');

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    console.log('🚀 Initializing ABO AMMAR Perfumes...');

    // Load products
    await loadProducts();

    // Setup event listeners
    setupEventListeners();

    // Initialize UI
    initializeUI();

    // Add scroll animations
    observeElements();

    console.log('✅ App initialized successfully');
}

// ===================================
// LOAD PRODUCTS
// ===================================
async function loadProducts() {
    try {
        showLoading(true);

        // Simulate async loading for better UX
        await new Promise(resolve => setTimeout(resolve, 300));

        if (typeof productsData === 'undefined') {
            throw new Error('Products data not found');
        }

        allProducts = productsData;
        filteredProducts = [...allProducts];

        console.log(`📦 Loaded ${allProducts.length} products`);

        // Populate company filter
        populateCompanyFilter();

        // Display products
        displayProducts();

        showLoading(false);
    } catch (error) {
        console.error('❌ Error loading products:', error);
        showToast('حدث خطأ في تحميل المنتجات', 'error');
        showLoading(false);
    }
}

// ===================================
// COMPANY FILTER POPULATION
// ===================================
function populateCompanyFilter() {
    const companies = [...new Set(allProducts.map(p => p.company))].sort();

    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company.toUpperCase();
        companyFilter.appendChild(option);
    });

    console.log(`🏢 Found ${companies.length} companies`);
}

// ===================================
// EVENT LISTENERS
// ===================================
function setupEventListeners() {
    // Search input with debounce
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => handleSearch(e), 300);

        // Show loading indicator
        if (e.target.value.length > 0) {
            searchInput.style.borderColor = 'var(--gold-primary)';
        }
    });

    // Company filter
    companyFilter.addEventListener('change', handleFilter);

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('.header');

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');

            // Toggle icon
            if (nav.classList.contains('active')) {
                menuToggle.innerHTML = '✕';
            } else {
                menuToggle.innerHTML = '☰';
            }
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.innerHTML = '☰';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    }

    // Intersection observer for animations
    observeElements();
}

// ===================================
// SEARCH HANDLER
// ===================================
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const selectedCompany = companyFilter.value;

    filteredProducts = allProducts.filter(product => {
        const matchesSearch = searchTerm === '' ||
            product.nameAr.toLowerCase().includes(searchTerm) ||
            product.nameEn.toLowerCase().includes(searchTerm) ||
            product.code.toLowerCase().includes(searchTerm);

        const matchesCompany = selectedCompany === '' || product.company === selectedCompany;

        return matchesSearch && matchesCompany;
    });

    currentPage = 1;
    displayProducts();

    // Analytics
    if (searchTerm.length > 0) {
        console.log(`🔍 Search: "${searchTerm}" - Found ${filteredProducts.length} products`);
    }
}

// ===================================
// FILTER HANDLER
// ===================================
function handleFilter() {
    handleSearch({ target: searchInput });
}

// ===================================
// DISPLAY PRODUCTS WITH LAZY LOADING
// ===================================
function displayProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    // Update count
    updateProductCount();

    // Clear grid
    productsGrid.innerHTML = '';

    // Show/hide no results
    if (filteredProducts.length === 0) {
        noResults.style.display = 'block';
        productsGrid.style.display = 'none';
        return;
    } else {
        noResults.style.display = 'none';
        productsGrid.style.display = 'grid';
    }

    // Add products with stagger animation
    productsToShow.forEach((product, index) => {
        const card = createProductCard(product);
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        productsGrid.appendChild(card);

        // Stagger animation
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 30);
    });

    // Lazy load more on scroll
    setupInfiniteScroll();
}

// ===================================
// CREATE PRODUCT CARD
// ===================================
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const whatsappMessage = encodeURIComponent(
        `مرحباً، أنا مهتم بالمنتج:\n` +
        `الاسم بالعربي: ${product.nameAr}\n` +
        `English Name: ${product.nameEn}\n` +
        `الكود: ${product.code}\n` +
        `الشركة: ${product.company.toUpperCase()}`
    );

    // Universal WhatsApp link that works on all platforms
    const whatsappLink = `https://api.whatsapp.com/send?phone=201032637495&text=${whatsappMessage}`;

    card.innerHTML = `
        <div class="product-card-content">
            <div class="product-header">
                <span class="product-code">${escapeHtml(product.code)}</span>
                <span class="product-company">${escapeHtml(product.company.toUpperCase())}</span>
            </div>

            <div class="product-names">
                <h3 class="product-name-ar">${escapeHtml(product.nameAr)}</h3>
                <p class="product-name-en">${escapeHtml(product.nameEn)}</p>
            </div>

            <div class="product-actions">
                <a href="${whatsappLink}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="whatsapp-btn"
                   onclick="trackWhatsAppClick('${escapeHtml(product.code)}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.553 4.105 1.521 5.834L0 24l6.315-1.521C8.115 23.447 10.027 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.947 17.219c-.27.758-1.588 1.399-2.197 1.458-.563.055-1.086.262-3.666-.764-3.129-1.244-5.137-4.447-5.293-4.652-.152-.205-1.277-1.7-1.277-3.244 0-1.543.809-2.301 1.096-2.615.287-.314.627-.393.836-.393.209 0 .418.002.602.011.193.009.451-.073.705.537.263.627.896 2.184.975 2.342.078.158.131.342.026.547-.105.205-.158.334-.313.514-.157.18-.33.402-.471.539-.157.151-.32.314-.138.615.182.301.811 1.336 1.74 2.164 1.195 1.066 2.201 1.396 2.514 1.553.314.158.496.131.678-.078.184-.209.785-.916 1-1.23.209-.314.42-.262.705-.158.287.105 1.82.858 2.133 1.014.314.157.523.236.602.365.078.131.078.758-.191 1.516z"/>
                    </svg>
                    استفسر عبر واتساب
                </a>
            </div>
        </div>
    `;

    return card;
}

// ===================================
// INFINITE SCROLL
// ===================================
function setupInfiniteScroll() {
    // Remove old observer
    if (window.scrollObserver) {
        window.scrollObserver.disconnect();
    }

    const lastCard = productsGrid.lastElementChild;
    if (!lastCard) return;

    window.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isLoading) {
                loadMoreProducts();
            }
        });
    }, { rootMargin: '100px' });

    window.scrollObserver.observe(lastCard);
}

function loadMoreProducts() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if (currentPage >= totalPages) return;

    isLoading = true;
    currentPage++;

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const newProducts = filteredProducts.slice(startIndex, endIndex);

    newProducts.forEach((product, index) => {
        const card = createProductCard(product);
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        productsGrid.appendChild(card);

        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 30);
    });

    isLoading = false;
    setupInfiniteScroll();
}

// ===================================
// UPDATE PRODUCT COUNT
// ===================================
function updateProductCount() {
    const count = filteredProducts.length;
    const text = count === 1 ? 'منتج واحد' : count === 2 ? 'منتجان' : `${count} منتج`;
    productCount.textContent = text;

    // Animate count
    productCount.style.transform = 'scale(1.1)';
    setTimeout(() => {
        productCount.style.transform = 'scale(1)';
    }, 200);
}

// ===================================
// PDF CATALOG GENERATION WITH ARABIC SUPPORT
// ===================================
async function downloadCatalogPDF() {
    try {
        showToast('جاري إنشاء الكتالوج...', 'info');

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        // Add Arabic font support if available
        if (typeof doc.addFont === 'function' && window.jsPDFArabic) {
            doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
            doc.setFont('Amiri');
        }

        let yPos = 20;
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        const margin = 15;
        const lineHeight = 7;

        // Title
        doc.setFontSize(20);
        doc.setTextColor(212, 175, 55);
        doc.text('ABO AMMAR PERFUMES', pageWidth / 2, yPos, { align: 'center' });
        yPos += 10;

        // Subtitle
        doc.setFontSize(14);
        doc.setTextColor(100);
        doc.text('Product Catalog - كتالوج المنتجات', pageWidth / 2, yPos, { align: 'center' });
        yPos += 10;

        // Contact Info Box
        doc.setFillColor(212, 175, 55);
        doc.rect(margin, yPos, pageWidth - (margin * 2), 25, 'F');

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        yPos += 7;
        doc.text('Contact Information - معلومات التواصل', pageWidth / 2, yPos, { align: 'center' });
        yPos += 6;
        doc.text('WhatsApp: +20 103 263 7495', pageWidth / 2, yPos, { align: 'center' });
        yPos += 5;
        doc.text('Available 24/7 - متاح على مدار الساعة', pageWidth / 2, yPos, { align: 'center' });
        yPos += 5;
        doc.text('100% Original Products - منتجات أصلية', pageWidth / 2, yPos, { align: 'center' });
        yPos += 12;

        // Date and count
        doc.setTextColor(100);
        doc.setFontSize(9);
        doc.text(`Date: ${new Date().toLocaleDateString('en-US')}`, margin, yPos);
        doc.text(`Total: ${filteredProducts.length} products`, pageWidth - margin, yPos, { align: 'right' });
        yPos += 10;

        // Table header
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos - 5, pageWidth - (margin * 2), 8, 'F');

        doc.setFontSize(9);
        doc.setTextColor(0);
        doc.setFont('helvetica', 'bold');

        const col1 = margin + 5;
        const col2 = margin + 35;
        const col3 = margin + 60;
        const col4 = margin + 120;

        doc.text('Code', col1, yPos);
        doc.text('Company', col2, yPos);
        doc.text('English Name', col3, yPos);
        doc.text('Arabic', col4, yPos);

        yPos += 8;
        doc.setFont('helvetica', 'normal');

        // Products
        filteredProducts.forEach((product, index) => {
            // Check if we need a new page
            if (yPos > pageHeight - 30) {
                doc.addPage();
                yPos = 20;

                // Repeat header on new page
                doc.setFillColor(240, 240, 240);
                doc.rect(margin, yPos - 5, pageWidth - (margin * 2), 8, 'F');
                doc.setFont('helvetica', 'bold');
                doc.text('Code', col1, yPos);
                doc.text('Company', col2, yPos);
                doc.text('English Name', col3, yPos);
                doc.text('Arabic', col4, yPos);
                yPos += 8;
                doc.setFont('helvetica', 'normal');
            }

            // Alternating row colors
            if (index % 2 === 0) {
                doc.setFillColor(250, 250, 250);
                doc.rect(margin, yPos - 5, pageWidth - (margin * 2), lineHeight, 'F');
            }

            doc.setFontSize(8);
            doc.setTextColor(0);

            // Truncate long names if needed
            const maxWidth = 55;
            let nameEn = product.nameEn;
            if (doc.getTextWidth(nameEn) > maxWidth) {
                while (doc.getTextWidth(nameEn + '...') > maxWidth && nameEn.length > 3) {
                    nameEn = nameEn.substring(0, nameEn.length - 1);
                }
                nameEn += '...';
            }

            doc.text(product.code, col1, yPos);
            doc.text(product.company.toUpperCase(), col2, yPos);
            doc.text(nameEn, col3, yPos);
            // Arabic name (will show as boxes in PDF, but at least structure is there)
            doc.text(product.nameAr.substring(0, 30), col4, yPos);

            yPos += lineHeight;
        });

        // Footer on last page
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(
                `Page ${i} of ${totalPages}`,
                pageWidth / 2,
                pageHeight - 10,
                { align: 'center' }
            );
            doc.text(
                'ABO AMMAR PERFUMES',
                pageWidth / 2,
                pageHeight - 5,
                { align: 'center' }
            );
        }

        // Save
        const filename = `AboAmmar_Catalog_${new Date().getTime()}.pdf`;
        doc.save(filename);

        showToast('تم تحميل الكتالوج بنجاح ✓', 'success');
        console.log(`📄 PDF Downloaded: ${filteredProducts.length} products`);

    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        showToast('حدث خطأ في إنشاء الكتالوج', 'error');
    }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function showLoading(show) {
    if (show) {
        loading.style.display = 'block';
        productsGrid.style.display = 'none';
    } else {
        loading.style.display = 'none';
        productsGrid.style.display = 'grid';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Hide toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function trackWhatsAppClick(productCode) {
    console.log(`📱 WhatsApp clicked for product: ${productCode}`);
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ===================================
// INITIALIZE UI ENHANCEMENTS
// ===================================
function initializeUI() {
    // Add reset filters button
    const filtersWrapper = document.querySelector('.filters-wrapper');
    if (filtersWrapper && !document.querySelector('.reset-btn')) {
        const resetBtn = document.createElement('button');
        resetBtn.className = 'reset-btn';
        resetBtn.textContent = 'إعادة تعيين';
        resetBtn.onclick = resetFilters;

        const filterStats = document.querySelector('.filter-stats');
        if (filterStats) {
            filterStats.appendChild(resetBtn);
        }
    }
}

function resetFilters() {
    searchInput.value = '';
    companyFilter.value = '';
    filteredProducts = [...allProducts];
    currentPage = 1;
    displayProducts();
    showToast('تم إعادة تعيين الفلاتر', 'info');
}

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Preload critical resources
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

console.log('🎨 ABO AMMAR Perfumes - Professional Edition Loaded');
