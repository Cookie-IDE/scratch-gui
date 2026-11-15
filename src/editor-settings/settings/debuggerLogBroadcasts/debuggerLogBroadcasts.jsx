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
            return AddonSettingsStore.getAddonSetting('debugger', 'log_broadcasts');
        } catch (e) {
            return false;
        }
    }

    getPrimary() {
        return (
            <FormattedMessage
                defaultMessage="Log broadcasts"
                id="pm.editorSettings.debuggerLogBroadcasts.primary"
            />
        );
    }

    getHelp() {
        return (
            <FormattedMessage
                defaultMessage="Logs whenever a broadcast message is sent."
                id="pm.editorSettings.debuggerLogBroadcasts.help"
            />
        );
    }

    setValue(value) {
        try {
            AddonSettingsStore.setAddonSetting('debugger', 'log_broadcasts', !!value);
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
