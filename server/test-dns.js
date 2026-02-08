
import dns from 'dns';

const domain = 'cluster0.11nb3pm.mongodb.net';

console.log(`Testing DNS resolution for: ${domain}`);

dns.resolveSrv(`_mongodb._tcp.${domain}`, (err, addresses) => {
    if (err) {
        console.error('SRV Record lookup failed:', err);
        console.log('\nTIP: This usually means your network or ISP is blocking DNS requests to MongoDB Atlas.');
        console.log('TRY: changing your DNS to Google (8.8.8.8) or Cloudflare (1.1.1.1).');
    } else {
        console.log('SRV Record found:', addresses);
        console.log('DNS is working correctly. The issue might be firewall/IP whitelist.');
    }
});
