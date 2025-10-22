#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Deploy Tabbed Version - Copy tabbed files to main files
"""

import sys
import shutil

sys.stdout.reconfigure(encoding='utf-8')

print("Deploying tabbed version...")
print("=" * 50)

try:
    # Copy style-tabbed.css to style.css
    shutil.copy('style-tabbed.css', 'style.css')
    print("✓ Copied style-tabbed.css → style.css")

    # Copy script-tabbed.js to script.js
    shutil.copy('script-tabbed.js', 'script.js')
    print("✓ Copied script-tabbed.js → script.js")

    print("\n✅ Deployment files updated successfully!")
    print("\nNext steps:")
    print("1. git add .")
    print("2. git commit -m 'Deploy tabbed interface'")
    print("3. git push origin main")

except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
