import { _decorator, Component, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

//TODO: Improve this class with unity addressable-like load system
@ccclass('RanksSpritesViewModel')
export class RanksSpritesViewModel extends Component {
    @property({ type: SpriteFrame })
    private rankASprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private rankBSprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private rankCSprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private rankDSprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private rankSSprite: SpriteFrame = null!;

    public getRankSpriteFrame(rank: string) : SpriteFrame | null {
        switch(rank)
        {
            case "a":
                return this.rankASprite;

            case "b":
                return this.rankBSprite;

            case "c":
                return this.rankCSprite;

            case "d":
                return this.rankDSprite;

            case "s":
                return this.rankSSprite;
        }

        return null;
    }
}
