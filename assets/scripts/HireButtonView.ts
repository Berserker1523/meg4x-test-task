import { _decorator, Component, find, Label, Button, Color } from 'cc';
import { HeroesListToggleViewModel } from './HeroesListToggleViewModel';
import { HeroToggleViewModel } from './HeroToggleViewModel';
import { CurrencyModel } from './CurrencyModel';
import { HeroViewModel } from './HeroViewModel';
const { ccclass, property } = _decorator;

@ccclass('HireButtonView')
export class HireButtonView extends Component {

    @property({ type: Label })
    private currencyLabel: Label = null!;

    private button: Button = null!;

    private currencyModel: CurrencyModel = null!;
    private heroesListToggleViewModel: HeroesListToggleViewModel = null!;

    protected onLoad(): void {
        this.button = this.node.getComponent(Button)!;
        this.currencyModel = find("CurrencyModel")!.getComponent(CurrencyModel)!;
        this.heroesListToggleViewModel = find("HeroesListToggleViewModel")!.getComponent(HeroesListToggleViewModel)!;
    }

    protected start(): void {
        this.handleCurrentToggledHeroSet(this.heroesListToggleViewModel.CurrentToggledHero);
        this.heroesListToggleViewModel.node.on(HeroesListToggleViewModel.CurrentToggledHeroSetEventName, this.handleCurrentToggledHeroSet, this);
    }

    protected onDestroy(): void {
        this.heroesListToggleViewModel.node.off(HeroesListToggleViewModel.CurrentToggledHeroSetEventName, this.handleCurrentToggledHeroSet, this);
    }

    private handleCurrentToggledHeroSet = (newToggledHero: HeroToggleViewModel | null) => {

        if (!newToggledHero) {
            this.currencyLabel.node.active = false;
            this.button.interactable = false;
            return;
        }

        const heroViewModel: HeroViewModel = newToggledHero.node.getComponent(HeroViewModel)!;

        if (!heroViewModel.HeroData)
        {
            this.currencyLabel.node.active = false;
            this.button.interactable = false;
            return;
        }
        
        const heroCost: number = heroViewModel.HeroData.cost;
        const currencyAvailable: boolean = this.currencyModel.CurrentCurrency >= heroCost;

        this.currencyLabel.node.active = true;
        this.currencyLabel.string = heroCost.toString();
        this.button.interactable = currencyAvailable;
        this.currencyLabel.color = currencyAvailable ? Color.GREEN : Color.RED;
    }
}
