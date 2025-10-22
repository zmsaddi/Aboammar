import sys
sys.stdout.reconfigure(encoding='utf-8')

html_content = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عطور أبو عمار - ABO AMMAR Perfumes</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="logo-container">
                <img src="a.00.jpg" alt="ABO AMMAR Logo" class="logo">
                <div class="brand-text">
                    <h1>عطور أبو عمار</h1>
                    <p class="tagline">ABO AMMAR Perfumes</p>
                </div>
            </div>
            <nav class="nav">
                <a href="#home" class="nav-link active">الرئيسية</a>
                <a href="#products" class="nav-link">المنتجات</a>
                <a href="#about" class="nav-link">عن الشركة</a>
                <a href="#contact" class="nav-link">اتصل بنا</a>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
            <h2 class="hero-title">عالم من العطور الفاخرة</h2>
            <p class="hero-subtitle">اكتشف مجموعتنا الحصرية من أرقى العطور العالمية</p>
            <div class="hero-buttons">
                <a href="#products" class="btn btn-primary">تصفح المنتجات</a>
                <button onclick="downloadCatalogPDF()" class="btn btn-secondary">تحميل الكتالوج</button>
            </div>
        </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="products-section">
        <div class="container">
            <h2 class="section-title">منتجاتنا</h2>
            <p class="section-subtitle">أكثر من 2000 عطر من أفخم العلامات التجارية</p>

            <!-- Filters -->
            <div class="filters">
                <div class="filter-group">
                    <label for="search" class="filter-label">البحث:</label>
                    <input type="text" id="search" class="search-input" placeholder="ابحث عن عطر بالاسم أو الكود...">
                </div>
                <div class="filter-group">
                    <label for="company-filter" class="filter-label">الشركة:</label>
                    <select id="company-filter" class="company-select">
                        <option value="">جميع الشركات</option>
                    </select>
                </div>
                <div class="filter-stats">
                    <span id="product-count" class="count-badge">0 منتج</span>
                </div>
            </div>

            <!-- Products Grid -->
            <div id="products-grid" class="products-grid">
                <!-- Products will be loaded here by JavaScript -->
            </div>

            <!-- Loading Spinner -->
            <div id="loading" class="loading">
                <div class="spinner"></div>
                <p>جاري تحميل المنتجات...</p>
            </div>

            <!-- No Results Message -->
            <div id="no-results" class="no-results" style="display: none;">
                <p>لم يتم العثور على منتجات مطابقة</p>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about-section">
        <div class="container">
            <div class="about-grid">
                <div class="about-content">
                    <h2 class="section-title">عن أبو عمار للعطور</h2>
                    <p class="about-text">
                        نحن نقدم أرقى وأفخم العطور العالمية من أشهر العلامات التجارية.
                        مع أكثر من 2000 عطر متنوع، نضمن لك تجربة فريدة في عالم العطور الفاخرة.
                    </p>
                    <p class="about-text">
                        تميزنا في تقديم منتجات أصلية 100% مع أفضل الأسعار وخدمة عملاء متميزة.
                    </p>
                    <div class="features">
                        <div class="feature">
                            <div class="feature-icon">✓</div>
                            <h3>منتجات أصلية</h3>
                            <p>جميع العطور أصلية ومضمونة 100%</p>
                        </div>
                        <div class="feature">
                            <div class="feature-icon">✓</div>
                            <h3>تنوع هائل</h3>
                            <p>أكثر من 2000 عطر من أفخم العلامات</p>
                        </div>
                        <div class="feature">
                            <div class="feature-icon">✓</div>
                            <h3>خدمة متميزة</h3>
                            <p>فريق محترف لخدمتك على مدار الساعة</p>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    <img src="a.00.jpg" alt="ABO AMMAR" class="about-logo">
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
        <div class="container">
            <h2 class="section-title">اتصل بنا</h2>
            <p class="section-subtitle">نحن هنا للإجابة على جميع استفساراتك</p>
            <div class="contact-info">
                <a href="https://wa.me/201032637495" target="_blank" class="contact-card whatsapp-card">
                    <div class="contact-icon">📱</div>
                    <h3>واتساب</h3>
                    <p>+20 103 263 7495</p>
                    <span class="contact-cta">ابدأ المحادثة</span>
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <img src="a.00.jpg" alt="ABO AMMAR Logo" class="footer-logo">
                    <p>عطور أبو عمار - وجهتك للعطور الفاخرة</p>
                </div>
                <div class="footer-links">
                    <h4>روابط سريعة</h4>
                    <a href="#home">الرئيسية</a>
                    <a href="#products">المنتجات</a>
                    <a href="#about">عن الشركة</a>
                    <a href="#contact">اتصل بنا</a>
                </div>
                <div class="footer-contact">
                    <h4>تواصل معنا</h4>
                    <p>واتساب: +20 103 263 7495</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 عطور أبو عمار. جميع الحقوق محفوظة.</p>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/201032637495" target="_blank" class="whatsapp-float" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 0C7.164 0 0 7.164 0 16c0 2.825.738 5.48 2.028 7.784L0 32l8.384-2.028C10.688 31.262 13.344 32 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.333c-2.453 0-4.787-.664-6.784-1.82l-.488-.284-5.057 1.224 1.244-4.98-.311-.508C3.331 20.787 2.667 18.453 2.667 16 2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.293-9.96c-.4-.2-2.365-1.169-2.731-1.302-.365-.133-.631-.2-.897.2-.267.4-1.031 1.302-1.265 1.569-.233.267-.465.3-.865.1-.4-.2-1.689-.623-3.217-1.985-1.189-1.061-1.992-2.371-2.225-2.771-.233-.4-.025-.617.175-.816.18-.18.4-.465.6-.698.2-.233.267-.4.4-.665.133-.267.067-.5-.033-.698-.1-.2-.897-2.165-1.231-2.965-.325-.78-.655-.674-.897-.687-.233-.012-.5-.015-.765-.015s-.698.1-1.064.5c-.365.4-1.398 1.369-1.398 3.335s1.431 3.868 1.631 4.135c.2.267 2.825 4.315 6.844 6.052.957.414 1.704.661 2.287.846.961.305 1.836.262 2.527.159.771-.115 2.365-.968 2.699-1.902.333-.935.333-1.736.233-1.902-.1-.167-.365-.267-.765-.465z"/>
        </svg>
    </a>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>
    <script src="products.js"></script>
    <script src="script.js"></script>
</body>
</html>'''

with open('index.html', 'w', encoding='utf-8-sig') as f:
    f.write(html_content)

print('HTML file created successfully with UTF-8-BOM encoding')
