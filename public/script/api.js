function getLicenseCode() {
  var licenseCode = null
  $.ajax({
    url: wish3DEarthApiPre + '/wish3dearth/api/access/v1.0.0/getHardWareCode',
    type: 'get',
    dataType: "json",
    async: false,
    success: function (result) {
      licenseCode = result.data
    }
  })
  return licenseCode
}
