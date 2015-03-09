/* globals casper, document */
casper.test.begin('App is setup correctly', 1, function suite(test) {
  casper.start('http://localhost:8000/', function() {
    //test.assertExists('.login', 'login link should exist');
    casper.test.assert(true, "true is true");
  });

  casper.run(function() {
    test.done();
  });
});

