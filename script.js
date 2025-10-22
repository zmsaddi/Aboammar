// Main Application Logic
let allProducts = productsData;
let filteredProducts = allProducts;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    populateCompanyFilter();
    displayProducts(allProducts);
    attachEventListeners();
    updateProductCount();
    animateOnScroll();
}

// Populate company filter dropdown
function populateCompanyFilter() {
    const companyFilter = document.getElementById('companyFilter');
    const companies = [...new Set(allProducts.map(p => p.company))].sort();

    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companyFilter.appendChild(option);
    });
}

// Display products in grid
function displayProducts(products) {
    const grid = document.getElementById('productsGrid');

    if (products.length === 0) {
        grid.innerHTML = '<div class="loading">لا توجد منتجات مطابقة للبحث</div>';
        return;
    }

    grid.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    const whatsappMessage = encodeURIComponent(`مرحباً، أريد الاستفسار عن المنتج:\nالكود: ${product.code}\nالاسم: ${product.nameAr} - ${product.nameEn}`);
    const whatsappLink = `https://wa.me/201032637495?text=${whatsappMessage}`;

    return `
        <div class="product-card" data-aos="fade-up">
            <div class="product-code">كود: ${product.code}</div>
            <span class="product-company">${product.company}</span>
            <div class="product-name-ar">${product.nameAr}</div>
            <div class="product-name-en">${product.nameEn}</div>
            <div class="product-actions">
                <a href="${whatsappLink}" target="_blank" class="btn-order">
                    اطلب عبر واتساب
                </a>
            </div>
        </div>
    `;
}

// Attach event listeners
function attachEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const companyFilter = document.getElementById('companyFilter');
    const downloadBtn = document.getElementById('downloadPDF');

    searchInput.addEventListener('input', debounce(handleSearch, 300));
    companyFilter.addEventListener('change', handleFilter);
    downloadBtn.addEventListener('click', downloadCatalogPDF);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Handle search with Arabic and English support
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const companyFilter = document.getElementById('companyFilter').value;

    filteredProducts = allProducts.filter(product => {
        const matchesSearch = searchTerm === '' ||
            product.nameAr.toLowerCase().includes(searchTerm) ||
            product.nameEn.toLowerCase().includes(searchTerm) ||
            product.code.toLowerCase().includes(searchTerm);

        const matchesCompany = companyFilter === '' || product.company === companyFilter;

        return matchesSearch && matchesCompany;
    });

    displayProducts(filteredProducts);
    updateProductCount();
}

// Handle company filter
function handleFilter(e) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';

    const company = e.target.value;

    if (company === '') {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(product => product.company === company);
    }

    displayProducts(filteredProducts);
    updateProductCount();
}

// Update product count
function updateProductCount() {
    const countElement = document.getElementById('productCount');
    const totalElement = document.getElementById('totalProducts');

    countElement.textContent = `عرض ${filteredProducts.length} من ${allProducts.length} منتج`;
    if (totalElement) {
        totalElement.textContent = `${allProducts.length}+`;
    }
}

// Download catalog as PDF
function downloadCatalogPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        // Add Arabic font support (using default Unicode support)
        doc.setFont('helvetica');

        // Add logo and header
        doc.setFontSize(24);
        doc.setTextColor(212, 175, 55);
        doc.text('ABO AMMAR Perfumes', 105, 20, { align: 'center' });

        doc.setFontSize(14);
        doc.setTextColor(100, 100, 100);
        doc.text('Product Catalog', 105, 30, { align: 'center' });
        doc.text('+20 103 263 7495', 105, 37, { align: 'center' });

        // Add line
        doc.setLineWidth(0.5);
        doc.setDrawColor(212, 175, 55);
        doc.line(20, 42, 190, 42);

        // Prepare table data
        const tableData = filteredProducts.map(product => [
            product.code,
            product.company,
            product.nameEn,
            product.nameAr
        ]);

        // Add table
        doc.autoTable({
            head: [['Code', 'Company', 'English Name', 'Arabic Name']],
            body: tableData,
            startY: 48,
            theme: 'grid',
            headStyles: {
                fillColor: [212, 175, 55],
                textColor: [10, 10, 10],
                fontStyle: 'bold',
                halign: 'center'
            },
            bodyStyles: {
                textColor: [50, 50, 50]
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245]
            },
            margin: { left: 15, right: 15 },
            styles: {
                fontSize: 9,
                cellPadding: 3
            },
            columnStyles: {
                0: { cellWidth: 25, halign: 'center' },
                1: { cellWidth: 20, halign: 'center' },
                2: { cellWidth: 70 },
                3: { cellWidth: 70, font: 'helvetica' }
            },
            didDrawPage: function (data) {
                // Add footer
                const pageCount = doc.internal.getNumberOfPages();
                doc.setFontSize(10);
                doc.setTextColor(150);
                doc.text(
                    `Page ${data.pageNumber} of ${pageCount}`,
                    doc.internal.pageSize.width / 2,
                    doc.internal.pageSize.height - 10,
                    { align: 'center' }
                );
            }
        });

        // Save the PDF
        doc.save(`ABO_AMMAR_Catalog_${new Date().toISOString().split('T')[0]}.pdf`);

        // Show success message
        showNotification('تم تحميل الكتالوج بنجاح!', 'success');

    } catch (error) {
        console.error('PDF generation error:', error);
        showNotification('حدث خطأ أثناء إنشاء ملف PDF', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#25D366' : '#ff4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Debounce function for search
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

// Animate on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.product-card, .stat-item, .about-content, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .product-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .product-card:hover {
        transform: translateY(-8px) scale(1.02);
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c🌟 ABO AMMAR Perfumes 🌟', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
console.log('%cWebsite developed with ❤️', 'color: #D4AF37; font-size: 14px;');
console.log(`%cTotal Products: ${allProducts.length}`, 'color: #D4AF37; font-size: 12px;');
