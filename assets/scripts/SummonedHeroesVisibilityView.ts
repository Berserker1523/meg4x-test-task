import { _decorator, Component, Node, find } from 'cc';
import { SummonedHeroesVisibilityViewModel } from './SummonedHeroesVisibilityViewModel';
const { ccclass, property } = _decorator;

@ccclass('SummonedHeroesVisibilityView')
export class SummonedHeroesVisibilityView extends Component {
    @property({ type: Node })
    private summonedHeroesUI: Node = null!;

    private SummonedHeroesVisibilityViewModel: SummonedHeroesVisibilityViewModel = null!;

    protected onLoad(): void {
        this.SummonedHeroesVisibilityViewModel = find("SummonedHeroesVisibilityViewModel")!.getComponent(SummonedHeroesVisibilityViewModel)!;
    }

    protected start(): void {
        this.handleActiveSet(this.SummonedHeroesVisibilityViewModel.IsActive);
        this.SummonedHeroesVisibilityViewModel.node.on(SummonedHeroesVisibilityViewModel.ActiveSetEventName, this.handleActiveSet, this);
    }

    protected onDestroy(): void {
        this.SummonedHeroesVisibilityViewModel.node.off(SummonedHeroesVisibilityViewModel.ActiveSetEventName, this.handleActiveSet, this);
    }

    private handleActiveSet = (isActive: boolean) => {
        this.summonedHeroesUI.active = isActive;
    };
}
