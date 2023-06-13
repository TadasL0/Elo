function toggleCustomSettingsPanel() {
    var settingsPanel = document.getElementById('custom-settings-panel');
    if (settingsPanel.style.transform === 'scaleY(1)') {
      settingsPanel.style.transform = 'scaleY(0)';
    } else {
      settingsPanel.style.transform = 'scaleY(1)';
    }
  }
  