var existOptions = {
  publicToken: window.location.href.split("?value=")[2],
  clientUserId: encodeURIComponent(window.location.href.split("?value=")[1]),
  close: function() {
  },
  error: function(err) {
  }
}
