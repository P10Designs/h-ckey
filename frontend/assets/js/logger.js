function logger(type, message) {
  var r='border-radius:2px; padding:0 4px; color:white;';
  if (type == 'info'){
    r += 'background:green;';
  } else if (type== 'debug'){
    r += 'background:dodgerblue;';
  } else if (type == 'warn') {
    r += 'background:orange;';
  } else {
    r += 'background:red;';
  }
  
  console.log(`%c${type}%c ${message}`, r);
}