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
            return AddonSettingsStore.getAddonSetting('debugger', 'auto_stop_timing');
        } catch (e) {
            return false;
        }
    }

    getPrimary() {
        return (
            <FormattedMessage
                defaultMessage="Stop previous timing on start timing"
                id="pm.editorSettings.debuggerAutoStopTiming.primary"
            />
        );
    }

    getHelp() {
        return (
            <FormattedMessage
                defaultMessage="Automatically stops the previous timing block when a new one starts—ideal for timing consecutive sections. Only the final block needs an explicit stop."
                id="pm.editorSettings.debuggerAutoStopTiming.help"
            />
        );
    }

    setValue(value) {
        try {
            AddonSettingsStore.setAddonSetting('debugger', 'auto_stop_timing', !!value);
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
