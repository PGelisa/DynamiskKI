import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyArrowPatch

fig, ax = plt.subplots(1, 1, figsize=(6, 8))
ax.set_xlim(0, 10)
ax.set_ylim(0, 12)
ax.axis('off')

def draw_box_3d(ax, x, y, w, h, d=0.8, color='white', edgecolor='black', lw=2):
    # Front face
    front = plt.Polygon([[x, y], [x+w, y], [x+w, y+h], [x, y+h]],
                        closed=True, facecolor=color, edgecolor=edgecolor, linewidth=lw)
    ax.add_patch(front)
    # Top face
    top = plt.Polygon([[x, y+h], [x+w, y+h], [x+w+d, y+h+d*0.5], [x+d, y+h+d*0.5]],
                      closed=True, facecolor='#f0f0f0', edgecolor=edgecolor, linewidth=lw)
    ax.add_patch(top)
    # Right face
    right = plt.Polygon([[x+w, y], [x+w+d, y+d*0.5], [x+w+d, y+h+d*0.5], [x+w, y+h]],
                        closed=True, facecolor='#e0e0e0', edgecolor=edgecolor, linewidth=lw)
    ax.add_patch(right)
    # Dashed back edges
    ax.plot([x, x+d], [y+h, y+h+d*0.5], '--', color='gray', lw=1)
    ax.plot([x+d, x+d+w], [y+h+d*0.5, y+h+d*0.5], '--', color='gray', lw=1)
    ax.plot([x+d, x+d], [y+d*0.5, y+h+d*0.5], '--', color='gray', lw=1)

def arrow(ax, x, y, dx, dy, color, hw=0.25, hl=0.35, lw=3):
    ax.annotate('', xy=(x+dx, y+dy), xytext=(x, y),
                arrowprops=dict(arrowstyle=f'->', color=color,
                                lw=lw,
                                mutation_scale=30,
                                shrinkA=0, shrinkB=0))

# --- Upper box ---
draw_box_3d(ax, 1.5, 6.5, 4.5, 3.0, d=1.0)

# --- Lower box ---
draw_box_3d(ax, 1.5, 2.5, 4.5, 3.0, d=1.0)

# --- Dashed line at Δz boundary ---
ax.plot([1.5, 6.0], [6.5, 6.5], '--', color='gray', lw=1.2)
ax.plot([6.0, 7.0], [6.5, 6.95], '--', color='gray', lw=1.2)

# --- Δz bracket ---
ax.annotate('', xy=(7.2, 6.5), xytext=(7.2, 7.5),
            arrowprops=dict(arrowstyle='|-|', color='#3344cc', lw=1.5))
ax.text(7.5, 7.0, r'$\Delta z$', fontsize=16, color='black', va='center')

# --- P2 arrow (down, top of upper box) ---
ax.annotate('', xy=(3.8, 7.2), xytext=(3.8, 9.2),
            arrowprops=dict(arrowstyle='->', color='#c0145a', lw=4,
                            mutation_scale=35, shrinkA=0, shrinkB=0))
ax.text(4.7, 8.5, r'$P_2$', fontsize=20, color='#c0145a', fontweight='bold')

# --- G arrow (down, left side at middle) ---
ax.annotate('', xy=(0.5, 4.8), xytext=(0.5, 6.8),
            arrowprops=dict(arrowstyle='->', color='#1a6b1a', lw=4,
                            mutation_scale=35, shrinkA=0, shrinkB=0))
ax.text(-0.1, 6.0, r'$G$', fontsize=20, color='#1a6b1a', fontweight='bold')

# --- P1 arrow (up, bottom of lower box) ---
ax.annotate('', xy=(3.8, 5.2), xytext=(3.8, 3.0),
            arrowprops=dict(arrowstyle='->', color='#c0145a', lw=4,
                            mutation_scale=35, shrinkA=0, shrinkB=0))
ax.text(4.7, 3.8, r'$P_1$', fontsize=20, color='#c0145a', fontweight='bold')

# --- Equation at bottom ---
ax.text(5.0, 0.8, r'$\Delta P = |P_1| - |P_2|$', fontsize=20,
        color='#c0145a', fontweight='bold', ha='center')

plt.tight_layout()
plt.savefig('trykk_diagram.png', dpi=150, bbox_inches='tight', facecolor='white')
plt.show()
print("Lagret som trykk_diagram.png")
