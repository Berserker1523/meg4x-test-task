import { _decorator, Component, Sprite } from 'cc';
import { HeroToggleViewModel } from './HeroToggleViewModel';
const { ccclass, property } = _decorator;

@ccclass('HeroToggleView')
export class HeroToggleView extends Component {

    @property({ type: Sprite })
    private checkmarkSprite: Sprite = null!;

    private heroToggleViewModel: HeroToggleViewModel = null!;

    protected onLoad(): void {
        this.heroToggleViewModel = this.node.getComponent(HeroToggleViewModel)!;
    }

    protected start(): void {
        this.handleSelectedSet(this.heroToggleViewModel.IsSelected);
        this.heroToggleViewModel.node.on(HeroToggleViewModel.SelectedSetEventName, this.handleSelectedSet, this);
    }

    protected onDestroy(): void {
        this.heroToggleViewModel.node.off(HeroToggleViewModel.SelectedSetEventName, this.handleSelectedSet, this);
    }

    private handleSelectedSet = (isSelected: boolean) => {
        this.checkmarkSprite.enabled = isSelected;
    };
}
