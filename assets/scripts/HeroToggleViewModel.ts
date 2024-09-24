import { _decorator, Component, find } from 'cc';
import { HeroesListToggleViewModel } from './HeroesListToggleViewModel';
const { ccclass } = _decorator;

@ccclass('HeroToggleViewModel')
export class HeroToggleViewModel extends Component {

    public static readonly SelectedSetEventName = "SelectedSet";

    private isSelected = false;

    private heroesListToggleViewModel: HeroesListToggleViewModel = null!;

    public get IsSelected() : boolean{
        return this.isSelected;
    }

    protected onLoad(): void {
        this.heroesListToggleViewModel = find("HeroesListToggleViewModel")!.getComponent(HeroesListToggleViewModel)!;
    }

    protected start(): void {
        this.handleCurrentToggledHeroSet(this.heroesListToggleViewModel.CurrentToggledHero);
        this.heroesListToggleViewModel.node.on(HeroesListToggleViewModel.CurrentToggledHeroSetEventName, this.handleCurrentToggledHeroSet, this);
    }

    protected onDestroy(): void {
        this.heroesListToggleViewModel.node.off(HeroesListToggleViewModel.CurrentToggledHeroSetEventName, this.handleCurrentToggledHeroSet, this);
    }

    private handleCurrentToggledHeroSet = (newToggledHero: HeroToggleViewModel | null) => {
        this.isSelected = newToggledHero != null && newToggledHero === this;
        this.node.emit(HeroToggleViewModel.SelectedSetEventName, this.isSelected);
    };
}
