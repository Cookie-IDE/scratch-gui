const fs = require('fs');
const file = 'src/addons/addons/debugger/userscript.js';
let content = fs.readFileSync(file, 'utf8');

const target = `  let savedAddonBlockCategory = null;

  const removeAddonBlocks = () => {
    if (vm.runtime && Array.isArray(vm.runtime._blockInfo)) {
      const index = vm.runtime._blockInfo.findIndex((i) => i.id === "a-b");
      if (index !== -1) {
        savedAddonBlockCategory = vm.runtime._blockInfo.splice(index, 1)[0];
      }
      if (typeof vm.runtime.resetAllCaches === "function") {
        vm.runtime.resetAllCaches();
      }
      if (vm.editingTarget) {
        vm.emitWorkspaceUpdate();
      }
      if (ScratchBlocks) {
        const workspace = ScratchBlocks.getMainWorkspace();
        if (workspace) {
          const flyout = workspace.getFlyout();
          if (flyout && flyout.getWorkspace()) {
            const flyoutWorkspace = flyout.getWorkspace();
            if (window.Blockly && window.Blockly.Xml) {
              window.Blockly.Xml.clearWorkspaceAndLoadFromXml(
                window.Blockly.Xml.workspaceToDom(flyoutWorkspace),
                flyoutWorkspace
              );
            }
          }
          if (workspace.getToolbox()) {
            workspace.getToolbox().refreshSelection();
          }
          workspace.toolboxRefreshEnabled_ = true;
        }
      }
    }
  };

  const restoreAddonBlocks = () => {
    if (vm.runtime && Array.isArray(vm.runtime._blockInfo)) {
      if (savedAddonBlockCategory && !vm.runtime._blockInfo.some((i) => i.id === "a-b")) {
        vm.runtime._blockInfo.unshift(savedAddonBlockCategory);
      }
      if (typeof vm.runtime.resetAllCaches === "function") {
        vm.runtime.resetAllCaches();
      }
      if (vm.editingTarget) {
        vm.emitWorkspaceUpdate();
      }
      if (ScratchBlocks) {
        const workspace = ScratchBlocks.getMainWorkspace();
        if (workspace) {
          const flyout = workspace.getFlyout();
          if (flyout && flyout.getWorkspace()) {
            const flyoutWorkspace = flyout.getWorkspace();
            if (window.Blockly && window.Blockly.Xml) {
              window.Blockly.Xml.clearWorkspaceAndLoadFromXml(
                window.Blockly.Xml.workspaceToDom(flyoutWorkspace),
                flyoutWorkspace
              );
            }
          }
          if (workspace.getToolbox()) {
            workspace.getToolbox().refreshSelection();
          }
          workspace.toolboxRefreshEnabled_ = true;
        }
      }
    }
  };`;

const replacement = `  let savedAddonBlockCategory = null;
  let updateWorkspaceBlocksTimeout = null;

  const scheduleWorkspaceBlocksUpdate = () => {
    if (updateWorkspaceBlocksTimeout) {
      clearTimeout(updateWorkspaceBlocksTimeout);
    }
    updateWorkspaceBlocksTimeout = setTimeout(() => {
      if (typeof vm.runtime.resetAllCaches === "function") {
        vm.runtime.resetAllCaches();
      }
      if (vm.editingTarget) {
        vm.emitWorkspaceUpdate();
      }
    }, 20);
  };

  const removeAddonBlocks = () => {
    if (vm.runtime && Array.isArray(vm.runtime._blockInfo)) {
      const index = vm.runtime._blockInfo.findIndex((i) => i.id === "a-b");
      if (index !== -1) {
        savedAddonBlockCategory = vm.runtime._blockInfo.splice(index, 1)[0];
      }
      scheduleWorkspaceBlocksUpdate();
    }
  };

  const restoreAddonBlocks = () => {
    if (vm.runtime && Array.isArray(vm.runtime._blockInfo)) {
      if (savedAddonBlockCategory && !vm.runtime._blockInfo.some((i) => i.id === "a-b")) {
        vm.runtime._blockInfo.unshift(savedAddonBlockCategory);
      }
      scheduleWorkspaceBlocksUpdate();
    }
  };`;

if (!content.includes(target)) {
  console.error("Target block not found in userscript.js");
  process.exit(1);
}


content = content.replace(target, replacement);
fs.writeFileSync(file, content, 'utf8');
console.log("Successfully optimized userscript.js");
