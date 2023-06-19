const { updateStreak } = require('../streak.js');

describe('updateStreak', () => {
  // Mock the localStorage object
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  
  // Save the original localStorage
  const originalLocalStorage = global.localStorage;

  // Set up the DOM
  document.body.innerHTML = '<div id="streak-count">1</div>';

  // Use the mock localStorage for each test
  beforeEach(() => {
    global.localStorage = localStorageMock;
  });

  // Restore the original localStorage after each test
  afterEach(() => {
    global.localStorage = originalLocalStorage;
  });

  it('increments the streak count by 1 if the last visit was not today', () => {
    localStorageMock.getItem.mockReturnValue('2023-05-01');
    
    updateStreak();
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('streakCount', '2');
  });

  // add more tests as needed
});
