#!/usr/bin/env python3
import os

# 1. Emerald & Platinum Steel Version (Seamless for dark header)
svg_emerald = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 130" width="350" height="130" fill="none">
    <defs>
        <!-- Emerald Gradient for T & I -->
        <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#34d399"/>
            <stop offset="50%" stop-color="#10b981"/>
            <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
        <!-- Platinum Steel Gradient for O -->
        <linearGradient id="steelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
        <!-- Subtle Drop Shadow -->
        <filter id="subtleShadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="3" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.45"/>
        </filter>
        <filter id="emeraldGlow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="2" dy="3" stdDeviation="2" flood-color="#064e3b" flood-opacity="0.6"/>
        </filter>
    </defs>

    <!-- T - Top Horizontal Bar -->
    <rect x="2" y="2" width="116" height="42" rx="4" fill="url(#emeraldGrad)" filter="url(#emeraldGlow)" stroke="#064e3b" stroke-width="1.5"/>
    
    <!-- T - Bottom Vertical Stem -->
    <rect x="36" y="52" width="48" height="74" rx="4" fill="url(#emeraldGrad)" filter="url(#emeraldGlow)" stroke="#064e3b" stroke-width="1.5"/>

    <!-- O - Top Cap -->
    <path d="M 126 44 L 126 22 A 22 22 0 0 1 148 2 L 272 2 A 22 22 0 0 1 294 22 L 294 44 Z" 
          fill="url(#steelGrad)" filter="url(#subtleShadow)" stroke="#0f172a" stroke-width="2"/>

    <!-- O - Bottom Trough -->
    <path d="M 126 52 L 126 106 A 22 22 0 0 0 148 128 L 272 128 A 22 22 0 0 0 294 106 L 294 52 L 254 52 L 254 96 A 10 10 0 0 1 244 106 L 176 106 A 10 10 0 0 1 166 96 L 166 52 Z" 
          fill="url(#steelGrad)" filter="url(#subtleShadow)" stroke="#0f172a" stroke-width="2"/>

    <!-- I - Top Block -->
    <rect x="302" y="2" width="46" height="42" rx="4" fill="url(#emeraldGrad)" filter="url(#emeraldGlow)" stroke="#064e3b" stroke-width="1.5"/>

    <!-- I - Bottom Vertical Stem -->
    <rect x="302" y="52" width="46" height="74" rx="4" fill="url(#emeraldGrad)" filter="url(#emeraldGlow)" stroke="#064e3b" stroke-width="1.5"/>
</svg>
"""

# 2. Modern Crimson / Red Heritage Version (Refined from original JPG)
svg_crimson = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 130" width="350" height="130" fill="none">
    <defs>
        <!-- Crimson Gradient for T & I -->
        <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f87171"/>
            <stop offset="50%" stop-color="#ef4444"/>
            <stop offset="100%" stop-color="#b91c1c"/>
        </linearGradient>
        <!-- Platinum Steel Gradient for O -->
        <linearGradient id="steelGradCrimson" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
        <filter id="crimsonShadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="3" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.45"/>
        </filter>
    </defs>

    <!-- T - Top Horizontal Bar -->
    <rect x="2" y="2" width="116" height="42" rx="4" fill="url(#crimsonGrad)" filter="url(#crimsonShadow)" stroke="#7f1d1d" stroke-width="1.5"/>
    
    <!-- T - Bottom Vertical Stem -->
    <rect x="36" y="52" width="48" height="74" rx="4" fill="url(#crimsonGrad)" filter="url(#crimsonShadow)" stroke="#7f1d1d" stroke-width="1.5"/>

    <!-- O - Top Cap -->
    <path d="M 126 44 L 126 22 A 22 22 0 0 1 148 2 L 272 2 A 22 22 0 0 1 294 22 L 294 44 Z" 
          fill="url(#steelGradCrimson)" filter="url(#crimsonShadow)" stroke="#0f172a" stroke-width="2"/>

    <!-- O - Bottom Trough -->
    <path d="M 126 52 L 126 106 A 22 22 0 0 0 148 128 L 272 128 A 22 22 0 0 0 294 106 L 294 52 L 254 52 L 254 96 A 10 10 0 0 1 244 106 L 176 106 A 10 10 0 0 1 166 96 L 166 52 Z" 
          fill="url(#steelGradCrimson)" filter="url(#crimsonShadow)" stroke="#0f172a" stroke-width="2"/>

    <!-- I - Top Block -->
    <rect x="302" y="2" width="46" height="42" rx="4" fill="url(#crimsonGrad)" filter="url(#crimsonShadow)" stroke="#7f1d1d" stroke-width="1.5"/>

    <!-- I - Bottom Vertical Stem -->
    <rect x="302" y="52" width="46" height="74" rx="4" fill="url(#crimsonGrad)" filter="url(#crimsonShadow)" stroke="#7f1d1d" stroke-width="1.5"/>
</svg>
"""

# 3. Full Brand Lockup with Typography (Emerald & White)
svg_lockup = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 130" width="760" height="130" fill="none">
    <defs>
        <linearGradient id="lockupEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#34d399"/>
            <stop offset="50%" stop-color="#10b981"/>
            <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
        <linearGradient id="lockupSteel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#f1f5f9"/>
        </linearGradient>
        <filter id="lockupShadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="2" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.35"/>
        </filter>
    </defs>

    <!-- TOI Monogram -->
    <g transform="translate(0, 0)">
        <rect x="2" y="2" width="116" height="42" rx="4" fill="url(#lockupEmerald)" filter="url(#lockupShadow)" stroke="#064e3b" stroke-width="1.5"/>
        <rect x="36" y="52" width="48" height="74" rx="4" fill="url(#lockupEmerald)" filter="url(#lockupShadow)" stroke="#064e3b" stroke-width="1.5"/>

        <path d="M 126 44 L 126 22 A 22 22 0 0 1 148 2 L 272 2 A 22 22 0 0 1 294 22 L 294 44 Z" 
              fill="url(#lockupSteel)" filter="url(#lockupShadow)" stroke="#0f172a" stroke-width="2"/>
        <path d="M 126 52 L 126 106 A 22 22 0 0 0 148 128 L 272 128 A 22 22 0 0 0 294 106 L 294 52 L 254 52 L 254 96 A 10 10 0 0 1 244 106 L 176 106 A 10 10 0 0 1 166 96 L 166 52 Z" 
              fill="url(#lockupSteel)" filter="url(#lockupShadow)" stroke="#0f172a" stroke-width="2"/>

        <rect x="302" y="2" width="46" height="42" rx="4" fill="url(#lockupEmerald)" filter="url(#lockupShadow)" stroke="#064e3b" stroke-width="1.5"/>
        <rect x="302" y="52" width="46" height="74" rx="4" fill="url(#lockupEmerald)" filter="url(#lockupShadow)" stroke="#064e3b" stroke-width="1.5"/>
    </g>

    <!-- Divider Line -->
    <line x1="375" y1="15" x2="375" y2="115" stroke="#334155" stroke-width="2" stroke-linecap="round"/>

    <!-- Typography -->
    <text x="405" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="900" fill="#ffffff" letter-spacing="2">TATVAM</text>
    <text x="408" y="105" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="800" fill="#34d399" letter-spacing="7">OVERSEAS INC</text>
</svg>
"""

os.makedirs('assets/images', exist_ok=True)
with open('assets/images/tatvam-logo-emerald.svg', 'w') as f:
    f.write(svg_emerald)
with open('assets/images/tatvam-logo-crimson.svg', 'w') as f:
    f.write(svg_crimson)
with open('assets/images/tatvam-brand-lockup.svg', 'w') as f:
    f.write(svg_lockup)
# Also set tatvam-logo.svg as the emerald default
with open('assets/images/tatvam-logo.svg', 'w') as f:
    f.write(svg_emerald)

print('Generated all vector SVGs successfully.')
