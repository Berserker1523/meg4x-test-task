import { _decorator, Component, Label, find } from 'cc';
import { SummonedHeroesModel } from './SummonedHeroesModel';
const { ccclass, property } = _decorator;

@ccclass('SummonedHeroesCounterView')
export class SummonedHeroesCounterView extends Component {

    @property({ type: Label })
    private counter: Label = null!;

    private summonedHeroesModel : SummonedHeroesModel = null!;

    protected onLoad(): void {
        this.summonedHeroesModel = find("SummonedHeroesModel")!.getComponent(SummonedHeroesModel)!;
    }

    protected start(): void {
        this.handleHeroAdded();
        this.summonedHeroesModel.node.on(SummonedHeroesModel.HeroAddedEventName, this.handleHeroAdded, this);
    }

    protected onDestroy(): void {
        this.summonedHeroesModel.node.on(SummonedHeroesModel.HeroAddedEventName, this.handleHeroAdded, this);
    }

    private handleHeroAdded = () => {
        this.counter.string = this.summonedHeroesModel.SummonedHeroes.length.toString();
    };
}
