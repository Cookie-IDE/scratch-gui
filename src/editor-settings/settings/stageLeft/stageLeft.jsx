import BooleanSetting from '../../components/boolean-setting/boolean-setting.jsx';
import {FormattedMessage} from 'react-intl';
import React from 'react';
import LazyScratchBlocks from '../../../lib/tw-lazy-scratch-blocks.js';
import guiStyles from '../../../components/gui/gui.css';

export default (class extends BooleanSetting {
    getPrimary () {
        return (<FormattedMessage
            defaultMessage="Display Stage on Left"
            id="pm.editorSettings.stageLeft.primary"
        />);
    }

    getHelp () {
        return (<FormattedMessage
            defaultMessage="Positions the stage on the left instead of the right."
            id="pm.editorSettings.stageLeft.help"
        />);
    }

    async setValue (value) {
        const flexWrapper = document.querySelector(`.${guiStyles.flexWrapper}`);
        if (!flexWrapper) return;

        await LazyScratchBlocks.load();
        const ScratchBlocks = LazyScratchBlocks.get();
        flexWrapper.classList[value ? 'add' : 'remove'](guiStyles.stageLeft);

        queueMicrotask(() => ScratchBlocks.svgResize(ScratchBlocks.mainWorkspace));
    }
});
