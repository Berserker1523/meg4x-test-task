import { _decorator, Component, Label } from 'cc';
import { HeroViewModel } from './HeroViewModel';
import { Hero } from './HeroesModel';
const { ccclass, property } = _decorator;

@ccclass('HeroDetailView')
export class HeroDetailView extends Component {

    @property({ type: Label })
    private heroName: Label = null!;

    @property({ type: Label })
    private description: Label = null!;

    @property({ type: Label })
    private rank: Label = null!;

    @property({ type: Label })
    private cost: Label = null!;

    @property({ type: Label })
    private type: Label = null!;

    @property({ type: Label })
    private summonTime: Label = null!;

    private heroViewModel: HeroViewModel = null!;

    protected onLoad(): void {
        this.heroViewModel = this.node.getComponent(HeroViewModel)!;
    }

    protected start(): void {
        this.handleHeroDataSet(this.heroViewModel.HeroData);
        this.heroViewModel.node.on(HeroViewModel.HeroDataSetEventName, this.handleHeroDataSet, this);
    }

    protected onDestroy(): void {
        this.heroViewModel.node.off(HeroViewModel.HeroDataSetEventName, this.handleHeroDataSet, this);
    }

    private handleHeroDataSet = (heroData: Hero | null) => {
        this.heroName.string = heroData ? heroData.name : "";
        this.description.string = heroData ? heroData.description : "";
        this.rank.string = heroData ? heroData.rank : "";
        this.cost.string = heroData ? heroData.cost.toString() : "";
        this.type.string = heroData ? heroData.type : "";
        this.summonTime.string = heroData ? `${heroData.summonCooldown}s` : "";
    };
}
