import { _decorator, Component, Button, find } from 'cc';
import { TowerVisibilityViewModel } from './TowerVisibilityViewModel';
const { ccclass } = _decorator;

@ccclass('TowerVisibiltyController')
export class TowerVisibiltyController extends Component {

    private button: Button = null!;

    private towerVisibilityViewModel : TowerVisibilityViewModel = null!;

    protected onLoad(): void {
        this.button = this.node.getComponent(Button)!;
        this.towerVisibilityViewModel = find("TowerVisibilityViewModel")!.getComponent(TowerVisibilityViewModel)!;
    }

    protected start(): void {
        this.button.node.on(Button.EventType.CLICK, this.handleButtonClicked, this);
    }

    protected onDestroy(): void {
        this.button.node.off(Button.EventType.CLICK, this.handleButtonClicked, this);
    }

    private handleButtonClicked = () => {
        this.towerVisibilityViewModel.IsActive = !this.towerVisibilityViewModel.IsActive;
    };
}
