const { updateStreak } = require('../streak.js');

describe('updateStreak', () => {
  it('increments the streak count by 1 if the last visit was not today', () => {
    const localStorageMock = {
      getItem: jest.fn(() => '2023-05-01'),
      setItem: jest.fn(),
    };

    document.body.innerHTML = '<div id="streak-count">1</div>';

    updateStreak(localStorageMock);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('streakCount', '2');
  });

  // add more tests as needed
});
