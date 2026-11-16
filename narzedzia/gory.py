"""Generuje warstwy 'wydartego papieru' (góry Orawy) do sekcji hero.
Uruchom: python3 narzedzia/gory.py  (zapisuje assets/svg/warstwa-*.svg)"""
import math, random, os

W, H = 1440, 640
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "svg")

def profile(keys, step=6, rough=2.2, seed=1):
    """keys: lista (x, y) punktów sylwetki; zwraca gęstą, 'postrzępioną' krawędź."""
    rnd = random.Random(seed)
    pts = []
    for (x0, y0), (x1, y1) in zip(keys, keys[1:]):
        n = max(1, int(abs(x1 - x0) / step))
        for i in range(n):
            t = i / n
            s = (1 - math.cos(t * math.pi)) / 2  # miękkie przejście
            x = x0 + (x1 - x0) * t
            y = y0 + (y1 - y0) * s
            y += rnd.uniform(-rough, rough) + math.sin(x * 0.05 + seed) * rough * 0.6
            pts.append((x, y))
    pts.append(keys[-1])
    return pts

def path(pts, bottom=H):
    d = f"M{pts[0][0]:.1f},{bottom} " + " ".join(f"L{x:.1f},{y:.1f}" for x, y in pts)
    return d + f" L{pts[-1][0]:.1f},{bottom} Z"

def edge(pts, dy=-2.5, seed=7):
    rnd = random.Random(seed)
    return "M" + " L".join(f"{x:.1f},{y + dy + rnd.uniform(-1.2, 1.2):.1f}" for x, y in pts)

def layer(name, keys, fill, fiber, seed, rough=2.2, fiber_w=5):
    pts = profile(keys, rough=rough, seed=seed)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <filter id="p{seed}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="{seed}" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .07 0"/>
      <feComposite in2="SourceGraphic" operator="in" result="t"/>
      <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="t"/></feMerge>
    </filter>
  </defs>
  <path d="{edge(pts, seed=seed)}" fill="none" stroke="{fiber}" stroke-width="{fiber_w}" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="{path(pts)}" fill="{fill}" filter="url(#p{seed})"/>
</svg>
'''
    with open(os.path.join(OUT, f"warstwa-{name}.svg"), "w") as f:
        f.write(svg)

# Sylwetki opadają w lewo, żeby tekst po lewej stronie był zawsze na czystym papierze.
# 1. Tatry w oddali (jasne, ostre szczyty)
layer("1-tatry", [(0, 560), (200, 548), (420, 520), (600, 470), (700, 430), (780, 392), (850, 330), (900, 352),
                  (960, 290), (1010, 322), (1070, 262), (1120, 300), (1190, 276), (1260, 312), (1340, 296), (1440, 318)],
      "#D9CFBD", "#F7F2E8", seed=3, rough=1.4)
# 2. Babia Góra (szałwiowa zieleń, łagodna kopuła)
layer("2-babia", [(0, 590), (260, 576), (520, 548), (720, 500), (880, 440), (1000, 392), (1100, 368), (1180, 372),
                  (1300, 400), (1440, 420)],
      "#7D8B69", "#EFE8DA", seed=5, rough=2.0)
# 3. Pas terakoty (pagórek pod kościołem)
layer("3-pagorek", [(0, 612), (300, 600), (560, 580), (780, 548), (960, 500), (1120, 478), (1300, 470), (1440, 480)],
      "#C26A43", "#F3EDE2", seed=9, rough=2.4)
# 4. Ciemna zieleń na pierwszym planie
layer("4-las", [(0, 626), (320, 618), (620, 606), (860, 586), (1080, 566), (1260, 560), (1440, 552)],
      "#33463A", "#E9E0CF", seed=11, rough=2.6)
# 5. Papier strony (łączy hero z treścią)
layer("5-papier", [(0, 634), (300, 630), (640, 636), (980, 628), (1240, 633), (1440, 628)],
      "#F4EEE3", "#FFFDF8", seed=13, rough=1.6, fiber_w=3)
print("OK")
