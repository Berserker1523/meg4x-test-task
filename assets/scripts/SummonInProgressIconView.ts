import { _decorator, Component, Sprite, find } from 'cc';
import { HeroBuildingQueueModel } from './HeroBuildingQueueModel';
import { TowerViewModel } from './TowerViewModel';
const { ccclass, property } = _decorator;

@ccclass('SummonInProgressIconView')
export class SummonInProgressIconView extends Component {

    @property({ type: Sprite })
    private icon: Sprite = null!;

    private heroBuildingQueueModel: HeroBuildingQueueModel = null!;
    private towerViewModel: TowerViewModel = null!;

    protected onLoad(): void {
        this.heroBuildingQueueModel = find("HeroBuildingQueueModel")!.getComponent(HeroBuildingQueueModel)!;
        this.towerViewModel = find("TowerViewModel")!.getComponent(TowerViewModel)!;
    }

    protected onEnable(): void {
        this.updateIcon();
        this.heroBuildingQueueModel.node.on(HeroBuildingQueueModel.HeroAddedEventName, this.handleHeroAdded, this);
        this.heroBuildingQueueModel.node.on(HeroBuildingQueueModel.HeroRemovedEventName, this.handleHeroRemoved, this);
        this.towerViewModel.node.on(TowerViewModel.ActiveSetEventName, this.handleTowerActiveSet, this);
    }

    protected onDisable(): void {
        this.heroBuildingQueueModel.node.off(HeroBuildingQueueModel.HeroAddedEventName, this.handleHeroAdded, this);
        this.heroBuildingQueueModel.node.off(HeroBuildingQueueModel.HeroRemovedEventName, this.handleHeroRemoved, this);
        this.towerViewModel.node.off(TowerViewModel.ActiveSetEventName, this.handleTowerActiveSet, this);
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
        this.icon.enabled = !this.towerViewModel.IsActive && this.heroBuildingQueueModel.EnqueuedHeroes.length > 0;
    }
}
