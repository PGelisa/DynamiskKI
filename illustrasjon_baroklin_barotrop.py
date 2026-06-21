import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch
from matplotlib.colors import LinearSegmentedColormap

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
fig.patch.set_facecolor('#f8f9fa')

# ── Panel (a): Baroklin instabilitet ──────────────────────────────────────────

ax1.set_facecolor('#e8f4f8')
ax1.set_xlim(0, 10)
ax1.set_ylim(0, 8)
ax1.set_aspect('equal')

# Temperaturflater (hellende isotermer)
n_isotherms = 6
for i, (y_left, y_right, color) in enumerate(zip(
        np.linspace(1.0, 5.5, n_isotherms),
        np.linspace(2.5, 7.0, n_isotherms),
        plt.cm.RdYlBu_r(np.linspace(0.15, 0.85, n_isotherms)))):
    ax1.plot([0, 10], [y_left, y_right], color=color, linewidth=2.0, alpha=0.85)

# Kald / varm luft-soner
ax1.fill_between([0, 10], [1.0, 2.5], [0, 0], color='#aed6f1', alpha=0.35)
ax1.fill_between([0, 10], [5.5, 7.0], [8, 8], color='#f1948a', alpha=0.25)

# Polarfront-linje
ax1.plot([0, 10], [3.0, 4.8], color='#1a5276', linewidth=2.8,
         linestyle='--', label='Polarfront')

# Varm luft stiger (røde piler)
for x in [6.5, 8.0]:
    ax1.annotate('', xy=(x + 0.6, 6.5), xytext=(x, 4.9),
                 arrowprops=dict(arrowstyle='->', color='#c0392b',
                                 lw=2.2, mutation_scale=16))

# Kald luft synker (blå piler)
for x in [2.0, 3.5]:
    ax1.annotate('', xy=(x - 0.5, 1.0), xytext=(x, 3.1),
                 arrowprops=dict(arrowstyle='->', color='#1f618d',
                                 lw=2.2, mutation_scale=16))

# Etiketter
ax1.text(1.2, 6.8, 'Varm luft', fontsize=10, color='#922b21', fontstyle='italic')
ax1.text(1.2, 0.3, 'Kald luft', fontsize=10, color='#1a5276', fontstyle='italic')
ax1.text(4.5, 4.55, 'Polarfront', fontsize=9, color='#1a5276', rotation=9)

# Isoterm-etiketter
for i, (T, y) in enumerate(zip(
        ['-20°C', '-10°C', '0°C', '10°C', '20°C', '30°C'],
        np.linspace(1.0, 5.5, n_isotherms))):
    ax1.text(10.05, np.linspace(2.5, 7.0, n_isotherms)[i], T,
             fontsize=7.5, va='center', color='#555')

ax1.set_title('(a) Baroklin instabilitet\n(vertikalt tverrsnitt over polarfront)',
              fontsize=11, fontweight='bold', pad=10)
ax1.set_xlabel('Horisontal avstand  →  (sør → nord)', fontsize=9)
ax1.set_ylabel('Høyde', fontsize=9)
ax1.set_xticks([])
ax1.set_yticks([])

# ── Panel (b): Barotrop instabilitet ─────────────────────────────────────────

ax2.set_facecolor('#eaf4ea')
ax2.set_xlim(0, 12)
ax2.set_ylim(0, 10)

x = np.linspace(0, 12, 400)

# Jetstrøm: tre strømlinjebånd (rask midt, saktere kanter)
def jet_y(x, y0, amplitude, phase, wavelen):
    return y0 + amplitude * np.sin(2 * np.pi * x / wavelen + phase)

speeds   = [0.55, 1.0, 0.55]   # relativ vindhastighet per bånd
y_centers= [3.5, 5.0, 6.5]
amplitudes=[0.55, 0.9, 0.55]
phases   = [0.3, 0.0, -0.3]
wavelens = [8.0, 7.5, 8.0]
colors   = ['#27ae60', '#145a32', '#27ae60']
lws      = [2.0, 3.2, 2.0]

for y0, amp, ph, wl, col, lw in zip(y_centers, amplitudes, phases, wavelens,
                                      colors, lws):
    y_vals = jet_y(x, y0, amp, ph, wl)
    ax2.plot(x, y_vals, color=col, linewidth=lw, alpha=0.9)

# Fargebånd for vindhastighet (vind-shear)
for yi in np.linspace(2.0, 8.0, 80):
    dist = abs(yi - 5.0) / 3.0          # 0 = midten, 1 = kant
    speed_color = plt.cm.YlOrRd(0.9 - 0.6 * dist)
    ax2.axhline(yi, color=speed_color, linewidth=3.5, alpha=0.12, zorder=0)

# Voksende bølge → virvler mot høyre
# Cyclonisk virvel (mot klokken, lavtrykk)
theta = np.linspace(0, 2 * np.pi, 60)
for (cx, cy, r, col, label) in [
        (9.5, 6.8, 0.65, '#c0392b', 'L'),
        (10.5, 3.2, 0.65, '#1f618d', 'H')]:
    ax2.plot(cx + r * np.cos(theta), cy + r * np.sin(theta),
             color=col, linewidth=1.8, linestyle='-')
    # Rotasjons-piler
    for angle in [np.pi/4, 3*np.pi/4, 5*np.pi/4, 7*np.pi/4]:
        dx = -np.sin(angle) * 0.18 * (1 if col == '#c0392b' else -1)
        dy =  np.cos(angle) * 0.18 * (1 if col == '#c0392b' else -1)
        ax2.annotate('', xy=(cx + r*np.cos(angle) + dx,
                              cy + r*np.sin(angle) + dy),
                     xytext=(cx + r*np.cos(angle),
                              cy + r*np.sin(angle)),
                     arrowprops=dict(arrowstyle='->', color=col,
                                     lw=1.4, mutation_scale=10))
    ax2.text(cx, cy, label, ha='center', va='center',
             fontsize=11, fontweight='bold', color=col)

# Hastighets-piler langs venstre kant
for yi, speed in zip([3.5, 5.0, 6.5], [0.55, 1.0, 0.55]):
    ax2.annotate('', xy=(0.8 + speed * 1.5, yi), xytext=(0.2, yi),
                 arrowprops=dict(arrowstyle='->', color='#145a32',
                                 lw=1.8 + speed, mutation_scale=14))

ax2.text(0.15, 7.6, 'Langsom', fontsize=8, color='#145a32')
ax2.text(0.15, 5.15, 'Rask', fontsize=8.5, color='#145a32', fontweight='bold')
ax2.text(0.15, 3.15, 'Langsom', fontsize=8, color='#145a32')

ax2.text(9.3, 7.65, 'Virvel\n(L)', fontsize=8, color='#c0392b', ha='center')
ax2.text(10.4, 2.25, 'Virvel\n(H)', fontsize=8, color='#1f618d', ha='center')

# Bølge-pil (indikerer vekst)
ax2.annotate('Bølge\nvokser', xy=(7.5, 5.0), xytext=(5.8, 7.8),
             fontsize=8.5, color='#6c3483',
             arrowprops=dict(arrowstyle='->', color='#6c3483',
                             lw=1.5, mutation_scale=12))

ax2.set_title('(b) Barotrop instabilitet\n(jetstrøm sett ovenfra)',
              fontsize=11, fontweight='bold', pad=10)
ax2.set_xlabel('Strømretning  →  (vest → øst)', fontsize=9)
ax2.set_ylabel('Tverrsnitt  (sør ← → nord)', fontsize=9)
ax2.set_xticks([])
ax2.set_yticks([])

# ── Felles tittel ─────────────────────────────────────────────────────────────

fig.suptitle('Baroklin og barotrop instabilitet', fontsize=14,
             fontweight='bold', y=1.01)

plt.tight_layout()
plt.savefig('illustrasjon_baroklin_barotrop.png', dpi=180,
            bbox_inches='tight', facecolor=fig.get_facecolor())
print("Lagret: illustrasjon_baroklin_barotrop.png")
plt.show()
