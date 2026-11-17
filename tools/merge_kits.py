"""Make an India-kit version of the CSK studio photo (photo 2), using the India jersey from photo 1.

usage: python -I merge.py <images_dir> <out_dir>
writes dhoni-csk.jpg (photo 2, 2x) and dhoni-india.jpg (same pose, India kit), plus debug PNGs.
"""
import sys
import cv2
import numpy as np

src_dir, out_dir = sys.argv[1], sys.argv[2]
S = 2  # work at 2x the CSK photo's size

india = cv2.imread(f"{src_dir}/1.jpg")            # 686x446, BGR
csk0 = cv2.imread(f"{src_dir}/2.jpg")             # 335x597
csk = cv2.resize(csk0, (csk0.shape[1] * S, csk0.shape[0] * S), interpolation=cv2.INTER_LANCZOS4)
H, W = csk.shape[:2]
f = csk.astype(np.float32) / 255.0
b, g, r = f[..., 0], f[..., 1], f[..., 2]

# ---- 1. where is the CSK yellow (shirt, sleeves, backdrop)? skin/hair/hands/white text excluded
hsv = cv2.cvtColor(csk, cv2.COLOR_BGR2HSV).astype(np.float32)
hh, ss = hsv[..., 0], hsv[..., 1] / 255           # OpenCV hue 0-180: skin ~5-16, CSK yellow/backdrop ~18-32
chroma = (g - b) / (g + 1e-3)                     # CSK yellow & backdrop ~0.55-0.75, skin ~0.2-0.35
rg = r - g                                         # skin ~0.12-0.25, shirt yellow ~0.0-0.06, backdrop ~0.2
c = lambda x: np.clip(x, 0, 1)
shirt_like = c((0.12 - rg) / 0.05) * c((chroma - 0.14) / 0.06) * c((g - 0.3) / 0.06)
backdrop_like = c((chroma - 0.42) / 0.08) * c((g - 0.12) / 0.06)
yellow = np.maximum(shirt_like, backdrop_like).astype(np.float32)
yellow = cv2.morphologyEx(yellow, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)))  # fill specks
yellow = cv2.GaussianBlur(yellow, (0, 0), 1.2)

# ---- 2. India blue sampled from plain jersey areas of photo 1
patch = np.concatenate([india[300:340, 330:380].reshape(-1, 3), india[230:280, 380:400].reshape(-1, 3)]).astype(np.float32) / 255
blue = np.median(patch, axis=0)                          # BGR
lum = 0.114 * b + 0.587 * g + 0.299 * r
ref = np.median(lum[yellow > 0.9])
blue_lum = 0.114 * blue[0] + 0.587 * blue[1] + 0.299 * blue[2]
k = np.clip(lum / ref, 0, 1.6)[..., None]
recol = np.clip(blue[None, None, :] * k * 1.02, 0, 1)
indiafied = f * (1 - yellow[..., None]) + recol * yellow[..., None]

# ---- 3. warp photo 1's torso onto photo 2's torso
p1 = np.float32([[222, 150], [398, 158], [395, 375], [232, 375], [322, 168]])
p2 = np.float32([[95, 234], [243, 232], [248, 492], [92, 492], [166, 246]]) * S
Hm, _ = cv2.findHomography(p1, p2, 0)
warp = cv2.warpPerspective(india, Hm, (W, H), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE).astype(np.float32) / 255

torso = np.zeros((H, W), np.uint8)
poly = np.int32(np.array([
    [96, 238], [138, 216], [166, 248], [195, 214], [242, 234],
    [251, 280], [253, 350], [249, 416], [222, 428], [216, 452], [240, 470], [246, 494],
    [92, 494], [100, 470], [122, 452], [120, 428], [88, 414], [84, 350], [88, 280],
]) * S)
cv2.fillPoly(torso, [poly], 255)
tmask = cv2.GaussianBlur(torso.astype(np.float32) / 255, (0, 0), 2.5 * S / 2)
# keep skin (neck in the V, fingers at the hips) from the original: low hue, saturated, not dark
skin = (c((rg - 0.07) / 0.04) * c((0.3 - rg) / 0.04) * c((0.42 - chroma) / 0.06) * c((lum - 0.2) / 0.05)).astype(np.float32)
skin = cv2.GaussianBlur(cv2.morphologyEx(skin, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))), (0, 0), 1.5)
# keep the photographer's watermark: its light letters stay from the original
wm = np.zeros((H, W), np.float32)
wm[472 * S:492 * S, 172 * S:222 * S] = 1
wm = wm * np.clip((lum - 0.78) / 0.08, 0, 1)
tmask = tmask * (1 - np.maximum(skin, cv2.GaussianBlur(wm, (0, 0), 0.8)))

# ---- 4. match the warped torso's brightness to the studio-lit, recoloured torso (Lab L channel)
def lab(x): return cv2.cvtColor((np.clip(x, 0, 1) * 255).astype(np.uint8), cv2.COLOR_BGR2LAB).astype(np.float32)
sel = tmask > 0.6
A, B = lab(warp), lab(indiafied)
for c, w_ in ((0, 1.0), (1, 0.6), (2, 0.6)):
    ma, sa = A[..., c][sel].mean(), A[..., c][sel].std() + 1e-3
    mb, sb = B[..., c][sel].mean(), B[..., c][sel].std() + 1e-3
    adj = (A[..., c] - ma) * (sb / sa) ** (0.5 * w_) + (ma + (mb - ma) * w_)
    A[..., c] = adj
warp_m = cv2.cvtColor(np.clip(A, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR).astype(np.float32) / 255

out = indiafied * (1 - tmask[..., None]) + warp_m * tmask[..., None]

cv2.imwrite(f"{out_dir}/dhoni-csk.jpg", csk, [cv2.IMWRITE_JPEG_QUALITY, 88, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
cv2.imwrite(f"{out_dir}/dhoni-india.jpg", (np.clip(out, 0, 1) * 255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 88, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
dbg = np.hstack([csk, (np.clip(out, 0, 1) * 255).astype(np.uint8), cv2.cvtColor((tmask * 255).astype(np.uint8), cv2.COLOR_GRAY2BGR)])
cv2.imwrite(f"{out_dir}/debug.jpg", cv2.resize(dbg, (dbg.shape[1] // 2, dbg.shape[0] // 2)))
print("blue BGR", np.round(blue, 3), "ref lum", round(float(ref), 3))
