self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
    const originalUrl = 'https://search01.shengcaiyoushu.com/test/assets/index-BLpNU3jI.js';
    const newUrl = 'https://1024nettech.github.io/workflow/custom/js/index-BLpNU3jI.js';

    if (event.request.url === originalUrl) {
        event.respondWith(fetch(newUrl)); // 返回新的资源
    } else {
        event.respondWith(fetch(event.request)); // 其他请求正常处理
    }
});
