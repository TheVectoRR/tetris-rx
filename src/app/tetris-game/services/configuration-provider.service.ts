import { Injectable } from '@angular/core';
import {Configuration} from '../config/tetris.config';

@Injectable()
export class ConfigurationProviderService {

    public get blocksWidth(): number {
       return Configuration.blocksWidth;
    }

    public get blocksHeight(): number {
        return Configuration.blocksHeight;
    }

    public get pixelsWidth(): number {
        return Configuration.pixelsWidth;
    }

    public get pixelsHeight(): number {
        return Configuration.pixelsHeigth;
    }
}
