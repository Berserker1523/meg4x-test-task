import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HeroPortraitTemplate')
export class HeroPortraitTemplate extends Component {

    @property({ type: Sprite })
    private heroSprite: Sprite = null!;

    @property({ type: Sprite })
    private rankSprite: Sprite = null!;

    @property({ type: Sprite })
    private typeSprite: Sprite = null!;

    public setHeroSprite(spriteFrame: SpriteFrame | null): void {
        this.heroSprite.spriteFrame = spriteFrame;
    }

    public setRankSprite(spriteFrame: SpriteFrame | null): void {
        this.rankSprite.spriteFrame = spriteFrame;
    }

    public setTypeSprite(spriteFrame: SpriteFrame | null): void {
        this.typeSprite.spriteFrame = spriteFrame;
    }
}
