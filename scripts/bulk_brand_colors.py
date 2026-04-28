#!/usr/bin/env python3
"""일괄: rgba(0,0,0)→브라운, 연회색 hex→토큰, stone/neutral/gray Tailwind→브랜드."""
from __future__ import annotations

import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {"node_modules", "dist", ".git"}
EXTS = {".tsx", ".jsx", ".css", ".html"}

HEX6_SUBS = [
    ("#f9f9f9", "var(--palette-bg-2)"),
    ("#fafafa", "var(--palette-bg-2)"),
    ("#f5f5f5", "var(--palette-bg-2)"),
    ("#f0f0f0", "var(--border-hairline)"),
    ("#eeeeee", "var(--border-hairline)"),
    ("#e5e5e5", "var(--border-divider)"),
    ("#e0e0e0", "var(--border-divider)"),
    ("#d0d0d0", "var(--border-color-light)"),
    ("#dddddd", "var(--border-divider)"),
    ("#cccccc", "var(--border-color-light)"),
    ("#f4f3ef", "var(--palette-bg-2)"),
    ("#d4d0c8", "var(--border-divider)"),
    ("#e8e4e4", "var(--palette-bg-2)"),
]

TEXT_HEX6 = [
    ("#3d3d3d", "var(--charcoal)"),
    ("#3d3836", "var(--charcoal)"),
    ("#333333", "var(--charcoal)"),
    ("#444444", "var(--charcoal)"),
    ("#555555", "var(--warm-gray)"),
    ("#666666", "var(--warm-gray)"),
    ("#6b6b6b", "var(--warm-gray)"),
    ("#6b6560", "var(--warm-gray)"),
    ("#888888", "var(--gray-light)"),
    ("#999999", "var(--muted)"),
    ("#9a9a9a", "var(--muted)"),
    ("#a0a0a0", "var(--muted)"),
    ("#b2b2b2", "var(--palette-bg-1)"),
]

HEX3_SUBS = [
    ("#ccc", "var(--border-color-light)"),
    ("#ddd", "var(--border-divider)"),
    ("#eee", "var(--border-hairline)"),
    ("#333", "var(--charcoal)"),
    ("#666", "var(--warm-gray)"),
    ("#888", "var(--gray-light)"),
    ("#999", "var(--muted)"),
]

SHORT_HEX = re.compile(r"(?<![0-9a-fA-F#])#([0-9a-fA-F]{3})(?![0-9a-fA-F])")
LONG_HEX = re.compile(r"#([0-9a-fA-F]{6})(?![0-9a-fA-F])")
RGBA_BLACK = re.compile(r"rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*([^)]+)\)", re.I)


def sub_rgba_black(m: re.Match) -> str:
    return f"rgba(26, 10, 5, {m.group(1).strip()})"


def replace_hex_ci(s: str, old: str, new: str) -> str:
    esc = re.escape(old)

    def repl(_: re.Match) -> str:
        return new

    return re.sub(r"(?<![0-9a-fA-F#])" + esc + r"(?![0-9a-fA-F])", repl, s, flags=re.I)


def replace_long_hexes(s: str, mapping: list[tuple[str, str]]) -> str:
    def repl(m: re.Match) -> str:
        key = m.group(0).lower()
        for old, new in mapping:
            if old.lower() == key:
                return new
        return m.group(0)

    return LONG_HEX.sub(repl, s)


def replace_short_hexes(s: str, mapping: list[tuple[str, str]]) -> str:
    def repl(m: re.Match) -> str:
        key = m.group(0).lower()
        for old, new in mapping:
            if old.lower() == key:
                return new
        return m.group(0)

    return SHORT_HEX.sub(repl, s)


# text-stone-N
TEXT_STONE: dict[str, str] = {
    "950": "black",
    "900": "black",
    "800": "charcoal",
    "700": "charcoal",
    "600": "warm-gray",
    "500": "warm-gray",
    "400": "muted",
    "300": "gray-light",
    "200": "gray-lighter",
    "100": "charcoal",
    "50": "muted",
}

# border-stone-N
BORDER_STONE: dict[str, str] = {
    "950": "black",
    "900": "black",
    "800": "charcoal",
    "700": "charcoal",
    "600": "warm-gray",
    "500": "muted",
    "400": "[color:var(--border-color-light)]",
    "300": "[color:var(--border-divider)]",
    "200": "[color:var(--border-hairline)]",
    "100": "[color:var(--border-hairline)]",
    "50": "[color:var(--border-hairline)]",
}

# bg-stone-N
BG_STONE: dict[str, str] = {
    "950": "black",
    "900": "black",
    "800": "charcoal",
    "700": "charcoal",
    "600": "[rgba(26,10,5,0.08)]",
    "500": "[rgba(26,10,5,0.06)]",
    "400": "[rgba(26,10,5,0.05)]",
    "300": "[rgba(26,10,5,0.04)]",
    "200": "[rgba(26,10,5,0.05)]",
    "100": "eggshell",
    "50": "cream",
}

OUTLINE_STONE = {k: v for k, v in BORDER_STONE.items()}
RING_STONE = {k: v for k, v in BORDER_STONE.items()}
DIVIDE_STONE = {k: v for k, v in BORDER_STONE.items()}

# shadow: 모두 브랜드 black (#1A0A05) 기반 그림자
GRAD_STONE = TEXT_STONE.copy()


def apply_tone_map(s: str, prefix: str, tmap: dict[str, str]) -> str:
    for shade, token in tmap.items():
        rx = re.compile(rf"\b{re.escape(prefix)}stone-{shade}(/[\w.[\]%]+)?\b")

        def make(m: re.Match) -> str:
            op = m.group(1) or ""
            return f"{prefix}{token}{op}"

        s = rx.sub(make, s)
    return s


def apply_neutral(s: str, prefix: str, tmap: dict[str, str]) -> str:
    for shade, token in tmap.items():
        rx = re.compile(rf"\b{re.escape(prefix)}neutral-{shade}(/[\w.[\]%]+)?\b")

        def make(m: re.Match) -> str:
            op = m.group(1) or ""
            return f"{prefix}{token}{op}"

        s = rx.sub(make, s)
    return s


def subst_gray_text(s: str) -> str:
    mp = {
        "900": "black",
        "800": "charcoal",
        "700": "charcoal",
        "600": "warm-gray",
        "500": "warm-gray",
        "400": "muted",
        "300": "gray-light",
        "200": "gray-lighter",
    }
    for n, tok in mp.items():
        rx = re.compile(rf"\btext-gray-{n}(/[\w.%]+)?\b")

        def make(m: re.Match, t=tok) -> str:
            return f"text-{t}{m.group(1) or ''}"

        s = rx.sub(make, s)
    return s


def subst_gray_border(s: str) -> str:
    mp = {
        "900": "black",
        "800": "charcoal",
        "700": "charcoal",
        "600": "warm-gray",
        "500": "muted",
        "400": "[color:var(--border-divider)]",
        "300": "[color:var(--border-divider)]",
        "200": "[color:var(--border-hairline)]",
    }
    for n, tok in mp.items():
        rx = re.compile(rf"\bborder-gray-{n}(/[\w.%]+)?\b")

        def make(m: re.Match, t=tok) -> str:
            return f"border-{t}{m.group(1) or ''}"

        s = rx.sub(make, s)
    return s


def subst_gray_bg(s: str) -> str:
    mp = {
        "900": "black",
        "800": "charcoal",
        "200": "[rgba(26,10,5,0.04)]",
        "100": "eggshell",
        "50": "cream",
    }
    for n, tok in mp.items():
        rx = re.compile(rf"\bbg-gray-{n}(/[\w.%]+)?\b")

        def make(m: re.Match, t=tok) -> str:
            return f"bg-{t}{m.group(1) or ''}"

        s = rx.sub(make, s)
    return s


def process_file(path: str) -> bool:
    try:
        with open(path, encoding="utf-8") as f:
            s = f.read()
    except (OSError, UnicodeDecodeError):
        return False
    orig = s

    s = RGBA_BLACK.sub(sub_rgba_black, s)

    for old, new in HEX6_SUBS:
        s = replace_hex_ci(s, old, new)
    for old, new in TEXT_HEX6:
        s = replace_hex_ci(s, old, new)

    s = replace_long_hexes(s, HEX6_SUBS)
    s = replace_long_hexes(s, TEXT_HEX6)
    s = replace_short_hexes(s, HEX3_SUBS)

    s = apply_tone_map(s, "text-", TEXT_STONE)
    s = apply_neutral(s, "text-", TEXT_STONE)
    s = apply_tone_map(s, "border-", BORDER_STONE)
    s = apply_neutral(s, "border-", BORDER_STONE)
    s = apply_tone_map(s, "bg-", BG_STONE)
    s = apply_neutral(s, "bg-", BG_STONE)
    s = apply_tone_map(s, "outline-", OUTLINE_STONE)
    s = apply_neutral(s, "outline-", OUTLINE_STONE)
    s = apply_tone_map(s, "ring-", RING_STONE)
    s = apply_neutral(s, "ring-", RING_STONE)
    s = apply_tone_map(s, "divide-", DIVIDE_STONE)
    s = apply_neutral(s, "divide-", DIVIDE_STONE)

    for fam in ("stone", "neutral"):
        for shade in TEXT_STONE:
            rx = re.compile(rf"\bshadow-{fam}-{shade}(/[\w.[\]%]+)?\b")

            def make_shadow(m: re.Match) -> str:
                return f"shadow-black{m.group(1) or ''}"

            s = rx.sub(make_shadow, s)

    # gradient from/via/to
    for pfx in ("from-", "via-", "to-"):
        s = apply_tone_map(s, pfx, GRAD_STONE)
        s = apply_neutral(s, pfx, GRAD_STONE)

    s = subst_gray_text(s)
    s = subst_gray_border(s)
    s = subst_gray_bg(s)

    # placeholder-stone (rare)
    s = apply_tone_map(s, "placeholder-", TEXT_STONE)

    if s != orig:
        with open(path, "w", encoding="utf-8") as f:
            f.write(s)
        return True
    return False


def main() -> None:
    changed = []
    for dirpath, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith(".")]
        for fn in files:
            if os.path.splitext(fn)[1].lower() not in EXTS:
                continue
            path = os.path.join(dirpath, fn)
            if process_file(path):
                changed.append(path)
    print(f"updated {len(changed)} files", file=sys.stderr)
    for p in sorted(changed)[:80]:
        print(os.path.relpath(p, ROOT))
    if len(changed) > 80:
        print("...", file=sys.stderr)


if __name__ == "__main__":
    main()
