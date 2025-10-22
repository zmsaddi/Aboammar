import sys
sys.stdout.reconfigure(encoding='utf-8')

js_content = '''// ===================================
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

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
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
        `مرحباً، أنا مهتم بالمنتج:\\n` +
        `الاسم: ${product.nameAr}\\n` +
        `الكود: ${product.code}\\n` +
        `الشركة: ${product.company.toUpperCase()}`
    );

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
                <a href="https://wa.me/201032637495?text=${whatsappMessage}"
                   target="_blank"
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
// PDF CATALOG GENERATION
// ===================================
async function downloadCatalogPDF() {
    try {
        showToast('جاري إنشاء الكتالوج...', 'info');

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        // Add custom font for Arabic (using built-in fonts)
        doc.setFont('helvetica');

        // Header
        doc.setFontSize(24);
        doc.setTextColor(212, 175, 55);
        doc.text('ABO AMMAR PERFUMES', 105, 20, { align: 'center' });

        doc.setFontSize(16);
        doc.setTextColor(100);
        doc.text('Product Catalog', 105, 30, { align: 'center' });

        // Date
        doc.setFontSize(10);
        doc.setTextColor(150);
        const today = new Date().toLocaleDateString('ar-EG');
        doc.text(`Date: ${today}`, 105, 38, { align: 'center' });

        // Table data
        const tableData = filteredProducts.map(product => [
            product.code,
            product.company.toUpperCase(),
            product.nameEn,
            product.nameAr
        ]);

        // Add table
        doc.autoTable({
            startY: 45,
            head: [['Code', 'Company', 'English Name', 'Arabic Name']],
            body: tableData,
            styles: {
                font: 'helvetica',
                fontSize: 9,
                cellPadding: 3,
                lineColor: [212, 175, 55],
                lineWidth: 0.1
            },
            headStyles: {
                fillColor: [212, 175, 55],
                textColor: [0, 0, 0],
                fontStyle: 'bold',
                fontSize: 10
            },
            alternateRowStyles: {
                fillColor: [250, 250, 250]
            },
            margin: { top: 45, left: 10, right: 10 }
        });

        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(
                `Page ${i} of ${pageCount}`,
                105,
                doc.internal.pageSize.height - 10,
                { align: 'center' }
            );
            doc.text(
                'WhatsApp: +20 103 263 7495',
                105,
                doc.internal.pageSize.height - 5,
                { align: 'center' }
            );
        }

        // Save PDF
        const filename = `AboAmmar_Catalog_${new Date().getTime()}.pdf`;
        doc.save(filename);

        showToast('تم تحميل الكتالوج بنجاح ✓', 'success');

        // Analytics
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
'''

with open('script.js', 'w', encoding='utf-8-sig') as f:
    f.write(js_content)

print('Professional JavaScript created successfully')
