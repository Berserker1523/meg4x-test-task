import { _decorator, Component, Button, find } from 'cc';
import { TowerViewModel } from './TowerViewModel';
const { ccclass } = _decorator;

@ccclass('TowerVisibiltyController')
export class TowerVisibiltyController extends Component {

    private button: Button = null!;

    private towerViewModel : TowerViewModel = null!;

    protected onLoad(): void {
        this.button = this.node.getComponent(Button)!;
        this.towerViewModel = find("TowerViewModel")!.getComponent(TowerViewModel)!;
    }

    protected start(): void {
        this.button.node.on(Button.EventType.CLICK, this.handleButtonClicked, this);
    }

    protected onDestroy(): void {
        this.button.node.off(Button.EventType.CLICK, this.handleButtonClicked, this);
    }

    private handleButtonClicked = () => {
        this.towerViewModel.IsActive = !this.towerViewModel.IsActive;
    };
}
