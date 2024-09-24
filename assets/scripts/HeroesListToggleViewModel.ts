import { _decorator, Component } from 'cc';
import { HeroToggleViewModel } from './HeroToggleViewModel';
const { ccclass } = _decorator;

@ccclass('HeroesListToggleViewModel')
export class HeroesListToggleViewModel extends Component {

    public static readonly CurrentToggledHeroSetEventName = "CurrentToggledHeroSet";

    private currentToggledHero: HeroToggleViewModel | null = null;

    public get CurrentToggledHero(): HeroToggleViewModel | null {
        return this.currentToggledHero;
    }

    public set CurrentToggledHero(newToggledHero: HeroToggleViewModel | null) {
        this.currentToggledHero = newToggledHero;
        this.node.emit(HeroesListToggleViewModel.CurrentToggledHeroSetEventName, newToggledHero);
    }
}
