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
            return AddonSettingsStore.getAddonSetting('debugger', 'log_clone_create');
        } catch (e) {
            return false;
        }
    }

    getPrimary() {
        return (
            <FormattedMessage
                defaultMessage="Log clone creation"
                id="pm.editorSettings.debuggerLogCloneCreate.primary"
            />
        );
    }

    getHelp() {
        return (
            <FormattedMessage
                defaultMessage="Logs an entry in the debugger whenever a clone is created."
                id="pm.editorSettings.debuggerLogCloneCreate.help"
            />
        );
    }

    setValue(value) {
        try {
            AddonSettingsStore.setAddonSetting('debugger', 'log_clone_create', !!value);
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
