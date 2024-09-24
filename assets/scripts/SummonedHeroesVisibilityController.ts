import { _decorator, Component, Button, find } from 'cc';
import { SummonedHeroesVisibilityViewModel } from './SummonedHeroesVisibilityViewModel';
const { ccclass } = _decorator;

@ccclass('SummonedHeroesVisibilityController')
export class SummonedHeroesVisibilityController extends Component {

    private button: Button = null!;

    private summonedHeroesVisibilityViewModel: SummonedHeroesVisibilityViewModel = null!;

    protected onLoad(): void {
        this.button = this.node.getComponent(Button)!;
        this.summonedHeroesVisibilityViewModel = find("SummonedHeroesVisibilityViewModel")!.getComponent(SummonedHeroesVisibilityViewModel)!;
    }

    protected start(): void {
        this.button.node.on(Button.EventType.CLICK, this.handleButtonClicked, this);
    }

    protected onDestroy(): void {
        this.button.node.off(Button.EventType.CLICK, this.handleButtonClicked, this);
    }

    private handleButtonClicked = () => {
        this.summonedHeroesVisibilityViewModel.IsActive = !this.summonedHeroesVisibilityViewModel.IsActive;
    };
}
