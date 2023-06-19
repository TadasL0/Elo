import { updateStreak } from '../streak.js';

describe('updateStreak', () => {
  it('increments the streak count by 1 if the last visit was not today', () => {
    const originalLocalStorage = global.localStorage;
    global.localStorage = {
      getItem: jest.fn(() => '2023-05-01'),
      setItem: jest.fn(),
    };

    document.body.innerHTML = '<div id="streak-count">1</div>';

    updateStreak();
    
    expect(global.localStorage.setItem).toHaveBeenCalledWith('streakCount', '2');
    
    global.localStorage = originalLocalStorage;
  });

  // add more tests as needed
});
