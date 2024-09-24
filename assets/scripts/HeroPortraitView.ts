import { _decorator, Component, find } from 'cc';
import { HeroPortraitTemplate } from './HeroPortraitTemplate';
import { HeroViewModel } from './HeroViewModel';
import { Hero } from './HeroesModel';
import { HeroesSpritesViewModel } from './HeroesSpritesViewModel';
import { RanksSpritesViewModel } from './RanksSpritesViewModel';
import { TypesSpritesViewModel } from './TypesSpritesViewModel';
const { ccclass } = _decorator;

@ccclass('HeroPortraitView')
export class HeroPortraitView extends Component {

    private heroesSpritesViewModel: HeroesSpritesViewModel = null!
    private ranksSpritesViewModel: RanksSpritesViewModel = null!
    private typesSpritesViewModel: TypesSpritesViewModel = null!

    private heroViewModel: HeroViewModel = null!;
    private heroPortraitTemplate: HeroPortraitTemplate = null!;

    protected onLoad(): void {
        this.heroesSpritesViewModel = find("HeroesSpritesViewModel")!.getComponent(HeroesSpritesViewModel)!;
        this.ranksSpritesViewModel = find("RanksSpritesViewModel")!.getComponent(RanksSpritesViewModel)!;
        this.typesSpritesViewModel = find("TypesSpritesViewModel")!.getComponent(TypesSpritesViewModel)!;
        this.heroViewModel = this.node.getComponent(HeroViewModel)!;
        this.heroPortraitTemplate = this.node.getComponent(HeroPortraitTemplate)!;
    }

    protected start(): void {
        this.handleHeroDataSet(this.heroViewModel.HeroData);
        this.heroViewModel.node.on(HeroViewModel.HeroDataSetEventName, this.handleHeroDataSet, this);
    }

    protected onDestroy(): void {
        this.heroViewModel.node.off(HeroViewModel.HeroDataSetEventName, this.handleHeroDataSet, this);
    }

    private handleHeroDataSet = (heroData: Hero | null) => {
        this.heroPortraitTemplate.setHeroSprite(heroData ? this.heroesSpritesViewModel.getHeroSpriteFrame(heroData.id) : null);
        this.heroPortraitTemplate.setRankSprite(heroData ? this.ranksSpritesViewModel.getRankSpriteFrame(heroData.rank) : null);
        this.heroPortraitTemplate.setTypeSprite(heroData ? this.typesSpritesViewModel.getTypeSpriteFrame(heroData.type) : null);
    };
}
