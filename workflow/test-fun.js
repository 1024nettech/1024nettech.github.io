window.cc=function() {
    GM_xmlhttpRequest({
        type: "GET",
                headers: {
            'Cookie': "PHPSESSID=5edvp1hrekkni9vp1pvoi0jkd3; ev_userid=1533835; ev_manager_id=0; ev_shellCode=ba31646e8165645979b4a6fb116de81c; is_hui_lian_ver=0; ev_apiToken=Manage % 40D5B6AA2B- 352A- 7909 - C24E - C2B34A7B60A8; ev_apiUserid = 1533835; is_xys = 0; website_current_place_version = tj; WAP_STYLE = 0; WAP_STYLE = 0; XCX_STYLE = 0; XCX_STYLE = 0; ev_mp = 0"
        },

        url: `http://admin.qipeiyigou.com/shops/shops_add.php?shops_id=24455853`,
        onload: function (response) {
            console.log("来自func007" + response.responseText);
        }
    });
}
