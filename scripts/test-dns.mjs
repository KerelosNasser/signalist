import dns from 'dns';

const srvRecord = '_mongodb._tcp.cluster0.ztnvynz.mongodb.net';

console.log(`Checking DNS SRV resolution for: ${srvRecord}`);

dns.resolveSrv(srvRecord, (err, addresses) => {
  if (err) {
    console.error('DNS SRV Resolution Failed:');
    console.error(err);
    
    console.log('\n--- DIAGNOSIS ---');
    console.log('Your local DNS resolver is refusing to resolve the MongoDB SRV record.');
    console.log('This is a common issue on some Windows machines or restricted networks.');
    console.log('\n--- SOLUTION ---');
    console.log('1. Open your Network Settings.');
    console.log('2. Change your IPv4 DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare).');
    console.log('3. Restart your terminal and run "pnpm dev" again.');
  } else {
    console.log('DNS SRV Resolution Successful:');
    console.log(addresses);
  }
});
