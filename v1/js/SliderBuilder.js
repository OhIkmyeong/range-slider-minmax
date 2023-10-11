import { Slider } from "./Slider.js";

export class SliderBuilder{
    constructor(){
        this.info = {
            min : 0,
            max : 100,
            step : 10,
        };
    }
    set_min(min = 0){
        this.info.min = min ?? 0;
        return this;
    }

    set_max(max = 100){
        this.info.max = max ?? 100;
        return this;
    }

    set_step(step = 10){
        this.info.step = step ?? 10;
        return this;
    }

    init(){
        return new Slider(this.info).init();
    }
}//SliderBuilder