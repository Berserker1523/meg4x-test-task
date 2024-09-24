import { _decorator, Component, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HeroPortraitTemplate')
export class HeroPortraitTemplate extends Component {

    @property({ type: Sprite })
    private heroSprite: Sprite | null = null;

    @property({ type: Sprite })
    private rankSprite: Sprite | null = null;

    @property({ type: Sprite })
    private typeSprite: Sprite | null = null;

    public setHeroSprite(spriteFrame: SpriteFrame | null): void {
        if (this.heroSprite)
            this.heroSprite.spriteFrame = spriteFrame;
    }

    public setRankSprite(spriteFrame: SpriteFrame | null): void {
        if (this.rankSprite)
            this.rankSprite.spriteFrame = spriteFrame;
    }

    public setTypeSprite(spriteFrame: SpriteFrame | null): void {
        if (this.typeSprite)
            this.typeSprite.spriteFrame = spriteFrame;
    }
}
