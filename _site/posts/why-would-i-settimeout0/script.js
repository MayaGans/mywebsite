function long_running(statusId) {
  var result = 0;
  for (var i = 0; i < 1000; i++) {
    for (var j = 0; j < 700; j++) {
      for (var k = 0; k < 300; k++) {
        result = result + i + j + k;
      }
    }
  }
  status_update(statusId, `Done!`);
}

function status_update(statusId, message) {
  document.getElementById(statusId).innerHTML = message;
}

doBtn = () => {
  long_running("status");
  status_update("status", "calculating...");
}

doOkBtn = () => {
  setTimeout(function() {
    long_running("status_ok");
  }, 0);
  status_update("status_ok", "calculating....");
}