// test-main.js
import { greet, value, GM_xmlhttp } from './test-func.js';  // 使用相对路径导入



GM_xmlhttp("https://qq.com", "", function(response) {
    console.log("请求成功，响应内容main:", response.responseText);
});
