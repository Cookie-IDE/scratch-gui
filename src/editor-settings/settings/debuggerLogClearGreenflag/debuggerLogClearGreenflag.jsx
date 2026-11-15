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
            return AddonSettingsStore.getAddonSetting('debugger', 'log_clear_greenflag');
        } catch (e) {
            return false;
        }
    }

    getPrimary() {
        return (
            <FormattedMessage
                defaultMessage="Clear logs on green flag"
                id="pm.editorSettings.debuggerLogClearGreenflag.primary"
            />
        );
    }

    getHelp() {
        return (
            <FormattedMessage
                defaultMessage="Clears all debugger logs when the green flag is clicked."
                id="pm.editorSettings.debuggerLogClearGreenflag.help"
            />
        );
    }

    setValue(value) {
        try {
            AddonSettingsStore.setAddonSetting('debugger', 'log_clear_greenflag', !!value);
            setTimeout(() => {
                AddonSettingsStore.dispatchEvent(new CustomEvent('addon-changed', {
                    detail: {
                        addonId: 'debugger'
                    }
                }));
            }, 0);
        } catch (e) {
            // ignore
        }
    }
});
