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
            return AddonSettingsStore.getAddonSetting('debugger', 'log_max_list_length');
        } catch (e) {
            return true;
        }
    }

    getPrimary() {
        return (
            <FormattedMessage
                defaultMessage="Log when max list length exceeded"
                id="pm.editorSettings.debuggerLogMaxListLength.primary"
            />
        );
    }

    getHelp() {
        return (
            <FormattedMessage
                defaultMessage="Logs a warning when a list item count exceeds the maximum limit (200,000 items)."
                id="pm.editorSettings.debuggerLogMaxListLength.help"
            />
        );
    }

    setValue(value) {
        try {
            AddonSettingsStore.setAddonSetting('debugger', 'log_max_list_length', !!value);
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
