import { _decorator, Component } from 'cc';
import { Hero } from './HeroesModel';
const { ccclass } = _decorator;

@ccclass('SummonedHeroesModel')
export class SummonedHeroesModel extends Component {

    public static readonly HeroAddedEventName = "HeroAdded";

    private summonedHeroes: Hero[] = [];

    public get SummonedHeroes(): Hero[] {
        return this.summonedHeroes;
    }

    public addSummonedHero(hero: Hero) {
        this.summonedHeroes.push(hero);
        this.node.emit(SummonedHeroesModel.HeroAddedEventName, hero);
    }
}
