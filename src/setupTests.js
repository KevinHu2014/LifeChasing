const mockGeolocation = {
  watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;
