#!/bin/sh

# Requirements: python 3+, fonttools & brotli python packages

SRC_DIR="./scripts/fonts"
DIST_DIR="./src/fonts"
LAYOUT_FEATURES="ccmp,locl,mark,mkmk,kern,cpsp,liga"
UNICODE_CHARACTERS="U+0000-00BE,U+0131,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
OPTIONS="--no-hinting --desubroutinize"

# PT Sans, Regualr 
pyftsubset "$SRC_DIR/PTSans-Regular.ttf" --output-file="$DIST_DIR/PTSans-Regular-latin.woff2" --flavor=woff2 --layout-features=$LAYOUT_FEATURES $OPTIONS --unicodes=$UNICODE_CHARACTERS
pyftsubset "$SRC_DIR/PTSans-Regular.ttf" --output-file="$DIST_DIR/PTSans-Regular-latin.woff" --flavor=woff --layout-features=$LAYOUT_FEATURES $OPTIONS --unicodes=$UNICODE_CHARACTERS


# PT Sans, Bold
pyftsubset "$SRC_DIR/PTSans-Bold.ttf" --output-file="$DIST_DIR/PTSans-Bold-latin.woff2" --flavor=woff2 --layout-features=$LAYOUT_FEATURES $OPTIONS --unicodes=$UNICODE_CHARACTERS
pyftsubset "$SRC_DIR/PTSans-Bold.ttf" --output-file="$DIST_DIR/PTSans-Bold-latin.woff" --flavor=woff --layout-features=$LAYOUT_FEATURES $OPTIONS --unicodes=$UNICODE_CHARACTERS


# PT Sans, Italic
pyftsubset "$SRC_DIR/PTSans-Italic.ttf" --output-file="$DIST_DIR/PTSans-Italic-latin.woff2" --flavor=woff2 --layout-features=$LAYOUT_FEATURES $OPTIONS --unicodes=$UNICODE_CHARACTERS
pyftsubset "$SRC_DIR/PTSans-Italic.ttf" --output-file="$DIST_DIR/PTSans-Italic-latin.woff" --flavor=woff --layout-features=$LAYOUT_FEATURES $OPTIONS --unicodes=$UNICODE_CHARACTERS


# PT Sans, Bold+Italic
pyftsubset "$SRC_DIR/PTSans-BoldItalic.ttf" --output-file="$DIST_DIR/PTSans-BoldItalic-latin.woff2" --flavor=woff2 --layout-features=$LAYOUT_FEATURES $OPTIONS --unicodes=$UNICODE_CHARACTERS
pyftsubset "$SRC_DIR/PTSans-BoldItalic.ttf" --output-file="$DIST_DIR/PTSans-BoldItalic-latin.woff" --flavor=woff --layout-features=$LAYOUT_FEATURES $OPTIONS --unicodes=$UNICODE_CHARACTERS


# SteinAntik
pyftsubset "$SRC_DIR/SteinAntik-Regular.ttf" --output-file="$DIST_DIR/SteinAntik-Regular-latin.woff2" --flavor=woff2 --layout-features=$LAYOUT_FEATURES $OPTIONS --text="ADI SEGAL PHOTOGRAPHY"
pyftsubset "$SRC_DIR/SteinAntik-Regular.ttf" --output-file="$DIST_DIR/SteinAntik-Regular-latin.woff" --flavor=woff --layout-features=$LAYOUT_FEATURES $OPTIONS --text="ADI SEGAL PHOTOGRAPHY"
