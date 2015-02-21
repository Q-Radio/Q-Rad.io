/* globals casper, document */
casper.test.begin('App is setup correctly', 0, function suite(test) {
  casper.start('http://localhost:8000/', function() {
    test.assertExists('#app', 'main div should exist');
    test.done();
  });

  casper.run(function() {
    test.done();
  });
});

