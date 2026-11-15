import BooleanSetting from "../../components/boolean-setting/boolean-setting.jsx";
import {FormattedMessage} from 'react-intl';
import React from 'react';
import AddonSettingsStore from '../../../addons/settings-store-singleton';

export default (class extends BooleanSetting {
    defaultValue() {
        return true;
    }

    _readStorage() {
        try {
            return AddonSettingsStore.getAddonSetting('debugger', 'log_failed_clone_creation');
        } catch (e) {
            return true;
        }
    }

    getPrimary() {
        return (
            <FormattedMessage
                defaultMessage="Log when clone limit exceeded"
                id="pm.editorSettings.debuggerLogFailedCloneCreation.primary"
            />
        );
    }

    getHelp() {
        return (
            <FormattedMessage
                defaultMessage="Logs a warning when attempting to create a clone beyond the maximum clone limit (300)."
                id="pm.editorSettings.debuggerLogFailedCloneCreation.help"
            />
        );
    }

    setValue(value) {
        try {
            AddonSettingsStore.setAddonSetting('debugger', 'log_failed_clone_creation', !!value);
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
