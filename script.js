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
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (menuToggle && nav && mobileOverlay) {
        // Toggle menu function
        const toggleMenu = (show) => {
            if (show) {
                nav.classList.add('active');
                menuToggle.classList.add('active');
                mobileOverlay.classList.add('active');
                menuToggle.innerHTML = '✕';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                menuToggle.innerHTML = '☰';
                document.body.style.overflow = ''; // Restore scrolling
            }
        };

        // Menu toggle button click
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isActive = nav.classList.contains('active');
            toggleMenu(!isActive);
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        // Close menu when clicking overlay
        mobileOverlay.addEventListener('click', () => {
            toggleMenu(false);
        });

        // Close menu when clicking outside (for good measure)
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') &&
                !nav.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                toggleMenu(false);
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
// Using HTML2Canvas for proper Arabic rendering
// ===================================
async function downloadCatalogPDF() {
    try {
        showToast('جاري إنشاء الكتالوج... هذا قد يستغرق دقيقة', 'info');

        // Create a temporary container for PDF content
        const pdfContainer = document.createElement('div');
        pdfContainer.style.cssText = `
            position: absolute;
            left: -9999px;
            width: 800px;
            background: white;
            padding: 40px;
            font-family: 'Cairo', sans-serif;
            direction: rtl;
        `;

        // Build HTML content with proper Arabic fonts
        let htmlContent = `
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #D4AF37; font-size: 32px; margin: 0;">عطور أبو عمار</h1>
                <h2 style="color: #666; font-size: 24px; margin: 10px 0;">ABO AMMAR PERFUMES</h2>
                <div style="background: #D4AF37; padding: 20px; margin: 20px 0; border-radius: 8px;">
                    <h3 style="margin: 5px 0; color: #000;">معلومات التواصل - Contact Information</h3>
                    <p style="margin: 5px 0; color: #000; font-size: 16px;"><strong>WhatsApp:</strong> +20 103 263 7495</p>
                    <p style="margin: 5px 0; color: #000;">متاح على مدار الساعة - Available 24/7</p>
                    <p style="margin: 5px 0; color: #000;">جميع المنتجات أصلية 100% - All Products 100% Original</p>
                </div>
                <p style="color: #666; margin: 10px 0;">
                    التاريخ: ${new Date().toLocaleDateString('ar-EG')} |
                    عدد المنتجات: ${filteredProducts.length}
                </p>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                <thead>
                    <tr style="background: #f0f0f0;">
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">الكود</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">الشركة</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">الاسم بالعربي</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">English Name</th>
                    </tr>
                </thead>
                <tbody>
        `;

        filteredProducts.forEach((product, index) => {
            const bgColor = index % 2 === 0 ? '#fafafa' : 'white';
            htmlContent += `
                <tr style="background: ${bgColor};">
                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${product.code}</td>
                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${product.company.toUpperCase()}</td>
                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${product.nameAr}</td>
                    <td style="border: 1px solid #ddd; padding: 6px; text-align: left; direction: ltr;">${product.nameEn}</td>
                </tr>
            `;
        });

        htmlContent += `
                </tbody>
            </table>
            <div style="text-align: center; margin-top: 30px; color: #666;">
                <p>ABO AMMAR PERFUMES - عطور أبو عمار</p>
                <p>WhatsApp: +20 103 263 7495</p>
            </div>
        `;

        pdfContainer.innerHTML = htmlContent;
        document.body.appendChild(pdfContainer);

        // Use html2canvas to render the content
        const canvas = await html2canvas(pdfContainer, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        // Remove temporary container
        document.body.removeChild(pdfContainer);

        // Create PDF from canvas
        const { jsPDF } = window.jspdf;
        const imgData = canvas.toDataURL('image/png');

        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pageHeight = 297; // A4 height in mm

        const doc = new jsPDF('p', 'mm', 'a4');
        let heightLeft = imgHeight;
        let position = 0;

        // Add image to PDF, splitting into pages if needed
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save PDF
        const filename = `AboAmmar_Catalog_${new Date().getTime()}.pdf`;
        doc.save(filename);

        showToast('تم تحميل الكتالوج بنجاح ✓', 'success');
        console.log(`📄 PDF Downloaded: ${filteredProducts.length} products with Arabic support`);

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
