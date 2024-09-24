import { _decorator, Component, Prefab, find, instantiate, Node } from 'cc';
import { HeroesModel } from './HeroesModel';
import { HeroViewModel } from './HeroViewModel';

const { ccclass, property } = _decorator;

@ccclass('HeroesListInstantiatorView')
export class HeroesListInstantiatorView extends Component {

    @property({ type: Prefab })
    private heroPortraitPrefab: Prefab | null = null;

    private heroesModel: HeroesModel = null!;

    protected onLoad(): void {
        this.heroesModel = find("HeroesModel")!.getComponent(HeroesModel)!;
    }

    protected start(): void {
        this.instatiateAvailableHeroes();
    }

    private instatiateAvailableHeroes(): void {
        let heroPortraitNode: Node | null = null;
        let heroViewModel: HeroViewModel | null = null;

        for (const hero of this.heroesModel.Heroes) {
            heroPortraitNode = instantiate(this.heroPortraitPrefab);
            if (!heroPortraitNode)
                return;

            this.node.addChild(heroPortraitNode);
            
            heroViewModel = heroPortraitNode.getComponent(HeroViewModel);
            if (!heroViewModel)
                return;

            heroViewModel.HeroData = hero;
        }
    }
}
