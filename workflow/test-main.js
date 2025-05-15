// test-main.js
import { greet, value } from './test-func.js';  // 使用相对路径导入

greet();  // 调用 test-func.js 中的 greet 函数
console.log(value);  // 输出 test-func.js 中的 value

