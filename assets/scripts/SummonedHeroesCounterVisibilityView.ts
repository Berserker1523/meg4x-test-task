import { _decorator, Component, find, Node } from 'cc';
import { SummonedHeroesModel } from './SummonedHeroesModel';
const { ccclass, property } = _decorator;

@ccclass('SummonedHeroesCounterVisibilityView')
export class SummonedHeroesCounterVisibilityView extends Component {

    @property({ type: Node })
    private counterNode: Node = null!;

    private summonedHeroesModel: SummonedHeroesModel = null!;

    protected onLoad(): void {
        this.summonedHeroesModel = find("SummonedHeroesModel")!.getComponent(SummonedHeroesModel)!;
    }

    protected start(): void {
        this.handleHeroAdded();
        this.summonedHeroesModel.node.on(SummonedHeroesModel.HeroAddedEventName, this.handleHeroAdded, this);
    }

    protected onDestroy(): void {
        this.summonedHeroesModel.node.off(SummonedHeroesModel.HeroAddedEventName, this.handleHeroAdded, this);
    }

    private handleHeroAdded = () => {
        this.counterNode.active = this.summonedHeroesModel.SummonedHeroes.length > 0;
    };
}
