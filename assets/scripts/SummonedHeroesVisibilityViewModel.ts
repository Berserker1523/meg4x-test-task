import { _decorator, Component, find } from 'cc';
import { TowerVisibilityViewModel } from './TowerVisibilityViewModel';
const { ccclass } = _decorator;

@ccclass('SummonedHeroesVisibilityViewModel')
export class SummonedHeroesVisibilityViewModel extends Component {
    public static readonly ActiveSetEventName = "ActiveSet";

    private isActive = false;

    private towerVisibilityViewModel: TowerVisibilityViewModel = null!;

    public get IsActive(): boolean {
        return this.isActive;
    }

    public set IsActive(isActive: boolean) {
        this.isActive = isActive;

        //Hacky, in a real app there should be a menu enqueue system to avoid many to many references among menus
        if (isActive && this.towerVisibilityViewModel.IsActive)
            this.towerVisibilityViewModel.IsActive = false;

        this.node.emit(SummonedHeroesVisibilityViewModel.ActiveSetEventName, isActive);
    }

    protected onLoad(): void {
        this.towerVisibilityViewModel = find("TowerVisibilityViewModel")!.getComponent(TowerVisibilityViewModel)!;
    }
}
