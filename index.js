var request = require('sync-request');

var cache = {};

module.exports = {
  hooks: {},
  blocks: {},
  filters: {
      snapshotVersion: function(v) {
          if (typeof cache[v] === 'string') {
            return cache[v];
          }
          var xml = request('GET', 'http://dl.bintray.com/eventsourcing/maven-snapshots/com/eventsourcing/eventsourcing-core/maven-metadata.xml').getBody()
          var v1 = v.replace(/-SNAPSHOT$/,"");
          v1 = v1 + xml.toString().match(new RegExp(v1 + '(-[0-9]+-g[a-f0-9]+)<\\/version>\\s*<\\/versions>'))[1];
          cache[v] = v1;
          return v1;
      }
  }
}
