import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Arc
from matplotlib.path import Path
import matplotlib.patheffects as pe
import matplotlib.gridspec as gridspec

fig = plt.figure(figsize=(16, 9), facecolor='white')
gs = gridspec.GridSpec(1, 2, figure=fig, wspace=0.06, left=0.02, right=0.98,
                       top=0.95, bottom=0.04)

# ═══════════════════════════════════════════════════════════════════
# PANEL (a) – POLARFRONTEN OG BAROKLIN TILSTAND
# ═══════════════════════════════════════════════════════════════════
ax = fig.add_subplot(gs[0])
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.set_aspect('equal')
ax.axis('off')

# Bakgrunnsfarger: kald (blå) venstre, varm (rød) høyre
from matplotlib.patches import Polygon
cold_bg = Polygon([[0,0],[5,0],[5,10],[0,10]], closed=True,
                  facecolor='#c8ddf0', edgecolor='none', zorder=0)
warm_bg = Polygon([[5,0],[10,0],[10,10],[5,10]], closed=True,
                  facecolor='#f5cfc8', edgecolor='none', zorder=0)
ax.add_patch(cold_bg)
ax.add_patch(warm_bg)

# Polarfront-båndet (skrå stripe)
front_band = Polygon([[2.5,0],[5.5,0],[7.5,10],[4.5,10]], closed=True,
                     facecolor='#e8a090', edgecolor='none', alpha=0.6, zorder=1)
ax.add_patch(front_band)

# Trykkflater (horisontale stiplete linjer)
for y in np.linspace(1.5, 8.5, 8):
    ax.plot([0.2, 9.8], [y, y], 'k--', linewidth=0.9, alpha=0.55, zorder=2)

# Temperaturflater (hellende prikket linjer)
for i, offset in enumerate(np.linspace(-1.5, 1.5, 9)):
    x_start = 0.2
    x_end = 9.8
    y_left  = 5.0 + offset - 1.8
    y_right = 5.0 + offset + 1.8
    ax.plot([x_start, x_end], [y_left, y_right], color='#1a5276',
            linewidth=0.9, linestyle=':', alpha=0.7, zorder=2)

# POLARFRONT-tekst (skrå langs fronten)
ax.text(5.5, 5.0, 'POLARFRONT', fontsize=9, fontweight='bold',
        color='#7b241c', rotation=75, ha='center', va='center',
        zorder=5, alpha=0.85)

# Stor blå pil ned (SINKING) – venstre side
ax.annotate('', xy=(2.8, 1.5), xytext=(2.8, 5.5),
            arrowprops=dict(arrowstyle='->', color='#1a5276',
                            lw=3.5, mutation_scale=28), zorder=6)

# Stor rød pil opp (GLIDIS OPP) – høyre side
ax.annotate('', xy=(7.0, 8.5), xytext=(7.0, 3.8),
            arrowprops=dict(arrowstyle='->', color='#c0392b',
                            lw=3.5, mutation_scale=28), zorder=6)

# Tekster
ax.text(1.2, 4.5, 'KALD\nPOLARLUFT', fontsize=9.5, fontweight='bold',
        color='#1a5276', ha='center', va='center', zorder=7)
ax.text(8.5, 6.5, 'VARM\nSUBTROPYSSK\nLUFT', fontsize=9, fontweight='bold',
        color='#922b21', ha='center', va='center', zorder=7)
ax.text(2.4, 3.2, 'SINKING', fontsize=8.5, fontweight='bold',
        color='#1a5276', ha='center', zorder=7)
ax.text(7.7, 6.4, 'GLIDIS OPP\nVGR OPP', fontsize=8.5, fontweight='bold',
        color='#c0392b', ha='center', zorder=7)

# Etiketter med piler for TEMPERATURFLATER og TRYKKFLATER
ax.annotate('TEMPERATURFLATER\n(POTENSIELL TEMPERATUR)', xy=(1.0, 8.2),
            xytext=(0.15, 9.3), fontsize=7.2, color='#1a5276',
            arrowprops=dict(arrowstyle='->', color='#1a5276', lw=1.0),
            zorder=7)
ax.annotate('TRYKKFLATER', xy=(8.5, 7.2),
            xytext=(7.2, 9.3), fontsize=7.2, color='#333',
            arrowprops=dict(arrowstyle='->', color='#333', lw=1.0),
            zorder=7)
ax.text(3.0, 0.35, 'TEMPERATURFLATER (POTENSIELL TEMPERATUR)',
        fontsize=7.0, color='#1a5276', ha='center', zorder=7)

# Liten innsatsboks nede til høyre
inset_ax = fig.add_axes([0.085, 0.055, 0.095, 0.14])
inset_ax.set_xlim(0, 4)
inset_ax.set_ylim(0, 4)
inset_ax.set_aspect('equal')
inset_ax.axis('off')
inset_ax.set_facecolor('#fffde7')
for y in [1.0, 2.0, 3.0]:
    inset_ax.plot([0, 4], [y, y], 'k--', lw=1.0, alpha=0.7)
for offset in [-0.8, 0, 0.8]:
    inset_ax.plot([0, 4], [2+offset-0.6, 2+offset+0.6], 'b:', lw=1.0, alpha=0.8)
inset_ax.text(2.0, -0.6, 'BAROKLIN:\nTEMPERATUR- OG\nTRYKKFLATER\nKRYSSER HVERANDRE',
              fontsize=5.5, ha='center', va='top', color='#333')
bbox = FancyBboxPatch((0, 0), 4, 4, boxstyle="round,pad=0.1",
                      linewidth=1, edgecolor='#888', facecolor='#fffde7',
                      zorder=0, transform=inset_ax.transData)
inset_ax.add_patch(bbox)

# Panel-tittel
ax.text(5.0, 10.3, '(a)  POLARFRONTEN OG BAROKLIN TILSTAND',
        fontsize=11, fontweight='bold', ha='center', va='bottom',
        transform=ax.transData, zorder=10)

# ═══════════════════════════════════════════════════════════════════
# PANEL (b) – JETSTRØMMEN OG BAROTROP UTVIKLING
# ═══════════════════════════════════════════════════════════════════
ax2 = fig.add_subplot(gs[1])
ax2.set_xlim(0, 10)
ax2.set_ylim(0, 10)
ax2.axis('off')

# ── Øvre halvdel: Strømningsmønster ──────────────────────────────
# Bakgrunn
cold_top = Polygon([[0,5],[10,5],[10,10],[0,10]], closed=True,
                   facecolor='#d6eaf8', edgecolor='none', zorder=0)
warm_top = Polygon([[0,5],[10,5],[10,9],[0,9]], closed=True,
                   facecolor='#fadbd8', edgecolor='none', alpha=0.0, zorder=0)
ax2.add_patch(cold_top)

# Halvdel-deler: kald venstre, varm høyre
cold_l = Polygon([[0,5],[4.5,5],[4.5,10],[0,10]], closed=True,
                 facecolor='#d6eaf8', edgecolor='none', zorder=0)
warm_r = Polygon([[5.5,5],[10,5],[10,10],[5.5,10]], closed=True,
                 facecolor='#fadbd8', edgecolor='none', zorder=0)
mid_jet = Polygon([[4.5,5],[5.5,5],[5.5,10],[4.5,10]], closed=True,
                  facecolor='#d5f5e3', edgecolor='none', zorder=0)
ax2.add_patch(cold_l)
ax2.add_patch(warm_r)
ax2.add_patch(mid_jet)

# Vindhastighets-piler (jetstrøm) – varierende lengde
arrow_kw_fast = dict(arrowstyle='->', color='#1a252f', lw=2.0, mutation_scale=14)
arrow_kw_slow = dict(arrowstyle='->', color='#555', lw=1.2, mutation_scale=10)

y_rows = [6.0, 6.8, 7.5, 8.2, 9.0]
lengths = [1.2, 1.5, 2.8, 1.5, 1.2]  # midtre er raskest
for y, length in zip(y_rows, lengths):
    for x_start in [0.3, 2.2, 4.5 - length*0.3]:
        lw = 2.2 if length > 2 else 1.2
        col = '#1a252f' if length > 2 else '#666'
        ax2.annotate('', xy=(x_start + length * 0.85, y),
                     xytext=(x_start, y),
                     arrowprops=dict(arrowstyle='->', color=col,
                                     lw=lw, mutation_scale=12*(lw/2.2)),
                     zorder=5)

# Tekster øvre halvdel
ax2.text(5.0, 9.7, 'STRØMNINGSMØNSTER', fontsize=9, fontweight='bold',
         ha='center', color='#222', zorder=6)
ax2.text(5.0, 9.35, 'RASKERE VIND', fontsize=8, fontweight='bold',
         ha='center', color='#1a252f', zorder=6)
ax2.text(5.0, 9.05, '(>200 km/t)', fontsize=7.5, ha='center',
         color='#1a252f', zorder=6)
ax2.text(1.5, 9.35, 'LANGSOMMERE\nVIND', fontsize=7.5, ha='center',
         color='#555', zorder=6)
ax2.text(8.5, 9.35, 'LANGSOMMERE\nVIND', fontsize=7.5, ha='center',
         color='#555', zorder=6)
ax2.text(1.2, 5.5, 'POLARLUFT\n(KALD)', fontsize=8, fontweight='bold',
         ha='center', color='#1a5276', zorder=6)
ax2.text(8.8, 5.5, 'SUBTROPYSSK\nLUFT (VARM)', fontsize=8, fontweight='bold',
         ha='center', color='#922b21', zorder=6)

# Skille mellom øvre og nedre
ax2.plot([0, 10], [5.0, 5.0], 'k-', linewidth=1.2, alpha=0.4, zorder=5)

# ── Nedre halvdel: Dannelse av bølger og virvler ─────────────────
ax2.text(5.0, 4.75, 'DANNELSE AV BØLGER OG VIRVLER',
         fontsize=9, fontweight='bold', ha='center', color='#222', zorder=6)

x = np.linspace(0, 10, 500)

# Liten bølge (venstre, blå og rød)
def wave(x, x0, amp, wl, yc):
    return yc + amp * np.sin(2*np.pi*(x - x0)/wl)

# Blå strømlinje (syklonisk)
xb = np.linspace(0.2, 2.8, 200)
yb = wave(xb, 0.2, 0.3, 2.6, 3.5)
ax2.plot(xb, yb, color='#1f618d', lw=2.2, zorder=5)
ax2.annotate('', xy=(2.8, 3.5), xytext=(2.6, 3.5),
             arrowprops=dict(arrowstyle='->', color='#1f618d', lw=1.8,
                             mutation_scale=12), zorder=6)

# Rød strømlinje (antisyklonisk)
xr = np.linspace(0.2, 2.8, 200)
yr = wave(xr, 0.2, 0.3, 2.6, 2.5)
ax2.plot(xr, yr, color='#c0392b', lw=2.2, zorder=5)
ax2.annotate('', xy=(2.8, 2.5), xytext=(2.6, 2.5),
             arrowprops=dict(arrowstyle='->', color='#c0392b', lw=1.8,
                             mutation_scale=12), zorder=6)

# "LITEN BØLGE" tekst
ax2.text(0.9, 4.2, 'LITEN\nBØLGE', fontsize=7.5, ha='center', color='#333', zorder=6)
ax2.text(0.9, 1.85, 'LITEN\nBØLGE', fontsize=7.5, ha='center', color='#333', zorder=6)

# Piler mellom stegene
ax2.annotate('', xy=(3.5, 3.0), xytext=(3.0, 3.0),
             arrowprops=dict(arrowstyle='->', color='#333', lw=1.5,
                             mutation_scale=12), zorder=6)

# Rossby-bølger (midtre)
xm = np.linspace(3.5, 6.5, 300)
ym_b = wave(xm, 3.5, 0.6, 3.0, 3.5)
ym_r = wave(xm, 3.5, 0.6, 3.0, 2.5)
ax2.plot(xm, ym_b, color='#1f618d', lw=2.2, zorder=5)
ax2.plot(xm, ym_r, color='#c0392b', lw=2.2, zorder=5)
ax2.annotate('', xy=(6.5, 3.5), xytext=(6.3, 3.5),
             arrowprops=dict(arrowstyle='->', color='#1f618d', lw=1.8,
                             mutation_scale=12), zorder=6)
ax2.annotate('', xy=(6.5, 2.5), xytext=(6.3, 2.5),
             arrowprops=dict(arrowstyle='->', color='#c0392b', lw=1.8,
                             mutation_scale=12), zorder=6)
ax2.text(5.0, 4.35, 'ROSSBY-BØLGER', fontsize=8, ha='center',
         color='#333', zorder=6)

# Pil til virvler
ax2.annotate('', xy=(7.1, 3.8), xytext=(6.7, 3.5),
             arrowprops=dict(arrowstyle='->', color='#333', lw=1.5,
                             mutation_scale=12), zorder=6)
ax2.annotate('', xy=(7.1, 2.2), xytext=(6.7, 2.5),
             arrowprops=dict(arrowstyle='->', color='#333', lw=1.5,
                             mutation_scale=12), zorder=6)

# Syklonisk virvel (L) – blå, mot klokken
theta = np.linspace(0, 2*np.pi, 200)
cx_l, cy_l, r_l = 8.1, 3.85, 0.72
ax2.plot(cx_l + r_l*np.cos(theta), cy_l + r_l*np.sin(theta),
         color='#1f618d', lw=2.5, zorder=5)
# Rotasjons-piler mot klokken
for ang in [np.pi/4, 3*np.pi/4, 5*np.pi/4, 7*np.pi/4]:
    px = cx_l + r_l*np.cos(ang)
    py = cy_l + r_l*np.sin(ang)
    # tangent mot klokken
    tx = np.sin(ang) * 0.22
    ty = -np.cos(ang) * 0.22
    ax2.annotate('', xy=(px+tx, py+ty), xytext=(px, py),
                 arrowprops=dict(arrowstyle='->', color='#1f618d',
                                 lw=1.4, mutation_scale=9), zorder=6)
ax2.text(cx_l, cy_l, 'L', fontsize=13, fontweight='bold', ha='center',
         va='center', color='#1f618d', zorder=7)
ax2.text(cx_l, cy_l - r_l - 0.25, 'VIRVLER', fontsize=7.5, ha='center',
         color='#1f618d', zorder=6)

# Antisyklonisk virvel (A) – rød, med klokken
cx_a, cy_a, r_a = 8.1, 2.15, 0.72
ax2.plot(cx_a + r_a*np.cos(theta), cy_a + r_a*np.sin(theta),
         color='#c0392b', lw=2.5, zorder=5)
for ang in [np.pi/4, 3*np.pi/4, 5*np.pi/4, 7*np.pi/4]:
    px = cx_a + r_a*np.cos(ang)
    py = cy_a + r_a*np.sin(ang)
    tx = -np.sin(ang) * 0.22
    ty =  np.cos(ang) * 0.22
    ax2.annotate('', xy=(px+tx, py+ty), xytext=(px, py),
                 arrowprops=dict(arrowstyle='->', color='#c0392b',
                                 lw=1.4, mutation_scale=9), zorder=6)
ax2.text(cx_a, cy_a, 'A', fontsize=13, fontweight='bold', ha='center',
         va='center', color='#c0392b', zorder=7)
ax2.text(cx_a, cy_a - r_a - 0.25, 'ANTISYKLON\n(HØYTRYKK)', fontsize=7.5,
         ha='center', color='#c0392b', zorder=6)

# Innsatsboks: BAROTROP-forklaring
box = FancyBboxPatch((0.15, 0.15), 2.7, 1.5, boxstyle="round,pad=0.12",
                     linewidth=1.2, edgecolor='#888', facecolor='#fffff0',
                     zorder=7, transform=ax2.transData)
ax2.add_patch(box)
ax2.text(1.5, 1.45, 'BAROTROP:\nVINDHASTIGHETEN\nVARIERER HORISONTALT,\nFØRER TIL BØLGEVEKST',
         fontsize=7.0, ha='center', va='top', color='#333', zorder=8,
         linespacing=1.4)

# Panel-tittel
ax2.text(5.0, 10.3, '(b)  JETSTRØMMEN OG BAROTROP UTVIKLING',
         fontsize=11, fontweight='bold', ha='center', va='bottom', zorder=10)

# ═══════════════════════════════════════════════════════════════════
plt.savefig('illustrasjon_v2.png', dpi=180, bbox_inches='tight',
            facecolor='white')
print("Lagret: illustrasjon_v2.png")
