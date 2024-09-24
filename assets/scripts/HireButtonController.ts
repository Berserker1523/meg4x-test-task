import { _decorator, Component, Button, find } from 'cc';
import { HeroBuildingQueueModel } from './HeroBuildingQueueModel';
import { HeroesListToggleViewModel } from './HeroesListToggleViewModel';
import { HeroViewModel } from './HeroViewModel';
import { HeroToggleViewModel } from './HeroToggleViewModel';
const { ccclass } = _decorator;

@ccclass('HireButtonController')
export class HireButtonController extends Component {

    private button: Button = null!;

    private heroBuildingQueueModel: HeroBuildingQueueModel = null!;
    private heroesListToggleViewModel: HeroesListToggleViewModel = null!;

    protected onLoad(): void {
        this.button = this.node.getComponent(Button)!;
        this.heroBuildingQueueModel = find("HeroBuildingQueueModel")!.getComponent(HeroBuildingQueueModel)!;
        this.heroesListToggleViewModel = find("HeroesListToggleViewModel")!.getComponent(HeroesListToggleViewModel)!;
    }

    protected start(): void {
        this.button.node.on(Button.EventType.CLICK, this.handleButtonClicked, this);
    }

    protected onDestroy(): void {
        this.button.node.off(Button.EventType.CLICK, this.handleButtonClicked, this);
    }

    private handleButtonClicked = () => {
        const heroToggleViewModel: HeroToggleViewModel | null = this.heroesListToggleViewModel.CurrentToggledHero;
        if (!heroToggleViewModel)
            return;

        const heroViewModel: HeroViewModel | null = heroToggleViewModel.node.getComponent(HeroViewModel);
        if (!heroViewModel?.HeroData)
            return;

        this.heroBuildingQueueModel.buildHero(heroViewModel.HeroData);
    };
}
