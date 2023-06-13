function toggleSettingsPanel() {
  var panel = document.getElementById("settings-panel");
  if (panel.classList.contains("hide-panel")) {
    panel.classList.remove("hide-panel");
  } else {
    panel.classList.add("hide-panel");
  }
}
