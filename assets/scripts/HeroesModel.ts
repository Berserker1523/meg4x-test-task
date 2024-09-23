import { _decorator, Component } from 'cc';
import heroesJson from '../settings/heroes.json';
const { ccclass } = _decorator;

interface Hero {
    id: string;
    name: string;
    description: string;
    cost: number;
    summonCooldown: number;
    type: string;
    rank: string;
}

interface Heroes {
    heroes: Hero[];
}

@ccclass('HeroesModel')
export class HeroesModel extends Component {

    private heroes: Heroes = null!;

    start() {
        this.heroes = heroesJson;
        console.log(this.heroes);
    }
}


