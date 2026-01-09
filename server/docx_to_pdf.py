import sys
from docx2pdf import convert

input_path = sys.argv[1]
output_path = sys.argv[2]

try:
    convert(input_path, output_path)
    print("SUCCESS")
except Exception as e:
    print("ERROR:", str(e))
