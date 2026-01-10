import sys
from docx2pdf import convert

try:
    src = sys.argv[1]
    out = sys.argv[2]

    convert(src, out)

    print("SUCCESS")
except Exception as e:
    print("ERROR:", e)
