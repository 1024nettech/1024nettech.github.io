// test-func.js
import { GM_xmlhttp } from './workflow-loader0.js';  // 使用相对路径导入

GM_xmlhttp("https://qq.com", "", function(response) {
    console.log("请求成0功，响应内容func:", response.responseText);
});
