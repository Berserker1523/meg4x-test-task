import { _decorator, Component, find, Label } from 'cc';
import { CurrencyModel } from "./CurrencyModel";
const { ccclass, property } = _decorator;

@ccclass('CurrencyView')
export class CurrencyView extends Component {

    @property({ type: Label })
    private currencyLabel: Label | null = null;

    private currencyModel: CurrencyModel | null = null;

    protected onLoad(): void {
        this.currencyModel = find("CurrencyModel")!.getComponent(CurrencyModel);
    }

    protected start(): void {
        this.handleCurrentCurrencySet(this.currencyModel!.CurrentCurrency);
        this.currencyModel?.node.on(CurrencyModel.CurrentCurrencySetEventName, this.handleCurrentCurrencySet, this);
    }

    protected onDestroy(): void {
        this.currencyModel?.node.off(CurrencyModel.CurrentCurrencySetEventName, this.handleCurrentCurrencySet, this);
    }

    private handleCurrentCurrencySet = (newCurrency: number) => {
        if (this.currencyLabel)
            this.currencyLabel.string = newCurrency.toString();
    };
}
