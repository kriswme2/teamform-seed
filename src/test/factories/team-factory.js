describe('Team Factory', function () {
  // Load your module.
  beforeEach(module('teamform'));

  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
    $provide.value('Team', {});
  }));

  it('can get an instance of my factory', inject(function(Team) {
    expect(Team).toBeDefined();
  }));
});