import { _decorator, Component } from 'cc';
import initialStateJson from '../settings/initial_state.json';
const { ccclass } = _decorator;

@ccclass('CurrencyModel')
export class CurrencyModel extends Component {

    public static readonly CurrentCurrencySetEventName = "CurrentCurrencySet";

    private currentCurrency = 0;

    public get CurrentCurrency() : number{
        return this.currentCurrency;
    }

    public set CurrentCurrency(newCurrency: number) {
        this.currentCurrency = newCurrency;
        this.node.emit(CurrencyModel.CurrentCurrencySetEventName, newCurrency);
    }

    protected onLoad(): void {
        this.currentCurrency = initialStateJson.state.currency;
    }

    protected start(): void {
        console.log(`CurrencyModel currentCurrency ${this.currentCurrency}`);
    }
}
