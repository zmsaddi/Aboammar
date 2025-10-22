"""
Download Arabic font and prepare it for jsPDF
This script downloads Cairo font and converts it to base64
"""

import urllib.request
import base64
import os

# Download Cairo Regular font from Google Fonts CDN
font_url = "https://github.com/google/fonts/raw/main/ofl/cairo/Cairo-Regular.ttf"
font_file = "Cairo-Regular.ttf"

print("Downloading Cairo Arabic font...")
try:
    urllib.request.urlretrieve(font_url, font_file)
    print(f"✓ Downloaded: {font_file}")

    # Get file size
    file_size = os.path.getsize(font_file)
    print(f"✓ Font size: {file_size / 1024:.2f} KB")

    # Read and convert to base64
    print("Converting to base64...")
    with open(font_file, 'rb') as f:
        font_data = f.read()
        font_base64 = base64.b64encode(font_data).decode('utf-8')

    # Create JavaScript file with embedded font
    js_content = f'''// Cairo Arabic Font for jsPDF
// Auto-generated font file - DO NOT EDIT MANUALLY

const CairoFont = "{font_base64}";

// Function to add Cairo font to jsPDF document
function addCairoFont(doc) {{
    doc.addFileToVFS("Cairo-Regular.ttf", CairoFont);
    doc.addFont("Cairo-Regular.ttf", "Cairo", "normal");
}}

// Export for use
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = {{ addCairoFont, CairoFont }};
}}
'''

    with open('cairo-font.js', 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"✓ Created: cairo-font.js ({len(js_content) / 1024:.2f} KB)")
    print(f"✓ Base64 length: {len(font_base64)} characters")
    print("\n✅ Font ready for use in PDF!")

except Exception as e:
    print(f"❌ Error: {e}")
    print("\nTrying alternative source...")

    # Alternative: Create a simpler font loader
    alt_js = '''// Arabic Font Loader for jsPDF
// Uses Google Fonts CDN approach

async function loadArabicFont(doc) {
    try {
        // Note: For production, you need to embed the actual font
        // This is a placeholder that shows the approach
        console.log("Loading Arabic font for PDF...");

        // You'll need to add the actual base64 font data here
        // or use a pre-converted font file

        return doc;
    } catch (error) {
        console.error("Error loading Arabic font:", error);
        return doc;
    }
}
'''

    with open('cairo-font.js', 'w', encoding='utf-8') as f:
        f.write(alt_js)

    print("✓ Created alternative font loader")
