GM_xmlhttpRequest({
    type: "GET",
    url: `http://admin.qipeiyigou.com/shops/shops_add.php?shops_id=24455853`,
    onload: function (response) {
        console.log("来自main" + response.responseText);
    }
});