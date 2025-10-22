/**
 * ABO AMMAR Perfumes - Tabbed Interface Script
 * Mobile-First Responsive JavaScript
 */

// ===================================
// TAB SWITCHING FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all tabs and buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');

            // Scroll to top smoothly when switching tabs
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Initialize products when DOM is ready
    initializeProducts();
});

// ===================================
// PRODUCTS DATA & STATE
// ===================================

let allProducts = [];
let filteredProducts = [];
let displayedProducts = [];
const PRODUCTS_PER_PAGE = 24;

// ===================================
// INITIALIZE PRODUCTS
// ===================================

function initializeProducts() {
    const loadingElement = document.getElementById('loading');
    const productsGrid = document.getElementById('products-grid');
    const noResultsElement = document.getElementById('no-results');

    try {
        // Check if products data is available
        if (typeof productsData === 'undefined') {
            throw new Error('Products data not loaded');
        }

        allProducts = productsData;
        filteredProducts = [...allProducts];

        // Populate company filter
        populateCompanyFilter();

        // Display initial products
        displayProducts();

        // Hide loading
        loadingElement.style.display = 'none';

        // Setup event listeners
        setupEventListeners();

        console.log(`✓ Loaded ${allProducts.length} products`);
    } catch (error) {
        console.error('Error loading products:', error);
        loadingElement.innerHTML = '<p style="color: #d4af37;">خطأ في تحميل المنتجات</p>';
    }
}

// ===================================
// POPULATE COMPANY FILTER
// ===================================

function populateCompanyFilter() {
    const companyFilter = document.getElementById('company-filter');
    const companies = [...new Set(allProducts.map(p => p.company))].sort();

    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company.toUpperCase();
        companyFilter.appendChild(option);
    });
}

// ===================================
// SETUP EVENT LISTENERS
// ===================================

function setupEventListeners() {
    const searchInput = document.getElementById('search');
    const companyFilter = document.getElementById('company-filter');

    // Debounced search
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterProducts();
        }, 300);
    });

    // Company filter
    companyFilter.addEventListener('change', () => {
        filterProducts();
    });
}

// ===================================
// FILTER PRODUCTS
// ===================================

function filterProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase().trim();
    const selectedCompany = document.getElementById('company-filter').value.toLowerCase();

    filteredProducts = allProducts.filter(product => {
        const matchesSearch = !searchTerm ||
            product.nameAr.toLowerCase().includes(searchTerm) ||
            product.nameEn.toLowerCase().includes(searchTerm) ||
            product.code.toLowerCase().includes(searchTerm);

        const matchesCompany = !selectedCompany ||
            product.company.toLowerCase() === selectedCompany;

        return matchesSearch && matchesCompany;
    });

    displayedProducts = [];
    displayProducts();
}

// ===================================
// DISPLAY PRODUCTS
// ===================================

function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    const noResultsElement = document.getElementById('no-results');
    const productCountElement = document.getElementById('product-count');

    // Update count
    productCountElement.textContent = filteredProducts.length.toLocaleString('ar-EG');

    // Show/hide no results
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '';
        noResultsElement.style.display = 'block';
        return;
    }

    noResultsElement.style.display = 'none';

    // Get products to display
    const start = displayedProducts.length;
    const end = start + PRODUCTS_PER_PAGE;
    const productsToAdd = filteredProducts.slice(start, end);

    // Clear grid if starting fresh
    if (start === 0) {
        productsGrid.innerHTML = '';
    }

    // Add products
    productsToAdd.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
        displayedProducts.push(product);
    });
}

// ===================================
// UNIVERSAL WHATSAPP LINK - WORKS ON ALL PLATFORMS & APPS
// ===================================

function getUniversalWhatsAppLink(phone, message) {
    const encodedMessage = encodeURIComponent(message);

    // Use whatsapp:// protocol - opens whatever WhatsApp app is default
    // Falls back to wa.me if no app installed
    // This respects user's choice of default WhatsApp app
    return `whatsapp://send?phone=${phone}&text=${encodedMessage}`;
}

// ===================================
// CREATE PRODUCT CARD
// ===================================

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const whatsappMessage =
        `مرحباً، أنا مهتم بالمنتج:\n` +
        `${product.nameAr}\n` +
        `${product.nameEn}\n` +
        `الكود: ${product.code}\n` +
        `الشركة: ${product.company.toUpperCase()}`;

    const whatsappLink = getUniversalWhatsAppLink('201032637495', whatsappMessage);

    card.innerHTML = `
        <div class="product-header">
            <div class="product-name-ar">${product.nameAr}</div>
            <div class="product-name-en">${product.nameEn}</div>
        </div>
        <div class="product-details">
            <div class="product-info">
                <span class="info-label">الكود:</span>
                <span class="info-value">${product.code}</span>
            </div>
            <div class="product-info">
                <span class="info-label">الشركة:</span>
                <span class="info-value">${product.company.toUpperCase()}</span>
            </div>
        </div>
        <div class="product-actions">
            <a href="${whatsappLink}"
               target="_blank"
               rel="noopener noreferrer"
               class="whatsapp-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.553 4.105 1.521 5.834L0 24l6.315-1.521C8.115 23.447 10.027 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.947 17.219c-.27.758-1.588 1.399-2.197 1.458-.563.055-1.086.262-3.666-.764-3.129-1.244-5.137-4.447-5.293-4.652-.152-.205-1.277-1.7-1.277-3.244 0-1.543.809-2.301 1.096-2.615.287-.314.627-.393.836-.393.209 0 .418.002.602.011.193.009.451-.073.705.537.263.627.896 2.184.975 2.342.078.158.131.342.026.547-.105.205-.158.334-.313.514-.157.18-.33.402-.471.539-.157.151-.32.314-.138.615.182.301.811 1.336 1.74 2.164 1.195 1.066 2.201 1.396 2.514 1.553.314.158.496.131.678-.078.184-.209.785-.916 1-1.23.209-.314.42-.262.705-.158.287.105 1.82.858 2.133 1.014.314.157.523.236.602.365.078.131.078.758-.191 1.516z"/>
                </svg>
                واتساب
            </a>
        </div>
    `;

    return card;
}

// ===================================
// PDF DOWNLOAD FUNCTIONALITY - OPTIMIZED FOR 30 PRODUCTS PER PAGE
// ===================================

async function downloadCatalogPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        // Add Arabic font support
        let fontAdded = false;
        if (typeof addArabicFont === 'function') {
            fontAdded = addArabicFont(doc);
            if (fontAdded) {
                console.log('✓ Arabic font enabled for PDF');
            }
        }

        // FIRST PAGE ONLY: Large header with logo, company info, and WhatsApp button
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, 210, 55, 'F');

        // Add logo (if available)
        try {
            const logoImg = document.querySelector('.logo-img');
            if (logoImg && logoImg.complete) {
                doc.addImage(logoImg, 'JPEG', 15, 8, 40, 40);
            }
        } catch (e) {
            console.log('Logo not added to PDF');
        }

        // Title
        if (fontAdded) {
            doc.setFont('Amiri', 'normal');
        }
        doc.setFontSize(28);
        doc.setTextColor(212, 175, 55);
        doc.text('عطور أبو عمار', 105, 20, { align: 'center' });

        doc.setFontSize(18);
        doc.setTextColor(200, 200, 200);
        doc.setFont('helvetica', 'normal');
        doc.text('ABO AMMAR Perfumes', 105, 32, { align: 'center' });

        // Contact Info - LARGER and MORE READABLE
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text('WhatsApp: +20 103 263 7495', 105, 43, { align: 'center' });
        doc.setFontSize(11);
        doc.text('https://aboammar.vercel.app', 105, 51, { align: 'center' });

        // WhatsApp Button on FIRST PAGE ONLY (top right)
        doc.setFillColor(37, 211, 102); // WhatsApp green
        doc.roundedRect(155, 10, 45, 14, 3, 3, 'F');
        doc.setFontSize(13);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text('📱 WhatsApp', 177.5, 18.5, { align: 'center' });
        doc.link(155, 10, 45, 14, { url: 'https://wa.me/201032637495?text=' + encodeURIComponent('مرحباً، أود الاستفسار عن منتجاتكم') });

        // Prepare table data
        const tableData = filteredProducts.map(product => [
            product.code,
            product.company.toUpperCase(),
            product.nameEn,
            product.nameAr
        ]);

        // Create table - CENTERED ON PAGE, 30 products per page
        doc.autoTable({
            startY: 60,
            head: [['الكود', 'الشركة', 'English Name', 'الاسم بالعربي']],
            body: tableData,
            headStyles: {
                fillColor: [212, 175, 55],
                textColor: [0, 0, 0],
                fontSize: 11,
                fontStyle: 'bold',
                halign: 'center',
                valign: 'middle',
                cellPadding: 3,
                font: fontAdded ? 'Amiri' : 'helvetica'
            },
            bodyStyles: {
                textColor: [0, 0, 0],
                fontSize: 10,
                cellPadding: 2.5,
                valign: 'middle',
                halign: 'center'
            },
            alternateRowStyles: {
                fillColor: [248, 248, 248]
            },
            columnStyles: {
                0: {
                    cellWidth: 30,
                    halign: 'center',
                    valign: 'middle',
                    textColor: [0, 0, 0],
                    fontSize: 10,
                    font: 'helvetica'
                },
                1: {
                    cellWidth: 25,
                    halign: 'center',
                    valign: 'middle',
                    textColor: [0, 0, 0],
                    fontSize: 10,
                    font: 'helvetica'
                },
                2: {
                    cellWidth: 60,
                    halign: 'center',
                    valign: 'middle',
                    textColor: [0, 0, 0],
                    fontSize: 10,
                    font: 'helvetica'
                },
                3: {
                    cellWidth: 60,
                    halign: 'center',
                    valign: 'middle',
                    font: fontAdded ? 'Amiri' : 'helvetica',
                    fontSize: 11,
                    textColor: [0, 0, 0],
                    fontStyle: 'bold'
                }
            },
            // CENTERED: Total width = 30+25+60+60 = 175mm, margins = (210-175)/2 = 17.5mm
            // Pages 2+ start from top (10mm) for maximum space (30 products)
            margin: { top: 10, right: 17.5, bottom: 15, left: 17.5 },
            theme: 'grid',
            styles: {
                lineColor: [200, 200, 200],
                lineWidth: 0.1,
                minCellHeight: 7.5
            },
            // NO header on pages 2+ - just products
            showHead: 'firstPage'
        });

        // Footer on each page with contact info and page numbers
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);

            // WhatsApp contact in footer
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text('WhatsApp: +20 103 263 7495', 20, doc.internal.pageSize.height - 10);

            // Page number - Arabic font for page numbers
            if (fontAdded) {
                doc.setFont('Amiri', 'normal');
            }
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(
                `صفحة ${i} من ${pageCount}`,
                105,
                doc.internal.pageSize.height - 10,
                { align: 'center' }
            );

            // Website URL
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            doc.text('aboammar.vercel.app', 190, doc.internal.pageSize.height - 10, { align: 'right' });
        }

        // Save PDF
        const date = new Date().toISOString().split('T')[0];
        doc.save(`ABO-AMMAR-Catalog-${date}.pdf`);

        console.log('✓ PDF downloaded successfully');
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('حدث خطأ أثناء إنشاء ملف PDF. يرجى المحاولة مرة أخرى.');
    }
}

// ===================================
// SCROLL TO TOP (for mobile)
// ===================================

let scrollTopBtn = null;

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        if (!scrollTopBtn) {
            createScrollTopButton();
        }
        scrollTopBtn.style.display = 'flex';
    } else if (scrollTopBtn) {
        scrollTopBtn.style.display = 'none';
    }
});

function createScrollTopButton() {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 25px;
        width: 50px;
        height: 50px;
        background: rgba(212, 175, 55, 0.9);
        color: #000;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        transition: all 0.3s ease;
    `;

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.background = '#b8941f';
        scrollTopBtn.style.transform = 'scale(1.1)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.background = 'rgba(212, 175, 55, 0.9)';
        scrollTopBtn.style.transform = 'scale(1)';
    });

    document.body.appendChild(scrollTopBtn);
}

// ===================================
// INFINITE SCROLL (Optional Enhancement)
// ===================================

let isLoadingMore = false;

window.addEventListener('scroll', () => {
    if (isLoadingMore) return;
    if (displayedProducts.length >= filteredProducts.length) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 500) {
        isLoadingMore = true;
        setTimeout(() => {
            displayProducts();
            isLoadingMore = false;
        }, 200);
    }
});

console.log('✓ ABO AMMAR Tabbed Interface Loaded Successfully');
