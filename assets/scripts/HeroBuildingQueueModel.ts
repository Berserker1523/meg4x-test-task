import { _decorator, Component, find } from 'cc';
import { CurrencyModel } from './CurrencyModel';
import { Hero } from './HeroesModel';
const { ccclass } = _decorator;

@ccclass('HeroBuildingQueueModel')
export class HeroBuildingQueueModel extends Component {

    public static readonly HeroAddedEventName = "HeroAdded";
    public static readonly HeroRemovedEventName = "HeroRemoved";
    public static readonly CurrentHeroSummonRemainingTimeSetEventName = "CurrentHeroSummonRemainingTimeSet";

    private readonly heroQueueCapacity = 5;
    private readonly timerUpdateSeconds = 0.2;

    private currencyModel: CurrencyModel = null!;

    private enqueuedHeroes: Hero[] = [];
    private currentSummoningHeroRemainingTime = 0;

    public get EnqueuedHeroes(): Hero[] {
        return this.enqueuedHeroes;
    }

    public get CurrentSummoningHeroRemainingTime(): number {
        return this.currentSummoningHeroRemainingTime;
    }

    protected onLoad(): void {
        this.currencyModel = find("CurrencyModel")!.getComponent(CurrencyModel)!;
    }

    public buildHero(heroData: Hero) {
        if (this.currencyModel.CurrentCurrency < heroData.cost || !this.canEnqueueHeroes())
            return;

        this.currencyModel.CurrentCurrency -= heroData.cost;

        const wasEmpty: boolean = this.enqueuedHeroes.length == 0;

        this.enqueuedHeroes.push(heroData);
        this.node.emit(HeroBuildingQueueModel.HeroAddedEventName, heroData);

        if (wasEmpty)
            this.runSummonTimer();
    }

    private updateSummonTimer = () => {
        if (this.currentSummoningHeroRemainingTime > 0) {
            this.currentSummoningHeroRemainingTime -= this.timerUpdateSeconds;
            this.emitCurrentHeroSummonRemainingTimeSet();

            if (this.currentSummoningHeroRemainingTime <= 0) {
                this.unschedule(this.updateSummonTimer);
                const heroRemoved = this.enqueuedHeroes.shift();
                this.node.emit(HeroBuildingQueueModel.HeroRemovedEventName, heroRemoved);
                // TODO: Add hero to collection

                if (this.enqueuedHeroes.length > 0)
                    this.runSummonTimer();
            }
        }
    }

    private emitCurrentHeroSummonRemainingTimeSet() {
        this.node.emit(HeroBuildingQueueModel.CurrentHeroSummonRemainingTimeSetEventName, this.currentSummoningHeroRemainingTime);
    }

    private runSummonTimer() {
        this.currentSummoningHeroRemainingTime = this.enqueuedHeroes[0].summonCooldown;
        this.emitCurrentHeroSummonRemainingTimeSet();
        this.schedule(this.updateSummonTimer, this.timerUpdateSeconds);
    }

    public canEnqueueHeroes(): boolean {
        return this.enqueuedHeroes.length < this.heroQueueCapacity;
    }
}
