/* globals casper, document */
casper.test.begin('App is setup correctly', 0, function suite(test) {
  casper.start('http://localhost:8000/', function() {
    test.assertExists('.login', 'login link should exist');
    test.done();
  });

  casper.run(function() {
    test.done();
  });
});

