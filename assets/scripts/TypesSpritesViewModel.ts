import { _decorator, Component, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

//TODO: Improve this class with unity addressable-like load systemS
@ccclass('TypesSpritesViewModel')
export class TypesSpritesViewModel extends Component {
    @property({ type: SpriteFrame })
    private earthSprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private fireSprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private waterSprite: SpriteFrame = null!;

    @property({ type: SpriteFrame })
    private windSprite: SpriteFrame = null!;

    public getTypeSpriteFrame(type: string): SpriteFrame | null {
        switch (type) {
            case "earth":
                return this.earthSprite;

            case "fire":
                return this.fireSprite;

            case "water":
                return this.waterSprite;

            case "wind":
                return this.windSprite;
        }

        return null;
    }
}
