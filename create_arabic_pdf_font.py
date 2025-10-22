#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Create embedded Arabic font for jsPDF
Uses Amiri font (SIL Open Font License)
"""

import sys
import urllib.request
import base64
import os

sys.stdout.reconfigure(encoding='utf-8')

print("Creating Arabic font for PDF...")
print("=" * 50)

# Try to download Amiri Regular font (good for Arabic in PDFs)
# This is a direct link to the font file from a reliable source

fonts_to_try = [
    ("https://raw.githubusercontent.com/aliftype/amiri/main/Amiri-Regular.ttf", "Amiri-Regular.ttf"),
    ("https://github.com/google/fonts/raw/main/ofl/amiri/Amiri-Regular.ttf", "Amiri-Regular.ttf"),
]

font_downloaded = False
font_file = None

for url, filename in fonts_to_try:
    try:
        print(f"\nTrying to download from: {url}")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as response:
            with open(filename, 'wb') as f:
                f.write(response.read())

        if os.path.exists(filename) and os.path.getsize(filename) > 10000:
            font_file = filename
            font_downloaded = True
            print(f"✓ Successfully downloaded: {filename}")
            print(f"✓ File size: {os.path.getsize(filename) / 1024:.2f} KB")
            break
    except Exception as e:
        print(f"✗ Failed: {e}")
        continue

if font_downloaded and font_file:
    try:
        # Convert to base64
        print("\nConverting font to base64...")
        with open(font_file, 'rb') as f:
            font_data = f.read()
            font_base64 = base64.b64encode(font_data).decode('utf-8')

        # Create JavaScript file with embedded font
        js_content = f'''/**
 * Amiri Arabic Font for jsPDF
 * Font: Amiri Regular
 * License: SIL Open Font License
 * Auto-generated - DO NOT EDIT
 */

const AmiriFont = "{font_base64}";

/**
 * Add Amiri Arabic font to jsPDF document
 * @param {{jsPDF}} doc - jsPDF document instance
 * @returns {{boolean}} - Success status
 */
function addArabicFont(doc) {{
    try {{
        // Add font file to virtual file system
        doc.addFileToVFS("Amiri-Regular.ttf", AmiriFont);

        // Register the font
        doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");

        console.log("✓ Arabic font (Amiri) loaded successfully");
        return true;
    }} catch (error) {{
        console.error("✗ Failed to load Arabic font:", error);
        return false;
    }}
}}

// Make available globally
if (typeof window !== 'undefined') {{
    window.AmiriFont = AmiriFont;
    window.addArabicFont = addArabicFont;
}}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = {{ AmiriFont, addArabicFont }};
}}
'''

        # Write JavaScript file
        js_filename = 'amiri-font.js'
        with open(js_filename, 'w', encoding='utf-8') as f:
            f.write(js_content)

        print(f"\n✅ SUCCESS!")
        print(f"✓ Created: {js_filename}")
        print(f"✓ JavaScript file size: {len(js_content) / 1024:.2f} KB")
        print(f"✓ Base64 font size: {len(font_base64) / 1024:.2f} KB")
        print(f"\n📝 To use in your PDF:")
        print(f"   1. Include <script src='{js_filename}'></script>")
        print(f"   2. Call addArabicFont(doc) before adding text")
        print(f"   3. Use doc.setFont('Amiri') for Arabic text")

    except Exception as e:
        print(f"\n❌ Error creating JavaScript file: {e}")
        font_downloaded = False

if not font_downloaded:
    print("\n⚠️  Could not download font automatically.")
    print("\n📋 Alternative solution - Creating font loader template...")

    # Create a template that uses CDN loading
    template_js = '''/**
 * Arabic Font Loader for jsPDF
 * This version loads the font from CDN at runtime
 */

async function loadAndAddArabicFont(doc) {
    try {
        console.log("Loading Arabic font...");

        // Load font from CDN
        const response = await fetch('https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrIw74NL.woff2');

        if (!response.ok) {
            throw new Error('Font download failed');
        }

        const fontBlob = await response.blob();
        const arrayBuffer = await fontBlob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Convert to base64
        let binary = '';
        for (let i = 0; i < uint8Array.length; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }
        const fontBase64 = btoa(binary);

        // Add to jsPDF
        doc.addFileToVFS("Amiri.woff2", fontBase64);
        doc.addFont("Amiri.woff2", "Amiri", "normal");

        console.log("✓ Arabic font loaded");
        return true;
    } catch (error) {
        console.error("Error loading Arabic font:", error);
        return false;
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.loadAndAddArabicFont = loadAndAddArabicFont;
}
'''

    with open('arabic-font-loader.js', 'w', encoding='utf-8') as f:
        f.write(template_js)

    print("✓ Created: arabic-font-loader.js (CDN-based loader)")
    print("\n💡 This version loads the font from Google Fonts CDN")
    print("   Use: await loadAndAddArabicFont(doc)")

print("\n" + "=" * 50)
print("Setup complete!")
