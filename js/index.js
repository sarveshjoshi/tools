function jsonExpand() {
  var jsonFormatArea = document.querySelector("#json-format-area");
  try {
    jsonFormatArea.value = JSON.stringify(JSON.parse(jsonFormatArea.value), null, 2);
  } catch(ex) {
    alert(ex.message);
  }
}

function jsonMinify() {
  var jsonFormatArea = document.querySelector("#json-format-area");
  try {
    jsonFormatArea.value = JSON.stringify(JSON.parse(jsonFormatArea.value));
  } catch(ex) {
    alert(ex.message);
  }
}

function jsonCopy() {
  var jsonFormatArea = document.querySelector("#json-format-area");
  jsonFormatArea.focus();
  jsonFormatArea.select();
  try {
    var successful = document.execCommand('copy');
    document.getSelection().empty()
  } catch(ex) {
    alert(ex.message);
  }
}

function xmlExpand() {
  var xmlFormatArea = document.querySelector("#xml-format-area");
  try {
    var formatted = '', indent= '';
    tab = '  ';
    xmlFormatArea.value.split(/>\s*</).forEach(function(node) {
        if (node.match( /^\/\w/ )) indent = indent.substring(tab.length);
        formatted += indent + '<' + node + '>\r\n';
        if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;
    });
    xmlFormatArea.value = formatted.substring(1, formatted.length-3);
  } catch(ex) {
    alert(ex.message);
  }
}

function xmlMinify() {
  var xmlFormatArea = document.querySelector("#xml-format-area");
  try {
    xmlFormatArea.value = xmlFormatArea.value.split('\n').map(str => str.trim()).join("");
  } catch(ex) {
    alert(ex.message);
  }
}

function xmlCopy() {
  var xmlFormatArea = document.querySelector("#xml-format-area");
  xmlFormatArea.focus();
  xmlFormatArea.select();
  try {
    var successful = document.execCommand('copy');
    document.getSelection().empty()
  } catch(ex) {
    alert(ex.message);
  }
}


function base64Encode() {
  var base64EncodingArea = document.querySelector("#base64-encoding-area");
  try {
    encodedText = btoa(base64EncodingArea.value);
    document.querySelector("#base64-decoding-area").value = encodedText;
  } catch(ex) {
    alert(ex.message);
  }
}

function base64Decode() {
  var base64DecodingArea = document.querySelector("#base64-decoding-area");
  try {
    decodedText = atob(base64DecodingArea.value);
    document.querySelector("#base64-encoding-area").value = decodedText;
  } catch(ex) {
    alert(ex.message);
  }
}

function urlEncode() {
  var urlEncodingArea = document.querySelector("#url-encoding-area");
  try {
    encodedText = encodeURIComponent(urlEncodingArea.value);
    document.querySelector("#url-decoding-area").value = encodedText;
  } catch(ex) {
    alert(ex.message);
  }
}

function urlDecode() {
  var urlDecodingArea = document.querySelector("#url-decoding-area");
  try {
    decodedText = decodeURIComponent(urlDecodingArea.value);
    document.querySelector("#url-encoding-area").value = decodedText;
  } catch(ex) {
    alert(ex.message);
  }
}

function updateDate() {
  var epoch = document.querySelector("#epoch");
  try {
    var date = new Date(parseInt(epoch.value));
    if(date instanceof Date && !isNaN(date)) {
      document.querySelector("#date-local").innerHTML = date.toString();
      document.querySelector("#date-utc").innerHTML = date.toUTCString();
    } else {
      document.querySelector("#date-local").innerHTML = null;
      document.querySelector("#date-utc").innerHTML = null;
    }
  } catch(ex) {
    alert(ex.message);
  }
}


function configureMenuSelection() {
  var menuList = document.querySelectorAll(".main-menu .pure-menu-list > .pure-menu-item");
  var select = function(selected) {
    menuList.forEach(el=> {
      el.classList.remove("pure-menu-selected")
      document.querySelector('#'+el.dataset.spaceId).style.display = 'none';
    });
    selected.classList.add('pure-menu-selected');
    document.querySelector('#'+selected.dataset.spaceId).style.display = 'block';
  }

  menuList.forEach(menuItem => {
    var menuButton = menuItem.querySelector(".pure-menu-link");
    menuButton.onclick = function() {
      select(menuButton.parentElement);
    }
  });

  select(menuList[0]);
  updateDate();
}


window.onload = (event) => {
  configureMenuSelection();
};