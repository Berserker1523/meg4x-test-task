import { _decorator, Component, find } from 'cc';
import { HeroViewModel } from './HeroViewModel';
import { HeroBuildingQueueModel } from './HeroBuildingQueueModel';
const { ccclass, property } = _decorator;

@ccclass('HeroBuildingQueueViewModel')
export class HeroBuildingQueueViewModel extends Component {

    @property({ type: HeroViewModel })
    private heroBuildingItems: HeroViewModel[] = [];

    private heroBuildingQueueModel: HeroBuildingQueueModel = null!;

    protected onLoad(): void {
        this.heroBuildingQueueModel = find("HeroBuildingQueueModel")!.getComponent(HeroBuildingQueueModel)!;
    }

    protected onEnable(): void {
        this.updateSlots();
        this.heroBuildingQueueModel.node.on(HeroBuildingQueueModel.HeroAddedEventName, this.handleHeroAdded, this);
        this.heroBuildingQueueModel.node.on(HeroBuildingQueueModel.HeroRemovedEventName, this.handleHeroRemoved, this);
    }

    protected onDisable(): void {
        this.heroBuildingQueueModel.node.off(HeroBuildingQueueModel.HeroAddedEventName, this.handleHeroAdded, this);
        this.heroBuildingQueueModel.node.off(HeroBuildingQueueModel.HeroRemovedEventName, this.handleHeroRemoved, this);
    }

    private handleHeroAdded = () => {
        this.updateSlots();
    };

    private handleHeroRemoved = () => {
        this.updateSlots();
    };

    private updateSlots() {
        let i = 0;

        for (; i < this.heroBuildingQueueModel.EnqueuedHeroes.length; i++)
            this.heroBuildingItems[i].HeroData = this.heroBuildingQueueModel.EnqueuedHeroes[i];

        for (let j = i; j < this.heroBuildingItems.length; j++)
            this.heroBuildingItems[i].HeroData = null;
    }
}
