/* globals casper, document */
casper.test.begin('App is setup correctly', 2, function suite(test) {
  casper.start('http://localhost:8000/', function() {
    test.assertExists('.getSong', 'Button should exist');
    test.assertExists('.randomSong', 'Div should exist');
  });

  casper.run(function() {
    test.done();
  });
});

