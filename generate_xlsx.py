import requests

# 定义 URL
url = "http://clzl.qipeiyigou.com/dom/AutoParts/ClzlProList.php?username=cheliangzulin&source_type=2&search_ch_id=19366465&big_abbr=A"

# 请求页面
response = requests.get(url)

# 检查响应是否成功
if response.status_code == 200:
    try:
        # 获取响应的原始文本内容
        response_text = response.text

        # 保存为 txt 文件
        file_path = "response_data.txt"
        with open(file_path, "w", encoding="utf-8") as txt_file:
            txt_file.write(response_text)
        
        print(f"数据已成功保存到 {file_path}")

    except Exception as e:
        print(f"保存数据时发生错误: {e}")
else:
    print(f"请求失败，状态码: {response.status_code}")
