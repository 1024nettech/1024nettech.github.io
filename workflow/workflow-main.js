GM_xmlhttpRequest({
    type: "GET",
    url: `https://qq.com`,
    onload: function (response) {
        console.log(response.responseText);
    }
});
