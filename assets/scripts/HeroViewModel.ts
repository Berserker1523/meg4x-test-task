import { _decorator, Component } from 'cc';
import { Hero } from './HeroesModel';
const { ccclass } = _decorator;

@ccclass('HeroViewModel')
export class HeroViewModel extends Component {

    public static readonly HeroDataSetEventName = "HeroDataSet";

    private heroData: Hero | null = null;

    public get HeroData(): Hero | null {
        return this.heroData;
    }

    public set HeroData(heroData: Hero) {
        this.heroData = heroData;
        this.node.emit(HeroViewModel.HeroDataSetEventName, heroData);
    }
}
