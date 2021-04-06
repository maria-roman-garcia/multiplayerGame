import { v4 as uuidv4 } from 'uuid';

export class Player {

    name = "";
    id =  -1;

    constructor(name) {
        this.name = name;
        id = uuidv4();
    }
}