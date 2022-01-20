const os = require('os');

// info about current user
const user = os.userInfo();
console.log(user);

// method returns the system uptime in seconds (how long the PC has been running)
console.log(`The System Uptime is ${os.uptime()} seconds`);

// info about OS
const currentOSInfo = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
}
console.log(currentOSInfo);
