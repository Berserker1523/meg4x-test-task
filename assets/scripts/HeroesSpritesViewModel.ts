import { _decorator, Component, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

//TODO: Improve this class with unity addressable-like load system
@ccclass('HeroesSpritesViewModel')
export class HeroesSpritesViewModel extends Component {
    @property({ type: SpriteFrame })
    private hero1Sprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private hero2Sprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private hero3Sprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private hero4Sprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private hero5Sprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private hero6Sprite: SpriteFrame = null!;

    public getHeroSpriteFrame(heroId: string): SpriteFrame | null {
        switch (heroId) {
            case "hero_1":
                return this.hero1Sprite;

            case "hero_2":
                return this.hero2Sprite;

            case "hero_3":
                return this.hero3Sprite;

            case "hero_4":
                return this.hero4Sprite;

            case "hero_5":
                return this.hero5Sprite;

            case "hero_6":
                return this.hero6Sprite;
        }

        return null;
    }
}
