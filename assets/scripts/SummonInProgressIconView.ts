import { _decorator, Component, Sprite, find } from 'cc';
import { HeroBuildingQueueModel } from './HeroBuildingQueueModel';
import { TowerVisibilityViewModel } from './TowerVisibilityViewModel';
const { ccclass, property } = _decorator;

@ccclass('SummonInProgressIconView')
export class SummonInProgressIconView extends Component {

    @property({ type: Sprite })
    private icon: Sprite = null!;

    private heroBuildingQueueModel: HeroBuildingQueueModel = null!;
    private towerVisibilityViewModel: TowerVisibilityViewModel = null!;

    protected onLoad(): void {
        this.heroBuildingQueueModel = find("HeroBuildingQueueModel")!.getComponent(HeroBuildingQueueModel)!;
        this.towerVisibilityViewModel = find("TowerVisibilityViewModel")!.getComponent(TowerVisibilityViewModel)!;
    }

    protected onEnable(): void {
        this.updateIcon();
        this.heroBuildingQueueModel.node.on(HeroBuildingQueueModel.HeroAddedEventName, this.handleHeroAdded, this);
        this.heroBuildingQueueModel.node.on(HeroBuildingQueueModel.HeroRemovedEventName, this.handleHeroRemoved, this);
        this.towerVisibilityViewModel.node.on(TowerVisibilityViewModel.ActiveSetEventName, this.handleTowerActiveSet, this);
    }

    protected onDisable(): void {
        this.heroBuildingQueueModel.node.off(HeroBuildingQueueModel.HeroAddedEventName, this.handleHeroAdded, this);
        this.heroBuildingQueueModel.node.off(HeroBuildingQueueModel.HeroRemovedEventName, this.handleHeroRemoved, this);
        this.towerVisibilityViewModel.node.off(TowerVisibilityViewModel.ActiveSetEventName, this.handleTowerActiveSet, this);
    }

    private handleHeroAdded = () => {
        this.updateIcon();
    };

    private handleHeroRemoved = () => {
        this.updateIcon();
    };

    private handleTowerActiveSet = () => {
        this.updateIcon();
    };

    private updateIcon() {
        this.icon.enabled = !this.towerVisibilityViewModel.IsActive && this.heroBuildingQueueModel.EnqueuedHeroes.length > 0;
    }
}
