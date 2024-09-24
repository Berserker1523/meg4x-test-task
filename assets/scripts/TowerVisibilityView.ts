import { _decorator, Component, find, Node } from 'cc';
import { TowerViewModel } from './TowerViewModel';
const { ccclass, property } = _decorator;

@ccclass('TowerVisibilityView')
export class TowerVisibilityView extends Component {
    
    @property({ type: Node })
    private towerUI: Node = null!;

    private towerViewModel : TowerViewModel = null!;

    protected onLoad(): void {
        this.towerViewModel = find("TowerViewModel")!.getComponent(TowerViewModel)!;
    }

    protected start(): void {
        this.handleActiveSet(this.towerViewModel.IsActive);
        this.towerViewModel.node.on(TowerViewModel.ActiveSetEventName, this.handleActiveSet, this);
    }

    protected onDestroy(): void {
        this.towerViewModel.node.off(TowerViewModel.ActiveSetEventName, this.handleActiveSet, this);
    }

    private handleActiveSet = (isActive : boolean) => {
        this.towerUI.active = isActive;
    };
}
