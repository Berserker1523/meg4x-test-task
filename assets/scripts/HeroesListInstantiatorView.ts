import { _decorator, Component, Prefab, find, instantiate, Node } from 'cc';
import { HeroesModel } from './HeroesModel';
import { HeroPortraitTemplate } from './HeroPortraitTemplate';
import { HeroesSpritesViewModel } from './HeroesSpritesViewModel';
import { RanksSpritesViewModel } from './RanksSpritesViewModel';
import { TypesSpritesViewModel } from './TypesSpritesViewModel';
const { ccclass, property } = _decorator;

@ccclass('HeroesListInstantiatorView')
export class HeroesListInstantiatorView extends Component {

    @property({ type: Prefab })
    private heroPortraitTemplate: Prefab | null = null;

    private heroesModel: HeroesModel = null!;
    private heroesSpritesViewModel: HeroesSpritesViewModel = null!
    private ranksSpritesViewModel: RanksSpritesViewModel = null!
    private typesSpritesViewModel: TypesSpritesViewModel = null!

    protected onLoad(): void {
        this.heroesModel = find("HeroesModel")!.getComponent(HeroesModel)!;
        this.heroesSpritesViewModel = find("HeroesSpritesViewModel")!.getComponent(HeroesSpritesViewModel)!;
        this.ranksSpritesViewModel = find("RanksSpritesViewModel")!.getComponent(RanksSpritesViewModel)!;
        this.typesSpritesViewModel = find("TypesSpritesViewModel")!.getComponent(TypesSpritesViewModel)!;
    }

    protected start(): void {
        this.instatiateAvailableHeroes();
    }

    private instatiateAvailableHeroes(): void {
        let heroPortraitTemplateNode: Node | null = null;
        let heroPortraitTemplateInstance: HeroPortraitTemplate | null = null;
        for (const hero of this.heroesModel.Heroes) {
            heroPortraitTemplateNode = instantiate(this.heroPortraitTemplate);
            if (!heroPortraitTemplateNode)
                return;

            this.node.addChild(heroPortraitTemplateNode);
            heroPortraitTemplateInstance = heroPortraitTemplateNode.getComponent(HeroPortraitTemplate);
            if (!heroPortraitTemplateInstance)
                return;

            heroPortraitTemplateInstance.setHeroSprite(this.heroesSpritesViewModel.getHeroSpriteFrame(hero.id)!);
            heroPortraitTemplateInstance.setRankSprite(this.ranksSpritesViewModel.getRankSpriteFrame(hero.rank)!);
            heroPortraitTemplateInstance.setTypeSprite(this.typesSpritesViewModel.getTypeSpriteFrame(hero.type)!);
        }
    }
}
