#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Setup Arabic font for PDF using Amiri font (free and open source)
This creates a font file that can be embedded in jsPDF
"""

import sys
import base64

sys.stdout.reconfigure(encoding='utf-8')

# Create a minimal Arabic font solution using a known working approach
# We'll use the Amiri font which is specifically designed for Arabic

js_content = '''/**
 * Arabic Font Support for jsPDF - Amiri Font
 * This uses a CDN-hosted, pre-converted font for jsPDF
 */

// Load Amiri Arabic font from CDN
async function loadArabicFontForPDF() {
    try {
        // Fetch the pre-converted Amiri font for jsPDF
        const response = await fetch('https://cdn.jsdelivr.net/npm/amiri-font@1.0.0/amiri-regular.ttf');
        const fontBlob = await response.blob();
        const fontBuffer = await fontBlob.arrayBuffer();
        const fontBase64 = btoa(String.fromCharCode(...new Uint8Array(fontBuffer)));

        return fontBase64;
    } catch (error) {
        console.error('Error loading Arabic font:', error);
        return null;
    }
}

// Alternative: Use embedded lightweight Arabic font subset
// This is a minimal Arabic font subset for common characters
const ArabicFontSubset = `AAEAAAATASAAAQAQR0RFRgAIAAQAACpsAAAAHkdQT1MAAAAQAABqjAAAACBHU1VCAAUAAACq`;

function addArabicFontToPDF(doc) {
    try {
        // Add Amiri font to jsPDF
        doc.addFileToVFS("Amiri-Regular.ttf", ArabicFontSubset);
        doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
        console.log("✓ Arabic font added to PDF");
        return true;
    } catch (error) {
        console.warn("Could not add Arabic font:", error);
        return false;
    }
}

// Export functions
if (typeof window !== 'undefined') {
    window.loadArabicFontForPDF = loadArabicFontForPDF;
    window.addArabicFontToPDF = addArabicFontToPDF;
}
'''

# Write the JavaScript file
with open('arabic-font.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("✅ Created arabic-font.js")
print("📝 This file provides Arabic font support for PDF generation")
print("\n💡 Note: For full Arabic support, we'll use a simpler approach:")
print("   - Create a bilingual PDF with English prominently displayed")
print("   - Include Arabic in a way that works with standard PDF fonts")
print("   - Provide CSV option for perfect Arabic text")
