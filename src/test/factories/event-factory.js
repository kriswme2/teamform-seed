describe('Event Factory', function () {
  // Load your module.
  beforeEach(module('teamform'));

  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
    $provide.value('Event', {});
  }));

  it('can get an instance of my factory', inject(function(Event) {
    expect(Event).toBeDefined();
  }));
});