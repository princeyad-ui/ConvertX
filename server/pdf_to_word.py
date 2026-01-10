import sys
from pdf2docx import Converter

try:
    pdf = sys.argv[1]
    docx = sys.argv[2]

    cv = Converter(pdf)
    cv.convert(docx)
    cv.close()

    print("SUCCESS")
except Exception as e:
    print("ERROR:", e)
