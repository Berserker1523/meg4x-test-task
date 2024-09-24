import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('TowerViewModel')
export class TowerViewModel extends Component {
    public static readonly ActiveSetEventName = "ActiveSet";

    private isActive = false;

    public get IsActive() : boolean{
        return this.isActive;
    }

    public set IsActive(isActive : boolean) {
        this.isActive = isActive;
        this.node.emit(TowerViewModel.ActiveSetEventName, isActive);
    }
}
