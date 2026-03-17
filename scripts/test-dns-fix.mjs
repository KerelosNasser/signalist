import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const srvRecord = '_mongodb._tcp.cluster0.ztnvynz.mongodb.net';

console.log(`Checking DNS SRV resolution (with 8.8.8.8 override) for: ${srvRecord}`);

dns.resolveSrv(srvRecord, (err, addresses) => {
  if (err) {
    console.error('DNS SRV Resolution STILL Failed:');
    console.error(err);
  } else {
    console.log('DNS SRV Resolution SUCCESSFUL with override:');
    console.log(addresses);
  }
});
