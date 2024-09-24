import { _decorator, Component, Prefab, find, instantiate, Node } from 'cc';
import { HeroViewModel } from './HeroViewModel';
import { SummonedHeroesModel } from './SummonedHeroesModel';
import { Hero } from './HeroesModel';
const { ccclass, property } = _decorator;

@ccclass('SummonedHeroesListInstantiatorView')
export class SummonedHeroesListInstantiatorView extends Component {

    @property({ type: Prefab })
    private heroDetailPrefab: Prefab | null = null;

    private summonedHeroesModel: SummonedHeroesModel = null!;

    protected onLoad(): void {
        this.summonedHeroesModel = find("SummonedHeroesModel")!.getComponent(SummonedHeroesModel)!;
    }

    protected start(): void {
        for (const hero of this.summonedHeroesModel.SummonedHeroes)
            this.instantiateHero(hero);
        this.summonedHeroesModel.node.on(SummonedHeroesModel.HeroAddedEventName, this.instantiateHero, this);
    }

    protected onDestroy(): void {
        this.summonedHeroesModel.node.off(SummonedHeroesModel.HeroAddedEventName, this.instantiateHero, this);
    }

    private instantiateHero = (hero: Hero) => {
        const heroDetailNode: Node | null = instantiate(this.heroDetailPrefab);
        if (!heroDetailNode)
            return;

        this.node.addChild(heroDetailNode);

        const heroViewModel: HeroViewModel | null = heroDetailNode.getComponent(HeroViewModel);
        if (!heroViewModel)
            return;

        heroViewModel.HeroData = hero;
    }
}
