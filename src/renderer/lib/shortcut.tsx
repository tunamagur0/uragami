export const ctrlOrCmd = (): 'ctrl' | 'command' => {
  const isMac = window.navigator.platform.match(/Mac/);
  return isMac ? 'command' : 'ctrl';
};
