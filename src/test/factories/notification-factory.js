describe('Notification', function () {
  // Load your module.
  beforeEach(module('teamform'));

  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
    $provide.value('Notification', {});
  }));

  it('can get an instance of my factory', inject(function(Notification) {
    expect(Notification).toBeDefined();
  }));
});