describe('ChatRoom Factory', function () {
  // Load your module.
  beforeEach(module('teamform'));

  // Setup the mock service in an anonymous module.
  beforeEach(module(function ($provide) {
    $provide.value('Chatroom', {});
  }));

  it('can get an instance of my factory', inject(function(Chatroom) {
    expect(Chatroom).toBeDefined();
  }));
});