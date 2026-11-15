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
            return AddonSettingsStore.getAddonSetting('debugger', 'log_invalid_cloud_data');
        } catch (e) {
            return false;
        }
    }

    getPrimary() {
        return (
            <FormattedMessage
                defaultMessage="Log invalid cloud variable values"
                id="pm.editorSettings.debuggerLogInvalidCloudData.primary"
            />
        );
    }

    getHelp() {
        return (
            <FormattedMessage
                defaultMessage="Logs a warning when a cloud variable is set to a non-numeric value or exceeds length limits."
                id="pm.editorSettings.debuggerLogInvalidCloudData.help"
            />
        );
    }

    setValue(value) {
        try {
            AddonSettingsStore.setAddonSetting('debugger', 'log_invalid_cloud_data', !!value);
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
