//Load database "driver".
const Enmap = require('enmap');

module.exports = {
  
  //Per-server configuration storage.
  serverConfig: new Enmap({
    name: 'serverConfig',
    autoFetch: true,
    fetchAll: false,
    cloneLevel: 'deep',
    autoEnsure: {
      prefix: '-bb',
      modRole: '',
      adminRole: '',
      registerRole: '',
      facilityLimit: 4,
      bunkerLimit: 12,
      registrationRules: "Please limit registration to {{facilityLimit}} facilities and {{bunkerLimit}} bunkers."
    }
  });
    
  //Database storage for Bunker/Facility registrations.
  bunkers: new Enmap({
    name: 'bunkers',
    autoFetch: true,
    fetchAll: false,
    cloneLevel: 'deep',
    autoEnsure: { registrationOpen: false }
  });
}
