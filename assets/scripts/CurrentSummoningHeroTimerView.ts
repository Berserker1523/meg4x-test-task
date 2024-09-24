import { _decorator, Component, Sprite, find } from 'cc';
import { HeroBuildingQueueModel } from './HeroBuildingQueueModel';
import { Hero } from './HeroesModel';
const { ccclass, property } = _decorator;

@ccclass('CurrentSummoningHeroTimerView')
export class CurrentSummoningHeroTimerView extends Component {

    @property({ type: Sprite })
    private sliderSprite: Sprite = null!;

    private heroBuildingQueueModel: HeroBuildingQueueModel = null!;

    protected onLoad(): void {
        this.heroBuildingQueueModel = find("HeroBuildingQueueModel")!.getComponent(HeroBuildingQueueModel)!;
    }

    protected onEnable(): void {
        this.handleCurrentHeroSummonRemainingTimeSet(this.heroBuildingQueueModel.CurrentSummoningHeroRemainingTime);
        this.heroBuildingQueueModel.node.on(HeroBuildingQueueModel.CurrentHeroSummonRemainingTimeSetEventName, this.handleCurrentHeroSummonRemainingTimeSet, this);
    }

    protected onDisable(): void {
        this.heroBuildingQueueModel.node.off(HeroBuildingQueueModel.CurrentHeroSummonRemainingTimeSetEventName, this.handleCurrentHeroSummonRemainingTimeSet, this);
    }

    private handleCurrentHeroSummonRemainingTimeSet = (currentSummoningHeroRemainingTime: number) => {

        if (this.heroBuildingQueueModel.EnqueuedHeroes.length == 0) {
            this.removeSlider();
            return;
        }

        const hero: Hero = this.heroBuildingQueueModel.EnqueuedHeroes[0];
        this.sliderSprite.fillRange = currentSummoningHeroRemainingTime / hero.summonCooldown;
    };

    private removeSlider() {
        this.sliderSprite.fillRange = 0;
    }
}
