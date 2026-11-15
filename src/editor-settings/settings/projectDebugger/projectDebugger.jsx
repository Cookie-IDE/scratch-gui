import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import AddonSettingsStore from '../../../addons/settings-store-singleton';

export default (class extends BooleanSetting {
    defaultValue() {
        return false;
    }

    _readStorage() {
        try {
            return AddonSettingsStore.getAddonEnabled('debugger');
        } catch (e) {
            return false;
        }
    }

    getPrimary() {
        return (<FormattedMessage
            defaultMessage="Enable Debugger"
            id="pm.editorSettings.projectDebugger.primary"
        />);
    }

    getHelp() {
        return (<FormattedMessage
            defaultMessage="Adds a new debugger window to the editor to view logs, running threads, performance graphs, and code execution timing."
            id="pm.editorSettings.projectDebugger.help"
        />);
    }

    setValue(value) {
        const wasEnabled = AddonSettingsStore.getAddonEnabled('debugger');
        if (!!value === wasEnabled) {
            return;
        }
        setTimeout(() => {
            AddonSettingsStore.setAddonEnabled('debugger', !!value);
            AddonSettingsStore.dispatchEvent(new CustomEvent('addon-changed', {
                detail: {
                    addonId: 'debugger',
                    dynamicEnable: !!value,
                    dynamicDisable: !value
                }
            }));
        }, 0);
    }
});
