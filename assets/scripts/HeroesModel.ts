import { _decorator, Component } from 'cc';
import heroesJson from '../settings/heroes.json';
const { ccclass } = _decorator;

export interface Hero {
    id: string;
    name: string;
    description: string;
    cost: number;
    summonCooldown: number;
    type: string;
    rank: string;
}

@ccclass('HeroesModel')
export class HeroesModel extends Component {

    private heroes: Hero[] = [];

    public get Heroes() : Hero[] {
        return this.heroes;
    }

    protected onLoad(): void {
        this.heroes = heroesJson.heroes;
    }

    protected start(): void {
        console.log("HeroesModel heroes:");
        console.log(this.heroes);
    }
}
