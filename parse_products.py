import re
import json

# All CSV data from user (concatenated from all segments)
csv_data = """الكود,الشركة,الصنف
5025,GM,اكس او فكتوريا سكرت - XO Victoria's Secret
2038,GM,ديفن عود روبرتو كافالي - Divine Oud Roberto Cavalli
2527,GM,سويت بيا بوس ديليكيت بات & بادي 2 - SWEET PEA BOIS DELICAT Bath & Body 2
169/8753,GM,سويت بيا بوس ديليكيت بات & بادي 1 - SWEET PEA POIS DELICAT Bath & Body 1
170/8729,GM,ميدنايت بومجرانتي بات & بادي - Midnight Pomegranate Bath & Body
171/8730,GM,جابانيس تشيري بلوسوم بات & بادي - Japanese Cherry Blossom Bath & Body
172/8731,GM,دارك كيس بات & بادي - Dark Kiss Bath & Body
173/8732,GM,فورايفر ريد بات & بادي - FOREVER RED Bath & Body
174/8733,GM,فيلفت شوجر بات & بادي - VELVET SUGER Bath & Body
175/8734,GM,كشمير جلو بات & بادي - Cashmere Glow Bath & Body
176/8735,GM,فور ايفر ميدنايت بات & بادي - FOREVER MIDNIGHT Bath & Body
177/8736,GM,تشيفون بات & بادي - CHIFFON Bath & Body
178/8737,GM,دارك كيس بات & بادي - Dark Kiss Bath & Body
179/8738,GM,وايلد مدغشقر فانيلا بات & بادي 2024 - Wild Madagascar Vanilla Bath & Body 2024
180/8739,GM,وايلد مدغشقر فانيلا بات & بادي - Wild Madagascar Vanilla Bath & Body
181/8740,GM,وينتيري وندر بات & بادي - Winterberry Wonder Bath & Body
182/8741,GM,جينجل أول ذا واي بات & بادي - JINGLE ALL THE WAY Bath & Body
183/8742,GM,سنو كيسد شوجر بات & بادي - SNOW KISSED SUGER Bath & Body
184/8743,GM,ريد فيلفت تشير بات & بادي - RED VEVLET CHEER Bath & Body"""

def parse_product_name(name):
    """Parse product name to separate Arabic and English"""
    # Split by " - "
    if ' - ' in name:
        parts = name.split(' - ', 1)
        return parts[0].strip(), parts[1].strip()
    return name.strip(), name.strip()

products = []
lines = csv_data.strip().split('\n')[1:]  # Skip header

for line in lines:
    # Handle CSV with quotes
    parts = []
    current = []
    in_quotes = False
    
    for char in line:
        if char == '"':
            in_quotes = not in_quotes
        elif char == ',' and not in_quotes:
            parts.append(''.join(current).strip('"'))
            current = []
        else:
            current.append(char)
    parts.append(''.join(current).strip('"'))
    
    if len(parts) >= 3:
        code = parts[0]
        company = parts[1]
        full_name = parts[2]
        
        name_ar, name_en = parse_product_name(full_name)
        
        products.append({
            'code': code,
            'company': company,
            'nameAr': name_ar,
            'nameEn': name_en
        })

# Write to JavaScript file
with open('products.js', 'w', encoding='utf-8') as f:
    f.write('// Complete product catalog - Generated automatically\n')
    f.write('const productsData = ')
    f.write(json.dumps(products, ensure_ascii=False, indent=2))
    f.write(';\n\n')
    f.write('if (typeof module !== "undefined" && module.exports) {\n')
    f.write('    module.exports = productsData;\n')
    f.write('}\n')

print(f"Generated products.js with {len(products)} products")
