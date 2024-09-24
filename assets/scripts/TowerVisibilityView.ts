import { _decorator, Component, find, Node } from 'cc';
import { TowerVisibilityViewModel } from './TowerVisibilityViewModel';
const { ccclass, property } = _decorator;

@ccclass('TowerVisibilityView')
export class TowerVisibilityView extends Component {
    
    @property({ type: Node })
    private towerUI: Node = null!;

    private towerVisibilityViewModel : TowerVisibilityViewModel = null!;

    protected onLoad(): void {
        this.towerVisibilityViewModel = find("TowerVisibilityViewModel")!.getComponent(TowerVisibilityViewModel)!;
    }

    protected start(): void {
        this.handleActiveSet(this.towerVisibilityViewModel.IsActive);
        this.towerVisibilityViewModel.node.on(TowerVisibilityViewModel.ActiveSetEventName, this.handleActiveSet, this);
    }

    protected onDestroy(): void {
        this.towerVisibilityViewModel.node.off(TowerVisibilityViewModel.ActiveSetEventName, this.handleActiveSet, this);
    }

    private handleActiveSet = (isActive : boolean) => {
        this.towerUI.active = isActive;
    };
}
