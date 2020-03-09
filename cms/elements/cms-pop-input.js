import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { NeonAnimationBehavior } from '@polymer/neon-animation/neon-animation-behavior'
import { NeonAnimationRunnerBehavior } from '@polymer/neon-animation/neon-animation-runner-behavior.js';
export class cmsPopInput extends mixinBehaviors(
    [NeonAnimationBehavior, NeonAnimationRunnerBehavior],
    PolymerElement) {
    static get template() {
        return html`
        <style  include="iron-flex-layout">       
            :host{
                position: absolute;
            }     
            
            .flex-vertical {
                @apply --layout-vertical;
            }
            .flexchild {
                @apply --layout-flex;
            }
            .flex2child {
                @apply --layout-flex-2;
            }
            .flex3child {
                @apply --layout-flex-3;
            }

        </style>
        <nav class="flex-vertical">
            <div class="flexchild">
                <slot name="button"></slot>
            </div>
            <div class="flex2child">
                <slot name="input"></slot>
            </div>
            <div class="flexchild">
                <slot name="anchor"></slot>
            </div>
        </nav>    
        `
    }
    static get is() {
        return 'cms-pop-input';
    }
    static get properties() {
        return {
            opened: {
                type: Boolean,
                observer: '_resetInput'
            },
            animationConfig: {
                type: Object,
                computed: '_setConfig(opened)'
            },
        }
    }
    ready() {
        super.ready();
    }

    _resetInput(data) {
        if (data === true) {
            this.children[1].itemText = ''
        }
    }

    _setConfig() {
        return {
            'entry': [{
                name: 'scale-up-animation',
                node: this.$.toolbar,
            },
            {
                name: 'scale-up-animation',
                node: this.$.forms
            },
            {
                name: 'slide-from-top-animation',
                node: this.$.inputarea,
            },
            {
                name: 'slide-from-left-animation',
                node: this.$.formside,
            },
            {
                name: 'slide-from-bottom-animation',
                node: this.$.form1
            }],
            'exit': [
                {
                    name: 'scale-down-animation',
                    node: this.$.toolbar
                },
                {
                    name: 'scale-down-animation',
                    node: this.$.forms
                },
                {
                    name: 'fade-out-animation',
                    node: this
                }]
        }
    }
}
customElements.define(cmsPopInput.is, cmsPopInput);
