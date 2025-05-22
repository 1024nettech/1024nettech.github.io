import openpyxl

# 创建一个 Excel 文件
wb = openpyxl.Workbook()
ws = wb.active
ws['A1'] = 'Hello, World!'

# 保存到文件
wb.save('generated_template.xlsx')
