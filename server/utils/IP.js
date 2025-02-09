const os = require('os');

const getIPAddress = () =>{
    const interfaces = os.networkInterfaces();
    const addresses = [];

    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            // Check for IPv4 and exclude internal (localhost) addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address);
            }
        }
    }

    return addresses.length > 0 ? addresses[0] : 'No external IP found';
}

module.exports = getIPAddress;
