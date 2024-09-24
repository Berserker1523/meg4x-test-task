import { _decorator, Component, Button, find } from 'cc';
import { HeroesListToggleViewModel } from './HeroesListToggleViewModel';
import { HeroToggleViewModel } from './HeroToggleViewModel';
const { ccclass } = _decorator;

@ccclass('HeroToggleController')
export class HeroToggleController extends Component {

    private button: Button = null!;

    private heroesListToggleViewModel: HeroesListToggleViewModel = null!;
    private heroToggleViewModel: HeroToggleViewModel = null!;

    protected onLoad(): void {
        this.button = this.node.getComponent(Button)!;
        this.heroesListToggleViewModel = find("HeroesListToggleViewModel")!.getComponent(HeroesListToggleViewModel)!;
        this.heroToggleViewModel = this.node.parent!.getComponent(HeroToggleViewModel)!;
    }

    protected start(): void {
        this.button.node.on(Button.EventType.CLICK, this.handleButtonClicked, this);
    }

    protected onDestroy(): void {
        this.button.node.off(Button.EventType.CLICK, this.handleButtonClicked, this);
    }

    private handleButtonClicked = () => {
        this.heroesListToggleViewModel.CurrentToggledHero = this.heroToggleViewModel;
    };
}
